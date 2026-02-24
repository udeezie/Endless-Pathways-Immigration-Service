export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryResidence: string;
  countryCitizenship: string;
  timeSlots: string[];
  details: string;
}

interface ConsultationOption {
  id: string;
  title: string;
  duration: string;
  price: number;
  isUrgent?: boolean;
  location: string;
  category: string;
  description: string;
}

interface RequestBody {
  formData: FormData;
  selectedConsultation: ConsultationOption;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { formData, selectedConsultation } = body;

    if (!formData || !selectedConsultation) {
      return new Response(JSON.stringify({ error: "Missing required data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const timeSlotsList = formData.timeSlots
      .filter((slot) => slot && slot.trim() !== "")
      .map((slot, i) => `<li><strong>Option ${i + 1}:</strong> ${slot}</li>`)
      .join("");

    const consultantEmail = {
      from: `"Endless Pathways Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: formData.email,
      subject: `New Consultation: ${formData.firstName} ${formData.lastName} - ${selectedConsultation.duration}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #001925; color: white; padding: 20px; text-align: center; border-left: 5px solid #FFD700; }
            .header h1 { margin: 0; color: #FFD700; font-size: 24px; }
            .content { padding: 30px; background-color: #f9f9f9; }
            .section { margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .section h2 { color: #001925; border-bottom: 2px solid #FFD700; padding-bottom: 10px; margin-top: 0; }
            .urgent-badge { background-color: #ff0000; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
            .time-slots li { background-color: #f0f0f0; margin: 5px 0; padding: 10px; border-left: 3px solid #FFD700; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Consultation Request</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <h2>Selected Package</h2>
                <h3>${selectedConsultation.title}</h3>
                <p><strong>Duration:</strong> ${selectedConsultation.duration}</p>
                <p><strong>Price:</strong> $${selectedConsultation.price}</p>
                <p><strong>Location:</strong> ${selectedConsultation.location}</p>
                ${selectedConsultation.isUrgent ? '<p class="urgent-badge">⚠️ URGENT CONSULTATION</p>' : ""}
                <p><em>${selectedConsultation.description}</em></p>
              </div>

              <div class="section">
                <h2>Client Information</h2>
                <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Country of Residence:</strong> ${formData.countryResidence}</p>
                <p><strong>Country of Citizenship:</strong> ${formData.countryCitizenship}</p>
              </div>

              <div class="section">
                <h2>Preferred Times</h2>
                <ul class="time-slots">
                  ${timeSlotsList || "<li>No times specified</li>"}
                </ul>
              </div>

              <div class="section">
                <h2>Consultation Details</h2>
                <p style="white-space: pre-wrap; background-color: #f0f0f0; padding: 15px; border-radius: 5px;">${formData.details.replace(/\n/g, "<br>")}</p>
              </div>
            </div>

            <div class="footer">
              <p>This request was submitted through Endless Pathways Immigration Services website.</p>
              <p>© ${new Date().getFullYear()} Endless Pathways Immigration Services</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const clientEmail = {
      from: `"Endless Pathways Immigration" <${process.env.SMTP_USER}>`,
      to: formData.email,
      subject:
        "We received your consultation request - Endless Pathways Immigration",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #001925; color: white; padding: 20px; text-align: center; border-left: 5px solid #FFD700; }
            .header h1 { margin: 0; color: #FFD700; font-size: 24px; }
            .content { padding: 30px; background-color: #f9f9f9; }
            .message { background-color: white; padding: 25px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .highlight { color: #FFD700; font-weight: bold; }
            .contact-info { background-color: #001925; color: white; padding: 15px; border-radius: 5px; margin-top: 20px; }
            .contact-info a { color: #FFD700; text-decoration: none; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Consultation Request</h1>
            </div>
            
            <div class="content">
              <div class="message">
                <h2>Hello ${formData.firstName},</h2>
                
                <p>Thank you for reaching out to <span class="highlight">Endless Pathways Immigration Services</span>. We have received your consultation request and will get back to you within <strong>24 hours</strong>.</p>
                
                <h3>Your Request Details:</h3>
                <p><strong>Package:</strong> ${selectedConsultation.title} (${selectedConsultation.duration})</p>
                <p><strong>Location:</strong> ${selectedConsultation.location}</p>
                
                <h3>What happens next?</h3>
                <ol>
                  <li>We'll review your information</li>
                  <li>Check availability for your preferred times</li>
                  <li>Send you a confirmation email with your scheduled time</li>
                  ${selectedConsultation.isUrgent ? "<li><strong>URGENT:</strong> We will prioritize your request</li>" : ""}
                </ol>
                
                <div class="contact-info">
                  <p><strong>Need to make changes?</strong></p>
                  <p>Email us at: <a href="mailto:${process.env.SMTP_USER}">${process.env.SMTP_USER}</a></p>
                  <p>Call us: <strong>+1 (905) 931-3776</strong></p>
                </div>
                
                <p>Best regards,<br>
                <strong>Appiah Bonsu</strong><br>
                RCIC | Endless Pathways Immigration Services</p>
              </div>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Endless Pathways Immigration Services. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(consultantEmail);
    await transporter.sendMail(clientEmail);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Consultation request submitted successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Email error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
