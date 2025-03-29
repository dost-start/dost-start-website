"use server";

import nodemailer from "nodemailer";
import MessageType from "@/types/messageType";

export async function sendEmail(
  data: MessageType
): Promise<{ success: boolean; message: string }> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "dost.start@gmail.com",
    subject: `START WEBSITE | New Message from ${data.name}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Purpose: ${data.purpose}
      Message: ${data.message}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email." };
  }
}
