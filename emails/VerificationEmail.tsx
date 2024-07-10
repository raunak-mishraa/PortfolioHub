import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Tailwind,
    // Font
  } from "@react-email/components";

  interface VerificationEmailProps {
    username: string;
    otp: string;
  }

  const baseUrl = 'https://avatars.githubusercontent.com/u/107386749?v=4';


export default function VerificationEmail({username, otp}:VerificationEmailProps) {
  return (
    <Html>
       <Head/>
        <Preview>OTP Verification</Preview>
          <Tailwind>
            <Body className="bg-white text-gray-900">
              <Container className="p-5 mx-auto bg-gray-200">
                <Section className="bg-white">
                  <Section className="px-10 py-6">
                  <Heading className="text-gray-800 font-bold text-base">Hello {username},</Heading>
                    <Heading className="text-gray-800 font-bold text-xl mb-4">
                      Verify your account
                    </Heading>
                    <Text className="text-gray-800 text-base mb-6">
                    Thank you for registering. Please use the following verification
                    code to complete your registration.
                    </Text>
                    <Section className="flex items-center justify-center mx-auto">
                      <Text className="text-gray-800 text-base font-bold text-center mb-0">
                        Verification code
                      </Text>
                      <Text className="text-gray-800 text-3xl font-bold text-center my-2">
                        {otp}
                      </Text>
                    </Section>
                  </Section>
                </Section>
              </Container>
            </Body>
          </Tailwind>
    </Html>
);
}