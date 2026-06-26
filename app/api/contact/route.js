import { Resend } from "resend";
import emailConfig from "../../contact/emailConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

const ocmWebhookUrl =
  process.env.OCM_WEBHOOK_URL ||
  "https://ark-websites-ocm.vercel.app/api/intake";

function cleanText(value) {
  return String(value || "").trim();
}

async function sendToArkOcm({ fullName, phone, email, address, jobType, notes }) {
  const payload = {
    clientId: "tabor-painting",
    sectionKey: "contactedMe",
    Name: cleanText(fullName),
    Phone: cleanText(phone),
    Email: cleanText(email),
    Address: cleanText(address),
    Job: cleanText(jobType),
    Notes: cleanText(notes),
    source: "taborpainting-website",
  };

  try {
    const response = await fetch(ocmWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let responseBody = responseText;

    try {
      responseBody = JSON.parse(responseText);
    } catch {
      // Keep plain text response when it is not JSON.
    }

    if (!response.ok) {
      console.error("ARK OCM webhook error:", responseBody);
    }

    return {
      success: response.ok,
      status: response.status,
      url: ocmWebhookUrl,
      response: responseBody,
    };
  } catch (error) {
    console.error("Could not send submission to ARK OCM:", error);

    return {
      success: false,
      status: "fetch-failed",
      url: ocmWebhookUrl,
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
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("Sending email to Resend...");

    const result = await resend.emails.send({
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

        <p>
          <i>
            This message was sent from your website contact form.
          </i>
        </p>
      `,
    });

    const ocmResult = await sendToArkOcm({
      fullName,
      phone,
      email,
      address,
      jobType,
      notes,
    });

    console.log("Resend result:", JSON.stringify(result, null, 2));
    console.log("ARK OCM result:", JSON.stringify(ocmResult, null, 2));

    return Response.json({
      success: true,
      result,
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
      {
        status: 500,
      }
    );
  }
}
