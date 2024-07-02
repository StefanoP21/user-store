import nodemailer, { Transporter } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    public readonly mailerService: string,
    public readonly mailerEmail: string,
    public readonly senderEmailPassword: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, html, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
