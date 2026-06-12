import { Resend } from "resend";
import emailConfig from "../../contact/emailConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log("Resend result:", JSON.stringify(result, null, 2));

    return Response.json({
      success: true,
      result,
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
