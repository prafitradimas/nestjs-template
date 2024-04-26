import * as nodemailer from 'nodemailer';
import * as handlebars from 'nodemailer-express-handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as path from 'path';
import * as helpers from 'src/common/helpers';
import { EmailServiceInterface } from './email-service.interface';

export class EmailService implements EmailServiceInterface {
  readonly #CFG_MAIL_HOST: string;
  readonly #CFG_MAIL_PORT: number;
  readonly #CFG_MAIL_USER: string;
  readonly #CFG_MAIL_PASS: string;
  readonly #CFG_MAIL_SECURE: boolean;
  readonly #CFG_MAIL_FROM: string;

  private readonly mailerOpts: SMTPTransport.Options;
  private readonly handlebarsOpts: handlebars.NodemailerExpressHandlebarsOptions;

  constructor() {
    this.#CFG_MAIL_HOST ??= process.env.SMTP_HOST;
    this.#CFG_MAIL_PORT ??= process.env.SMTP_PORT;
    this.#CFG_MAIL_USER ??= process.env.SMTP_USER;
    this.#CFG_MAIL_PASS ??= process.env.SMTP_PASS;
    this.#CFG_MAIL_SECURE ??= process.env.SMTP_SECURE;
    this.#CFG_MAIL_FROM ??= process.env.SMTP_FROM;

    this.mailerOpts = {
      host: this.#CFG_MAIL_HOST,
      port: this.#CFG_MAIL_PORT,
      secure: this.#CFG_MAIL_SECURE,
      auth: {
        user: this.#CFG_MAIL_USER,
        pass: this.#CFG_MAIL_PASS,
      },
    };

    this.handlebarsOpts = {
      viewEngine: {
        partialsDir: path.join(helpers.getAppRootPath(), '/assets/templates/'),
        defaultLayout: false,
      },
      viewPath: path.join(helpers.getAppRootPath(), '/assets/templates/'),
    };
  }

  async send(
    to: Readonly<string>,
    subject: Readonly<string>,
    template: Readonly<string>,
    params: Readonly<object>,
  ): Promise<any> {
    const transporter = nodemailer.createTransport(this.mailerOpts);
    transporter.use('compile', handlebars(this.handlebarsOpts));

    return transporter.sendMail({
      to: to,
      from: this.#CFG_MAIL_FROM,
      subject: subject,
      // @ts-ignore
      //
      // ts-ignoring because {SMTPTransport.Options} doesn't know
      // `template` and `context`
      template: template,
      context: {
        ...params,
      },
    });
  }
}
