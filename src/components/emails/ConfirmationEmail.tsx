import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link
} from "@react-email/components";
import * as React from "react";


export const ConfirmationEmail = ({ url, host, theme }: { url: string; host: string; theme: any }) => {

  return (
    <Html>
      <Head />
      <Preview>Inicia sesión con este enlace mágico.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🪄 Tu enlace mágico</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link style={link} href={host}>
                👉 ¡Haz clic aquí para iniciar sesión! 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              Si no solicitaste este enlace, por favor ignora este correo. No te preocupes, no se ha hecho ningún cambio en tu cuenta.
            </Text>
          </Section>
          <Text style={paragraph}>
            Saludos cordiales,
            <br />- Alvaro Miranda, CEO Parkour Profiles 👋
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Parkour Profiles Inc. 🌟</Text>
        </Container>
      </Body>
    </Html>


  );
}


const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
