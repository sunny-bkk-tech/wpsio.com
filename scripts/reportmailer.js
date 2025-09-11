import nodemailer from 'nodemailer';
import 'dotenv/config'; // or require('dotenv').config();

async function sendEmail(processName) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email credentials not configured!");
      throw new Error("Email credentials not configured!");
    }

    // Use environment variables for credentials
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 465,
      secure: true, // Use true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `PM2 Alert: ${processName} is down!`,
      text: `${processName} has stopped or crashed. Please check your server.`,
      html: `<b>${processName} has stopped or crashed.</b><p>Please check your server immediately.</p>`
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

const processName = process.argv[2] || "Unknown Process";
sendEmail(processName).catch(console.error);