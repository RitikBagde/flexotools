import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  replyTo: process.env.EMAIL_REPLY_TO || 'flexotools.app@gmail.com',
};

// Send welcome email
export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to,
      subject: 'Welcome to FlexoTools! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #475569 0%, #1e293b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { background: linear-gradient(135deg, #475569 0%, #1e293b 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; }
              .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to FlexoTools!</h1>
              </div>
              <div class="content">
                <p style="font-size: 16px;">Hi ${name || 'there'}!</p>
                <p>Thanks for joining FlexoTools! We're excited to have you on board.</p>
                <p>Here's what you can do with your account:</p>
                <ul>
                  <li>🖼️ Compress images without losing quality</li>
                  <li>📄 Extract text from PDFs</li>
                  <li>📱 Generate QR codes and barcodes</li>
                  <li>📝 Grade resumes with AI</li>
                  <li>✍️ Summarize long texts instantly</li>
                </ul>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">Get Started Now</a>
                </p>
                <p>If you have any questions, just reply to this email!</p>
                <p>Best regards,<br/>The FlexoTools Team</p>
              </div>
              <div class="footer">
                <p>© 2025 FlexoTools. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}

// Send email verification
export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to,
      subject: 'Verify your email address',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #475569 0%, #1e293b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { background: linear-gradient(135deg, #475569 0%, #1e293b 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; }
              .code { background: #e2e8f0; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 24px; text-align: center; letter-spacing: 2px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">📧 Verify Your Email</h1>
              </div>
              <div class="content">
                <p style="font-size: 16px;">Hi there!</p>
                <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${verifyUrl}" class="button">Verify Email Address</a>
                </p>
                <p style="color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #475569; font-size: 12px;">${verifyUrl}</p>
                <p style="margin-top: 30px; color: #64748b; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
              </div>
              <div class="footer">
                <p>© 2025 FlexoTools. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending verification email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error };
  }
}

// Send password reset email
export async function sendPasswordResetEmail(to: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to,
      subject: 'Reset your password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #475569 0%, #1e293b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { background: linear-gradient(135deg, #475569 0%, #1e293b 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; }
              .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">🔐 Reset Your Password</h1>
              </div>
              <div class="content">
                <p style="font-size: 16px;">Hi there!</p>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" class="button">Reset Password</a>
                </p>
                <div class="warning">
                  <strong>⚠️ Security Note:</strong> This link expires in 1 hour. If you didn't request this reset, please ignore this email or contact support if you're concerned.
                </div>
                <p style="color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #475569; font-size: 12px;">${resetUrl}</p>
              </div>
              <div class="footer">
                <p>© 2025 FlexoTools. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}