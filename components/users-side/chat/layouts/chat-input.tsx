'use client';

import { useState } from 'react';
import { Send, Plus } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white px-4 py-3 flex-shrink-0">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
        <input
          type="text"
          placeholder="Écrivez un message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[[var(--BRAND-500)]] focus:border-transparent"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-[[var(--BRAND-500)]] hover:bg-[#4090E0] rounded-full transition-colors flex-shrink-0"
        >
          <Send className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
