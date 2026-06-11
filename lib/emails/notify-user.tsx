import {
    Body,
    Button,
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
import * as React from "react";

interface EmailProps {
    email?: string;
}

// Ink & Crimson brand palette (matches app/globals.css)
const INK = "#1B1B20";
const MUTED = "#6B6B74";
const BORDER = "#E8E6E1";
const PAPER = "#FBFAF7";
const CRIMSON = "#D43F52";

export const NotifyUserEmail = ({ email }: EmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>
                We&apos;ve received your message and will get back to you as soon
                as possible.
            </Preview>
            <Tailwind>
                <Body className={`mx-auto my-auto bg-[${PAPER}] px-2 font-sans`}>
                    <Container
                        className={`mx-auto my-[40px] max-w-[600px] rounded-[16px] border border-solid border-[${BORDER}] border-t-[4px] border-t-[${CRIMSON}] bg-white p-[32px]`}
                    >
                        {/* Brand mark — the black box, rebuilt in HTML for email clients */}
                        <Text className="m-0 mb-[28px]">
                            <span
                                className={`inline-block rounded-[8px] bg-[${INK}] px-[11px] py-[5px] text-[16px] font-bold leading-[20px] text-white`}
                            >
                                B
                            </span>
                            <span
                                className={`ml-[10px] text-[16px] font-semibold text-[${INK}]`}
                            >
                                BlackBox Designs
                            </span>
                        </Text>

                        <Text
                            className={`m-0 mb-[8px] text-[11px] font-bold uppercase tracking-[3px] text-[${MUTED}]`}
                        >
                            <span className={`text-[${CRIMSON}]`}>&#9632;</span>
                            &nbsp;&nbsp;Message Received
                        </Text>
                        <Heading
                            className={`m-0 mb-[20px] text-[26px] font-bold leading-[32px] text-[${INK}]`}
                        >
                            Thanks for reaching out
                        </Heading>

                        <Text
                            className={`m-0 mb-[12px] text-[14px] leading-[24px] text-[${INK}]`}
                        >
                            Good day,
                        </Text>
                        <Text
                            className={`m-0 mb-[28px] text-[14px] leading-[24px] text-[${MUTED}]`}
                        >
                            Thank you for contacting BlackBox Designs. Your message has
                            landed safely in our inbox, and a member of our team will get
                            back to you as soon as possible.
                        </Text>

                        <Section className="mb-[8px]">
                            <Button
                                href="https://www.blackboxdesigns.co.za/portfolio"
                                className={`rounded-[8px] bg-[${INK}] px-[28px] py-[12px] text-[14px] font-semibold text-white`}
                            >
                                Explore Our Work &rarr;
                            </Button>
                        </Section>

                        <Hr
                            className={`mx-0 my-[28px] w-full border border-solid border-[${BORDER}]`}
                        />

                        <Text className={`m-0 text-[12px] leading-[20px] text-[${MUTED}]`}>
                            This email was intended for{" "}
                            <span className={`font-medium text-[${INK}]`}>{email}</span>.
                            Powered by{" "}
                            <Link
                                href="https://www.blackboxdesigns.co.za/"
                                className={`font-semibold text-[${CRIMSON}]`}
                            >
                                BlackBox Designs
                            </Link>{" "}
                            — your web design and development solution.
                        </Text>
                        <Text className={`m-0 mt-[8px] text-[12px] leading-[20px] text-[${MUTED}]`}>
                            <span className={`text-[${CRIMSON}]`}>&#9632;</span>
                            &nbsp;&nbsp;Johannesburg, South Africa
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default NotifyUserEmail;
