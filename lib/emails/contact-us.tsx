import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface EmailProps {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    phone: string;
    message: string;
    projectType?: string;
    budgetRange?: string;
    attachmentName?: string;
    attachmentSize?: number;
    attachmentType?: string;
}

// Ink & Crimson brand palette (matches app/globals.css)
const INK = "#1B1B20";
const MUTED = "#6B6B74";
const BORDER = "#E8E6E1";
const PAPER = "#FBFAF7";
const PANEL = "#F6F5F1";
const CRIMSON = "#D43F52";

const DetailRow = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <Row className={`border-b border-solid border-[${BORDER}]`}>
        <Column
            className={`w-[140px] py-[10px] text-[11px] font-bold uppercase tracking-[1px] text-[${MUTED}]`}
        >
            {label}
        </Column>
        <Column className={`py-[10px] text-[14px] font-medium text-[${INK}]`}>
            {value}
        </Column>
    </Row>
);

export const ContactUsEmail = ({
    email,
    firstName,
    lastName,
    company,
    phone,
    message,
    projectType,
    budgetRange,
    attachmentName,
    attachmentSize,
    attachmentType,
}: EmailProps) => {
    const formatFileSize = (bytes?: number) => {
        if (!bytes) return "";
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        return `${(kb / 1024).toFixed(2)} MB`;
    };

    return (
        <Html>
            <Head />
            <Preview>
                New enquiry from {firstName} {lastName}
                {projectType ? ` — ${projectType}` : ""}
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
                            &nbsp;&nbsp;New Enquiry
                        </Text>
                        <Heading
                            className={`m-0 mb-[28px] text-[26px] font-bold leading-[32px] text-[${INK}]`}
                        >
                            {firstName} {lastName} wants to start a project
                        </Heading>

                        <Section className="mb-[28px]">
                            <DetailRow label="Name" value={`${firstName} ${lastName}`} />
                            <DetailRow label="Email" value={email} />
                            {phone && <DetailRow label="Phone" value={phone} />}
                            {company && <DetailRow label="Company" value={company} />}
                            {projectType && (
                                <DetailRow label="Project Type" value={projectType} />
                            )}
                            {budgetRange && (
                                <DetailRow label="Budget" value={budgetRange} />
                            )}
                        </Section>

                        <Text
                            className={`m-0 mb-[8px] text-[11px] font-bold uppercase tracking-[1px] text-[${MUTED}]`}
                        >
                            Message
                        </Text>
                        <Section
                            className={`mb-[28px] rounded-[10px] border-l-[3px] border-solid border-l-[${CRIMSON}] bg-[${PANEL}] px-[20px] py-[6px]`}
                        >
                            <Text
                                className={`whitespace-pre-wrap text-[14px] leading-[24px] text-[${INK}]`}
                            >
                                {message}
                            </Text>
                        </Section>

                        {attachmentName && (
                            <Section className="mb-[28px]">
                                <Text
                                    className={`m-0 mb-[8px] text-[11px] font-bold uppercase tracking-[1px] text-[${MUTED}]`}
                                >
                                    Attachment
                                </Text>
                                <Text
                                    className={`m-0 text-[14px] leading-[22px] text-[${INK}]`}
                                >
                                    {attachmentName}
                                    {attachmentSize
                                        ? ` · ${formatFileSize(attachmentSize)}`
                                        : ""}
                                    {attachmentType ? ` · ${attachmentType}` : ""}
                                </Text>
                            </Section>
                        )}

                        <Button
                            href={`mailto:${email}`}
                            className={`rounded-[8px] bg-[${INK}] px-[28px] py-[12px] text-[14px] font-semibold text-white`}
                        >
                            Reply to {firstName} &rarr;
                        </Button>

                        <Hr
                            className={`mx-0 my-[28px] w-full border border-solid border-[${BORDER}]`}
                        />

                        <Text className={`m-0 text-[12px] leading-[20px] text-[${MUTED}]`}>
                            <span className={`text-[${CRIMSON}]`}>&#9632;</span>
                            &nbsp;&nbsp;Sent from the contact form on
                            blackboxdesigns.co.za
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactUsEmail;
