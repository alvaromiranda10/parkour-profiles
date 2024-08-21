import { Resend } from "resend";
import { env } from "@/lib/env.mjs";

export const resend = new Resend(env.RESEND_API_KEY);


import { createTransport } from "nodemailer"
import { render } from '@react-email/components';
import { SendVerificationRequestParams } from 'next-auth/providers/email';
import {ConfirmationEmail} from "@/components/emails/ConfirmationEmail";

  
export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)

  try {

    const transport = createTransport(provider.server)
    await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Inicia sesión en ${host}`,
      html: render(ConfirmationEmail({url,host, theme} )) ,
    })
  } catch (error) {
    console.log({ error });
  }

}