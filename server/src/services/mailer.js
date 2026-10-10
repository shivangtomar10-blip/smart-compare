import nodemailer from 'nodemailer';
// Returns null unless SMTP is configured, so alerts fall back to in-app notifications only.
export function createMailer(env = process.env) {
  if (!env.SMTP_HOST || !env.SMTP_FROM) return null;
  const t = nodemailer.createTransport({ host: env.SMTP_HOST, port: Number(env.SMTP_PORT) || 587,
    secure: env.SMTP_SECURE === 'true', auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined });
  return { send: ({ to, subject, text }) => t.sendMail({ from: env.SMTP_FROM, to, subject, text }) };
}
