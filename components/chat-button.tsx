"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, X, MessageCircle } from "lucide-react";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              href="mailto:info@blackboxdesigns.co.za"
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -120, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 right-0 w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center shadow-lg text-white"
              aria-label="Send Email"
            >
              <Mail size={20} />
            </motion.a>

            <motion.a
              href="https://wa.me/+27696376056" // Replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -60, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-0 right-0 w-12 h-12 bg-green-300 rounded-full flex items-center justify-center shadow-lg text-white"
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
