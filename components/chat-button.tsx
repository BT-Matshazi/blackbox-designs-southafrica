"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, X, MessageCircle } from "lucide-react";
import { decodeContactEmail } from "@/components/obfuscated-email";
import { whatsappLink } from "@/lib/contact";
import { trackContactClick } from "@/lib/analytics";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emailHref, setEmailHref] = useState("#");

  useEffect(() => {
    setEmailHref(`mailto:${decodeContactEmail()}`);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Contact options that slide up */}
            <motion.a
              href={emailHref}
              onClick={() => trackContactClick("email", "chat_button")}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -120, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
              aria-label="Send Email"
            >
              <Mail size={20} />
            </motion.a>

            <motion.a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("whatsapp", "chat_button")}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -60, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle size={20} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main chat button */}
      <motion.button
        onClick={toggleChat}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isOpen ? "bg-accent" : "bg-accent hover:bg-accent/70 animate-pulse"
        }`}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close chat options" : "Open chat options"}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquare size={24} className="text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatButton;
