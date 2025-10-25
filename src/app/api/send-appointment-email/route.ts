// import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
// import resend from "@/lib/resend";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//     try{
//         const body = await request.json();
//         const {userEmail, doctorName, appointmentDate, appointmentTime, appointmentType, duration, price} = body;

//         if(!userEmail || !doctorName || !appointmentDate || !appointmentTime){
//             return NextResponse.json({error: "Missing required fields"}, {status: 400});
//         }
//         const {data, error} = await resend.emails.send({
//             from: 'AIVADENT <eshan.bhuse@spit.ac.in>',
//             to: [userEmail],
//             subject: 'Appointment Confirmation - AIVADENT',
//             react: AppointmentConfirmationEmail({
//                 doctorName,
//                 appointmentDate,
//                 appointmentTime,
//                 appointmentType,
//                 duration,
//                 price
//             }),
//         });
//         if(error){
//             console.error('Resend error:', error);
//             return NextResponse.json({error: "Failed to send email"}, {status: 500});
//         }
//         return NextResponse.json({message: "Email sent successfully", emailId: data?.id }, {status: 200});
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return NextResponse.json({error: "Internal server error"}, {status: 500});
//     }
//     }

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = body;

    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // HTML email template
    const mailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #e78a53; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Appointment Confirmed</h1>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Hi there,</p>
          <p>Your appointment has been successfully scheduled. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Doctor:</td>
              <td style="padding: 8px;">${doctorName}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Date:</td>
              <td style="padding: 8px;">${appointmentDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Time:</td>
              <td style="padding: 8px;">${appointmentTime}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Type:</td>
              <td style="padding: 8px;">${appointmentType || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Duration:</td>
              <td style="padding: 8px;">${duration || "N/A"}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Price:</td>
              <td style="padding: 8px;">${price ? "₹" + price : "N/A"}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Please arrive 10 minutes early and bring any relevant documents.</p>
          <p>Thank you for choosing <strong>AIVADENT</strong>!</p>
        </div>
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} AIVADENT. All rights reserved.
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"AIVADENT" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: "Your Appointment is Confirmed - AIVADENT",
      html: mailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
