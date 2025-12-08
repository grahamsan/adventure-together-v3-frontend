"use client";

import { useState, useEffect, useRef } from "react";
import { fetchMessages, sendMessage } from "@/features/messages/api";
import { Message } from "@/features/messages/types";
import { ChatHeader } from "./layouts/chat-header";
import { ChatInput } from "./layouts/chat-input";
import { MessageBubble } from "./layouts/chat-bubble";

interface ChatViewProps {
  chatId: string;
  userName: string;
  onBack?: () => void;
}

export function ChatView({ chatId, userName, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchMessages(chatId);
      setMessages(data);
      setLoading(false);
    }
    load();
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    const newMessage = await sendMessage(chatId, messageText);
    setMessages([...messages, newMessage]);
  };
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      shouldScrollRef.current = scrollHeight - scrollTop - clientHeight < 100;
    }
  };

  return (
    <div className="relative h-screen flex flex-col lg:w-[74vw] w-full overflow-hidden">
      <div className="sticky top-14 z-5 flex items-center w-full">
        <ChatHeader userName={userName} onBack={onBack} />
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 flex flex-col-reverse gap-y-6 lg:mb-16 overflow-y-auto lg:p-4 scrollbar-hide w-full"
      >
        {" "}
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[[var(--BRAND-500)]]" />
          </div>
        ) : (
          <div ref={scrollRef} className="h-full overflow-y-auto">
            <div className="py-4 text-center">
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                Aujourd'hui
              </span>
            </div>
            <div className="space-y-1 pb-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} {...msg} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="sticky bottom-14 z-5 border-t bg-white">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
