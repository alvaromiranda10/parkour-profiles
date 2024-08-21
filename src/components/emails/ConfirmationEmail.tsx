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
        <Preview>Sign in to {host}</Preview>
        <div className="max-w-lg mx-auto bg-white rounded-lg p-6">
          <Text className="text-center text-lg font-semibold text-gray-800">
            Sign in to <strong>{host}</strong>
          </Text>
          <div className="mt-6 text-center">
            <Button
              href={url}
              className="bg-primary text-primary border border-primary rounded py-2 px-4 font-bold"
            >
              Sign in
            </Button>
          </div>
          <Text className="mt-4 text-center text-gray-600">
            If you did not request this email you can safely ignore it.
          </Text>
        </div>
      </Body>
    </Html>
  )
};
