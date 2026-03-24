import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Nodemailer transporter using environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Setup email data
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // Send FROM the SMTP authenticated user
            replyTo: email, // Set the reply-to address to the sender's email
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Recipient
            subject: `New Contact Form Message from ${name}`,
            text: `You have a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                    <h2>New Message from your Website</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                    <h3>Message:</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        };

        // Send mail
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending contact email:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        );
    }
}
