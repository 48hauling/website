import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ctype = req.headers.get("content-type") || "";
    let payload: any = {};
    let resumeFile: File | null = null;

    if (ctype.includes("application/json")) {
      payload = await req.json();
    } else {
      const fd = await req.formData();
      payload = Object.fromEntries(fd.entries());
      // Parse array fields if present
      for (const key of ["employment", "accidents", "convictions"]) {
        if (typeof payload[key] === "string") {
          try { payload[key] = JSON.parse(payload[key] as string); } catch {}
        }
      }
      const file = fd.get("resume");
      if (file && typeof file !== "string") {
        resumeFile = file as File;
      }
    }

    // Generate PDF from application data
    const pdfBuffer = await generateApplicationPDF(payload);

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Prepare attachments
    const attachments: any[] = [
      {
        filename: `Driver_Application_${payload.firstName}_${payload.lastName}.pdf`,
        content: pdfBuffer,
      },
    ];

    // Add resume if provided
    if (resumeFile) {
      const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: resumeBuffer,
      });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'Javier@48hauling.com',
      subject: `Driver Application - ${payload.firstName} ${payload.lastName}`,
      text: `
New Driver Application Received

Name: ${payload.firstName} ${payload.lastName}
Email: ${payload.email}
Phone: ${payload.phone}
License: ${payload.licenseNumber} (${payload.licenseState})
License Class: ${payload.licenseClass}

Please see attached PDF for complete application details.
${resumeFile ? '\nResume is also attached.' : ''}
      `.trim(),
      attachments,
    });

    console.log("Driver application submitted and emailed successfully");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Failed to process driver application:", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

async function generateApplicationPDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('48 Hauling - Driver Application', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).font('Helvetica').text(`Submitted: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Personal Information
    doc.fontSize(14).font('Helvetica-Bold').text('Personal Information');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    doc.text(`Name: ${data.firstName} ${data.lastName}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`Address: ${data.address}`);
    doc.text(`Date of Birth: ${data.dob}`);
    doc.moveDown(1.5);

    // License Information
    doc.fontSize(14).font('Helvetica-Bold').text('License Information');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    doc.text(`License Number: ${data.licenseNumber}`);
    doc.text(`State: ${data.licenseState}`);
    doc.text(`Class: ${data.licenseClass}`);
    doc.text(`Endorsements: ${data.endorsements || 'None'}`);
    doc.moveDown(1.5);

    // Employment History
    doc.fontSize(14).font('Helvetica-Bold').text('Employment History (3 years)');
    doc.moveDown(0.5);
    const employment = data.employment || [];
    if (employment.length > 0) {
      employment.forEach((emp: any, idx: number) => {
        doc.fontSize(10).font('Helvetica-Bold').text(`${idx + 1}. ${emp.employer}`);
        doc.fontSize(10).font('Helvetica');
        doc.text(`   Position: ${emp.position}`);
        doc.text(`   Period: ${emp.start} to ${emp.end}`);
        doc.text(`   DOT Regulated: ${emp.dot ? 'Yes' : 'No'}`);
        doc.text(`   Reason for Leaving: ${emp.reason}`);
        doc.moveDown(0.5);
      });
    } else {
      doc.fontSize(10).font('Helvetica').text('None provided');
    }
    doc.moveDown(1);

    // Accidents
    doc.fontSize(14).font('Helvetica-Bold').text('Accidents (3 years)');
    doc.moveDown(0.5);
    const accidents = data.accidents || [];
    if (accidents.length > 0 && accidents[0].date) {
      accidents.forEach((acc: any, idx: number) => {
        doc.fontSize(10).font('Helvetica');
        doc.text(`${idx + 1}. Date: ${acc.date}`);
        doc.text(`   Nature: ${acc.nature}`);
        doc.text(`   Fatalities: ${acc.fatalities}, Injuries: ${acc.injuries}`);
        doc.text(`   Hazmat: ${acc.hazmat}`);
        doc.moveDown(0.5);
      });
    } else {
      doc.fontSize(10).font('Helvetica').text('None reported');
    }
    doc.moveDown(1);

    // Traffic Convictions
    doc.fontSize(14).font('Helvetica-Bold').text('Traffic Convictions (3 years)');
    doc.moveDown(0.5);
    const convictions = data.convictions || [];
    if (convictions.length > 0 && convictions[0].date) {
      convictions.forEach((conv: any, idx: number) => {
        doc.fontSize(10).font('Helvetica');
        doc.text(`${idx + 1}. Date: ${conv.date}`);
        doc.text(`   Location: ${conv.location}`);
        doc.text(`   Charge: ${conv.charge}`);
        doc.text(`   Penalty: ${conv.penalty}`);
        doc.moveDown(0.5);
      });
    } else {
      doc.fontSize(10).font('Helvetica').text('None reported');
    }
    doc.moveDown(1.5);

    // Consents
    doc.fontSize(14).font('Helvetica-Bold').text('Consents');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    doc.text(`✓ Previous Employers Consent: ${data.consentPreviousEmployers === 'on' ? 'Yes' : 'No'}`);
    doc.text(`✓ Drug/Alcohol Testing Consent: ${data.consentDrugAlcohol === 'on' ? 'Yes' : 'No'}`);

    doc.end();
  });
}
