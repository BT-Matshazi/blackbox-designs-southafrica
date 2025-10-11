import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Img,
    Html,
    Link,
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
    attachmentType
}: EmailProps) => {
    const formatFileSize = (bytes?: number) => {
        if (!bytes) return '';
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        return `${(kb / 1024).toFixed(2)} MB`;
    };

    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Container className="mx-auto my-[40px] max-w-[770px] rounded border border-solid border-[#eaeaea] p-[20px]">
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
                            New Contact Request from {firstName} {lastName}
                        </Heading>

                        <Section className="mb-[32px]">
                            <Heading className="text-[18px] font-semibold text-black mb-[12px]">
                                Contact Details
                            </Heading>
                            <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                <strong>Name:</strong> {firstName} {lastName}
                            </Text>
                            <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                <strong>Email:</strong> {email}
                            </Text>
                            <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                <strong>Phone:</strong> {phone}
                            </Text>
                            {company && (
                                <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                    <strong>Company:</strong> {company}
                                </Text>
                            )}
                        </Section>

                        {(projectType || budgetRange) && (
                            <Section className="mb-[32px]">
                                <Heading className="text-[18px] font-semibold text-black mb-[12px]">
                                    Project Information
                                </Heading>
                                {projectType && (
                                    <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                        <strong>Project Type:</strong> {projectType}
                                    </Text>
                                )}
                                {budgetRange && (
                                    <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                        <strong>Budget Range:</strong> {budgetRange}
                                    </Text>
                                )}
                            </Section>
                        )}

                        <Section className="mb-[32px]">
                            <Heading className="text-[18px] font-semibold text-black mb-[12px]">
                                Message
                            </Heading>
                            <Text className="text-[14px] leading-[24px] text-black whitespace-pre-wrap">
                                {message}
                            </Text>
                        </Section>

                        {attachmentName && (
                            <Section className="mb-[32px]">
                                <Heading className="text-[18px] font-semibold text-black mb-[12px]">
                                    Attachment
                                </Heading>
                                <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                    <strong>File:</strong> {attachmentName}
                                </Text>
                                {attachmentSize && (
                                    <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                        <strong>Size:</strong> {formatFileSize(attachmentSize)}
                                    </Text>
                                )}
                                {attachmentType && (
                                    <Text className="text-[14px] leading-[24px] text-black my-[8px]">
                                        <strong>Type:</strong> {attachmentType}
                                    </Text>
                                )}
                            </Section>
                        )}

                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                        <Text className="text-[12px] leading-[24px] text-gray-500">
                            This email was sent from the contact form on blackboxdesigns.co.za
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactUsEmail;
