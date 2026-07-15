import { Resend } from "resend";
import emailConfig from "../../contact/emailConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

function cleanText(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return cleanText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getOcmConfig() {
  const webhookUrl = cleanText(process.env.OCM_WEBHOOK_URL);
  const connectionKey = cleanText(process.env.OCM_CONNECTION_KEY);

  if (!webhookUrl) {
    throw new Error("OCM_WEBHOOK_URL is not configured in Vercel.");
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(webhookUrl);
  } catch {
    throw new Error("OCM_WEBHOOK_URL is not a valid URL.");
  }

  if (connectionKey && !parsedUrl.searchParams.get("key")) {
    parsedUrl.searchParams.set("key", connectionKey);
  }

  return {
    webhookUrl: parsedUrl.toString(),
    connectionKey,
  };
}

function normalizeContactMethod(value) {
  const method = cleanText(value).toLowerCase();
  if (method === "call" || method === "phone") return "Call";
  if (method === "text" || method === "sms") return "Text";
  if (method === "email") return "Email";
  return "";
}

function validateSubmission(submission) {
  const required = [
    [submission.firstName, "first name"],
    [submission.lastName, "last name"],
    [submission.phone, "phone number"],
    [submission.email, "email address"],
    [submission.streetAddress, "street address"],
    [submission.townOrCity, "town or city"],
    [submission.serviceType, "service type"],
    [submission.contactMethod, "best form of contact"],
  ];
  const missing = required.filter(([value]) => !cleanText(value)).map(([, label]) => label);
  if (missing.length) return `Please enter your ${missing.join(", ")}.`;
  if (!/^\S+@\S+\.\S+$/.test(submission.email)) return "Please enter a valid email address.";
  return "";
}

async function sendToArkOcm(submission) {
  const { webhookUrl, connectionKey } = getOcmConfig();
  const fullName = `${submission.firstName} ${submission.lastName}`.trim();
  const fullAddress = `${submission.streetAddress}, ${submission.townOrCity}`.trim();
  const payload = {
    FirstName: submission.firstName,
    LastName: submission.lastName,
    Name: fullName,
    Phone: submission.phone,
    Email: submission.email,
    StreetAddress: submission.streetAddress,
    TownOrCity: submission.townOrCity,
    Address: fullAddress,
    ServiceType: submission.serviceType,
    Job: submission.serviceType,
    BestContactMethod: submission.contactMethod,
    Notes: submission.notes,
    source: "taborpainting-website",
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(connectionKey ? { "X-ARK-Connection-Key": connectionKey } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responseText = await response.text();
    let responseBody = responseText;

    try {
      responseBody = JSON.parse(responseText);
    } catch {
      // Keep the plain-text response when the endpoint does not return JSON.
    }

    if (!response.ok) {
      console.error("ARK OCM webhook error:", {
        status: response.status,
        response: responseBody,
      });
    }

    return {
      success: response.ok,
      status: response.status,
      response: responseBody,
    };
  } catch (error) {
    console.error("Could not send submission to ARK OCM:", error);

    return {
      success: false,
      status: "fetch-failed",
      error: error.message,
    };
  }
}

export async function POST(req) {
  try {
    console.log("=== CONTACT FORM SUBMISSION ===");

    const body = await req.json();
    const submission = {
      firstName: cleanText(body.firstName),
      lastName: cleanText(body.lastName),
      phone: cleanText(body.phone || body.phoneNumber || body.contact),
      email: cleanText(body.email).toLowerCase(),
      streetAddress: cleanText(body.streetAddress || body.addressLine1),
      townOrCity: cleanText(body.townOrCity || body.city || body.town),
      serviceType: cleanText(body.serviceType || body.jobType || body.job || body.service).toLowerCase(),
      contactMethod: normalizeContactMethod(body.contactMethod || body.bestContactMethod),
      notes: cleanText(body.notes || body.message),
    };

    const validationError = validateSubmission(submission);
    if (validationError) {
      return Response.json({ success: false, error: validationError }, { status: 400 });
    }

    const fullName = `${submission.firstName} ${submission.lastName}`.trim();
    const fullAddress = `${submission.streetAddress}, ${submission.townOrCity}`.trim();

    console.log("Recipient:", emailConfig.recipientEmail);
    console.log("Resend configured:", !!process.env.RESEND_API_KEY);
    console.log("ARK OCM configured:", !!process.env.OCM_WEBHOOK_URL);

    const [emailResult, ocmResult] = await Promise.all([
      resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: [emailConfig.recipientEmail],
        subject: `New Contact Form Submission from ${escapeHtml(fullName)}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><b>First Name:</b> ${escapeHtml(submission.firstName)}</p>
          <p><b>Last Name:</b> ${escapeHtml(submission.lastName)}</p>
          <p><b>Phone:</b> ${escapeHtml(submission.phone)}</p>
          <p><b>Email:</b> ${escapeHtml(submission.email)}</p>
          <p><b>Street Address:</b> ${escapeHtml(submission.streetAddress)}</p>
          <p><b>Town or City:</b> ${escapeHtml(submission.townOrCity)}</p>
          <p><b>Full Address:</b> ${escapeHtml(fullAddress)}</p>
          <p><b>Service Type:</b> ${escapeHtml(submission.serviceType)}</p>
          <p><b>Best Form of Contact:</b> ${escapeHtml(submission.contactMethod)}</p>
          <p><b>Notes:</b> ${escapeHtml(submission.notes || "None")}</p>
          <hr />
          <p><i>This message was sent from your website contact form.</i></p>
        `,
      }),
      sendToArkOcm(submission),
    ]);

    console.log("Resend result:", JSON.stringify(emailResult, null, 2));
    console.log("ARK OCM result:", JSON.stringify(ocmResult, null, 2));

    if (!ocmResult.success) {
      return Response.json(
        {
          success: false,
          error: "Your message was emailed, but the CRM connection failed.",
          ocmResult,
        },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      emailResult,
      ocmResult,
    });
  } catch (error) {
    console.error("=== CONTACT FORM ERROR ===");
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
