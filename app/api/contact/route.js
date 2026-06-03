import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
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

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["YOUR_EMAIL_HERE"],
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
        <p><i>This message was sent from your website contact form.</i></p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
