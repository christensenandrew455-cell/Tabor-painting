import { Resend } from "resend";
import emailConfig from "../../contact/emailConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

const ocmWebhookUrl =
  process.env.OCM_WEBHOOK_URL ||
  "https://ark-websites-ocm.vercel.app/api/submissions";

function splitContact(contact) {
  const value = String(contact || "").trim();

  if (value.includes("@")) {
    return { email: value, phone: "" };
  }

  return { email: "", phone: value };
}

async function sendToArkOcm({ firstName, lastName, contact, address, size, date, message }) {
  const { email, phone } = splitContact(contact);

  const notes = [
    size ? `Size of job: ${size}` : "",
    date ? `Date available: ${date}` : "",
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const payload = {
    clientId: "tabor-painting",
    section: "preClients",
    name: `${firstName || ""} ${lastName || ""}`.trim(),
    phone,
    email,
    address,
    service: "Painting estimate request",
    message: notes,
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

    const {
      firstName,
      lastName,
      contact,
      address,
      size,
      date,
      message,
    } = body;

    console.log("Recipient:", emailConfig.recipientEmail);
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("Sending email to Resend...");

    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [emailConfig.recipientEmail],

      subject: `New Contact Form Submission from ${firstName} ${lastName}`,

      html: `
        <h2>New Contact Form Submission</h2>

        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Contact:</b> ${contact}</p>
        <p><b>Address:</b> ${address || "N/A"}</p>
        <p><b>Size:</b> ${size || "N/A"}</p>
        <p><b>Date:</b> ${date || "N/A"}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>

        <hr />

        <p>
          <i>
            This message was sent from your website contact form.
          </i>
        </p>
      `,
    });

    const ocmResult = await sendToArkOcm({
      firstName,
      lastName,
      contact,
      address,
      size,
      date,
      message,
    });

    console.log("Resend result:", JSON.stringify(result, null, 2));
    console.log("ARK OCM result:", JSON.stringify(ocmResult, null, 2));

    return Response.json({
      success: true,
      result,
      ocmResult,
    });
  } catch (error) {
    console.error("=== EMAIL ERROR ===");
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
