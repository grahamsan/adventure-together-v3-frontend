"use client";

import { MoreHorizontal, ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
  userName: string;
  onBack?: () => void;
}

export function ChatHeader({ userName, onBack }: ChatHeaderProps) {
  return (
    <div className="w-full flex bg-white border-t border-gray-200 py-4 px-6 justify-between items-center z-15 h-[82px]">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900">{userName}</h2>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <MoreHorizontal className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}
