import { Resend } from "resend";
import emailConfig from "../../contact/emailConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

function cleanText(value) {
  return String(value || "").trim();
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

async function sendToArkOcm({ fullName, phone, email, address, jobType, notes }) {
  const { webhookUrl, connectionKey } = getOcmConfig();
  const payload = {
    Name: cleanText(fullName),
    Phone: cleanText(phone),
    Email: cleanText(email),
    Address: cleanText(address),
    Job: cleanText(jobType),
    Notes: cleanText(notes),
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

    const fullName = cleanText(body.fullName || body.name || `${body.firstName || ""} ${body.lastName || ""}`);
    const phone = cleanText(body.phone || body.phoneNumber || body.contact);
    const email = cleanText(body.email);
    const address = cleanText(body.address);
    const jobType = cleanText(body.jobType || body.job || body.service);
    const notes = cleanText(body.notes || body.message);

    console.log("Recipient:", emailConfig.recipientEmail);
    console.log("Resend configured:", !!process.env.RESEND_API_KEY);
    console.log("ARK OCM configured:", !!process.env.OCM_WEBHOOK_URL);

    const [emailResult, ocmResult] = await Promise.all([
      resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: [emailConfig.recipientEmail],
        subject: `New Contact Form Submission from ${fullName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${fullName}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Email:</b> ${email || "N/A"}</p>
          <p><b>Address:</b> ${address || "N/A"}</p>
          <p><b>Job Type:</b> ${jobType || "N/A"}</p>
          <p><b>Notes:</b> ${notes || "N/A"}</p>
          <hr />
          <p><i>This message was sent from your website contact form.</i></p>
        `,
      }),
      sendToArkOcm({
        fullName,
        phone,
        email,
        address,
        jobType,
        notes,
      }),
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
