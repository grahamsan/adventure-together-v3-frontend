'use client';

import { useRef, useState } from 'react';
import { Paperclip, Send, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ChatInputProps = {
  onSend: (message: string, files: File[]) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim() && files.length === 0) return;

    onSend(message, files);
    setMessage('');
    setFiles([]);
  };

  return (
    <div className="border-t border-gray-200 bg-white px-3 py-2">
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files));
            }
          }}
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire un message..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)]"
        />

        <Button onClick={handleSend} size="icon">
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
