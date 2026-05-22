import { NextResponse } from "next/server";
import { Resend } from "resend";

// ──────────────────────────────────────────────
// CONFIGURATION
// Change the recipient email in .env.local:
//   CONTACT_EMAIL=your-email@example.com
// ──────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, companySize, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // The recipient email — change this in .env.local
    const contactEmail = process.env.CONTACT_EMAIL || "hello@lexilift.com";

    await resend.emails.send({
      from: "LexiLift <onboarding@resend.dev>",
      to: contactEmail,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
          <div style="background: white; border-radius: 8px; padding: 32px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 24px; font-size: 20px; color: #111827;">
              📬 New Booking / Contact Request
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 140px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 500;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #7c5cff; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Company Size</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${companySize || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #111827; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</td>
              </tr>
            </table>
          </div>
          
          <p style="margin: 16px 0 0; text-align: center; font-size: 12px; color: #9ca3af;">
            Sent from your LexiLift contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
