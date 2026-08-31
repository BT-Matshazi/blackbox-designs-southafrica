import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ChatButton from "@/components/chat-button";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatButton />
    </div>
  );
}
