import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('📨 Contact form request received');
    
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log('Form data:', { name, email, subject, messageLength: message?.length });

    // Validation
    if (!name || !email || !subject || !message) {
      console.log('❌ Validation failed: Missing fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed, sending email...');
    console.log('Email config:', {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_REPLY_TO,
      apiKeyExists: !!process.env.RESEND_API_KEY
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_REPLY_TO || 'flexotools.app@gmail.com', // Your email where you receive messages
      replyTo: email, // User's email for easy reply
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f3f4f6;
              }
              .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                color: white;
                padding: 32px 24px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                padding: 32px 24px;
              }
              .field {
                margin-bottom: 24px;
              }
              .label {
                font-weight: 600;
                color: #374151;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: block;
                margin-bottom: 8px;
              }
              .value {
                color: #1f2937;
                padding: 12px 16px;
                background-color: #f9fafb;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                font-size: 15px;
              }
              .message-value {
                white-space: pre-wrap;
                line-height: 1.8;
              }
              .reply-box {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border-left: 4px solid #f59e0b;
                padding: 16px 20px;
                margin-top: 24px;
                border-radius: 8px;
              }
              .reply-box strong {
                color: #92400e;
                display: block;
                margin-bottom: 4px;
              }
              .reply-box a {
                color: #b45309;
                text-decoration: none;
                font-weight: 500;
              }
              .footer {
                text-align: center;
                color: #6b7280;
                font-size: 13px;
                padding: 24px;
                background-color: #f9fafb;
                border-top: 1px solid #e5e7eb;
              }
              .divider {
                height: 1px;
                background: linear-gradient(to right, transparent, #e5e7eb, transparent);
                margin: 24px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">👤 From</span>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <span class="label">📧 Email</span>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <span class="label">📋 Subject</span>
                  <div class="value">${subject}</div>
                </div>
                
                <div class="divider"></div>
                
                <div class="field">
                  <span class="label">💬 Message</span>
                  <div class="value message-value">${message}</div>
                </div>
                
                <div class="reply-box">
                  <strong>Quick Reply</strong>
                  <p style="margin: 0;">Click reply in your email client to respond directly to: <a href="mailto:${email}">${email}</a></p>
                </div>
              </div>
              <div class="footer">
                <p style="margin: 0;">This email was sent from your website's contact form</p>
                <p style="margin: 8px 0 0 0; color: #9ca3af;">Received: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    console.log('✅ Email sent successfully:', data);
    
    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Contact API',
    usage: 'POST with name, email, subject, and message',
    provider: 'Resend',
  });
}