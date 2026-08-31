import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export type AdminInviteEmailProps = {
  firstName: string | null;
  email: string;
  tempPassword: string;
  loginUrl: string;
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

export default function AdminInviteEmail({
  firstName,
  email,
  tempPassword,
  loginUrl,
}: AdminInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;ve been added as a Blackbox Designs administrator.</Preview>
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
                ADMIN ACCESS
              </Text>
              <Heading className="mt-2 mb-1 text-2xl font-bold leading-tight tracking-tight text-ink">
                You&apos;re in.
              </Heading>
              <Text className="m-0 mt-3 text-base leading-relaxed text-ink/80">
                {firstName ? `Hi ${firstName}, ` : ""}
                you&apos;ve been added as an administrator of the Blackbox
                Designs website. Log in with the temporary password below —
                you&apos;ll be asked to choose your own password before you
                continue.
              </Text>
            </Section>

            <Section className="my-8 rounded-2xl bg-soft px-6 py-6">
              <Text className="m-0 text-[11px] uppercase tracking-[0.18em] text-muted">
                Email
              </Text>
              <Text className="m-0 mt-1 text-base font-semibold text-ink">
                {email}
              </Text>
              <Text className="m-0 mt-4 text-[11px] uppercase tracking-[0.18em] text-muted">
                Temporary password
              </Text>
              <Text className="m-0 mt-1 font-mono text-xl font-bold tracking-[0.12em] text-ink">
                {tempPassword}
              </Text>
            </Section>

            <Section className="text-center">
              <Link
                href={loginUrl}
                className="inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper no-underline"
              >
                Log in to the dashboard
              </Link>
            </Section>

            <Hr className="my-6 border-ink/10" />

            <Section>
              <Text className="m-0 text-[12px] leading-relaxed text-muted">
                If you weren&apos;t expecting this invitation, you can ignore
                this email or contact the person who manages the site.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
