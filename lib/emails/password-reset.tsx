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
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export type PasswordResetEmailProps = {
  firstName: string | null;
  code: string;
  ttlMinutes: number;
};

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        ink: "#131316",
        crimson: "#D43F52",
        paper: "#FBFAF7",
        soft: "#F0EEE8",
        muted: "#6b6e7a",
      },
    },
  },
};

export default function PasswordResetEmail({
  firstName,
  code,
  ttlMinutes,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Your Blackbox Designs password reset code — expires in ${ttlMinutes} minutes.`}</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="bg-paper m-0 p-0 font-sans text-ink">
          <Container className="mx-auto max-w-[480px] px-6 py-10">
            <Section className="mb-8">
              <Text className="m-0 text-lg font-bold tracking-tight text-ink">
                BLACKBOX<span className="text-crimson">.</span>
              </Text>
            </Section>
            <Section>
              <Text className="m-0 text-[10px] uppercase tracking-[0.2em] text-muted">
                RESET YOUR PASSWORD
              </Text>
              <Heading className="mt-2 mb-1 text-2xl font-bold leading-tight tracking-tight text-ink">
                Reset your password
              </Heading>
              <Text className="m-0 mt-3 text-base leading-relaxed text-ink/80">
                {firstName ? `Hi ${firstName}, ` : ""}
                Use the code below to choose a new password for your Blackbox
                Designs admin account.
              </Text>
            </Section>

            <Section className="my-8 rounded-2xl bg-soft py-6 text-center">
              <Text className="m-0 font-mono text-4xl font-bold tracking-[0.4em] text-ink">
                {code}
              </Text>
              <Text className="m-0 mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">
                Expires in {ttlMinutes} minutes
              </Text>
            </Section>

            <Hr className="my-6 border-ink/10" />

            <Section>
              <Text className="m-0 text-[12px] leading-relaxed text-muted">
                If you didn&apos;t request this email, you can safely ignore
                it — no changes will be made to your account. The code can be
                used once and expires after {ttlMinutes} minutes.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
