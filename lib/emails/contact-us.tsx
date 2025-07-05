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
}

export const ContactUsEmail = ({ email, firstName, lastName, company, phone, message }: EmailProps) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Container className="mx-auto my-[40px] max-w-[770px] rounded border border-solid border-[#eaeaea] p-[20px]">
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
                            Message from {firstName} {lastName}
                        </Heading>

                        <Text className="text-[14px] leading-[24px] text-black">
                            Message: {message}
                        </Text>

                        <Text className="text-[14px] leading-[24px] text-black">
                            Company: {company}
                        </Text>

                        <Text className="text-[14px] leading-[24px] text-black">
                            Phone: {phone}
                        </Text>

                        <Text className="text-[14px] leading-[24px] text-black">
                            Email: {email}
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactUsEmail;
