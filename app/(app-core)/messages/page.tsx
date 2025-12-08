'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatSidebar } from '@/components/users-side/chat/chat-list';
import { EmptyState } from '@/components/users-side/chat/layouts/empty-state';

export default function MessagesPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelectChat = (chatId: string, userName: string) => {
    router.push(`/messages/${chatId}`);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <ChatSidebar onSelectChat={handleSelectChat} selectedChatId={null} />
      {!isMobile && <EmptyState />}
    </div>
  );
}
