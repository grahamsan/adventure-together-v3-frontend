"use client";

import { Message } from "@/features/messages/types";

export function MessageBubble({
  message,
  sender,
  avatar,
  timestamp,
  isOwn,
}: Message) {
  return (
    <div className={`flex gap-3 px-4 py-2 ${isOwn ? "flex-row-reverse" : ""}`}>
      {avatar && (
        <div className="flex-shrink-0">
          <img
            src={avatar}
            alt={sender}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      )}
      <div
        className={`flex flex-col gap-1 max-w-[75%] lg:max-w-[65%] ${
          isOwn ? "items-end" : ""
        }`}
      ></div>
    </div>
  );
}
