"use client";

import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";

type ChatProps = {
  chatId: string;
  chatName: string;
  onBack: () => void;
};

export default function Chat({ chatId, chatName, onBack }: ChatProps) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader chatName={chatName} onBack={onBack} />

      <ChatMessages chatId={chatId} />
      <div className="mb-32">
        <ChatInput
          onSend={(message, files) => {
            console.log("send message", message, files);
          }}
        />
      </div>
    </div>
  );
}
