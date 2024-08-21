import { Html, Body, Head, Preview, Text } from '@react-email/components';
import { Button } from '@react-email/button';


export const ConfirmationEmail = ({ url, host, theme }: { url: string; host: string; theme: any }) => {

  const brandColor = theme.brandColor || '#346df1';
  const buttonText = theme.buttonText || '#fff';
  return (
    <Html>
      <Head>
        <style>
          {`
        .bg-primary { background-color: ${brandColor}; }
        .text-primary { color: ${buttonText}; }
      `}
        </style>
      </Head>
      <Body className="bg-gray-100">
        <Preview>Inicia sesión en {host}</Preview>
        <div className="max-w-lg mx-auto bg-white rounded-lg p-6">
          <Text className="text-center text-lg font-semibold text-gray-800">
            Inicia sesión en <strong>{host}</strong>
          </Text>
          <div className="mt-6 text-center">
            <Button
              href={url}
              className="bg-primary text-primary border border-primary rounded py-2 px-4 font-bold"
            >
              Continuar sesión
            </Button>
          </div>
          <Text className="mt-4 text-center text-gray-600">
            Si no solicitaste este correo, puedes ignorarlo con seguridad.
          </Text>
        </div>
      </Body>
    </Html>
  )
};
