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
    email?: string;
}

export const NotifyUserEmail = ({ email }: EmailProps) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Container className="mx-auto my-[40px] max-w-[770px] rounded border border-solid border-[#eaeaea] p-[20px]">
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
                            Thank you for contacting BlackBox Designs
                        </Heading>
                        <Text className="text-[14px] leading-[24px] text-black">
                            Good day
                        </Text>
                        <Text className="text-[14px] leading-[24px] text-black">
                            Thank you for reaching out to us. We will get back to you as soon
                            as possible.
                        </Text>

                        <Text className="text-[14px] leading-[24px] text-black"></Text>
                        <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
                        <Text className="text-[12px] leading-[24px] text-[#666666]">
                            This email was intended for{" "}
                            <span className="text-black">{email}</span>. This email was
                            powered by{" "}
                            <strong className="text-[#ff677e]">
                                <Link href="https://www.blackboxdesigns.co.za/">
                                    BlackBox Designs
                                </Link>
                            </strong>{" "}
                            your web design and development solution.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default NotifyUserEmail;
