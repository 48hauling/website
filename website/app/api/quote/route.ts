import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const entries: Record<string, any> = {};
    for (const [k, v] of fd.entries()) {
      if (k === "photos") continue;
      entries[k] = v;
    }
    const photos = fd.getAll("photos").filter((f) => typeof f !== "string") as File[];

    // Prepare email content
    const emailContent = `
New Quote Request from 48 Hauling Website

Company: ${entries.company || 'N/A'}
Contact Name: ${entries.contactName || 'N/A'}
Email: ${entries.email || 'N/A'}
Phone: ${entries.phone || 'N/A'}

Pickup Location: ${entries.pickup || 'N/A'}
Drop Location: ${entries.drop || 'N/A'}
Material: ${entries.material || 'N/A'}
Quantity: ${entries.quantity || 'N/A'}

Notes:
${entries.notes || 'N/A'}

${photos.length > 0 ? `Photos attached: ${photos.length}` : 'No photos attached'}
    `.trim();

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured - quote request logged but not emailed");
      console.log("Quote request data:", emailContent);
      return NextResponse.json({ ok: true, message: "Quote logged (email not configured)" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Convert photos to attachments
    const attachments = await Promise.all(
      photos.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    // Send email using Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'Javier@48hauling.com',
      subject: `New Quote Request - ${entries.company || entries.contactName || 'Website'}`,
      text: emailContent,
      attachments,
    });

    console.log("Quote request sent successfully");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Failed to send quote:", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

