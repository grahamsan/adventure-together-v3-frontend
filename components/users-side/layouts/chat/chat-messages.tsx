'use client';

type ChatMessagesProps = {
  chatId: string;
};

export default function ChatMessages({ chatId }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-4 py-3 bg-gray-50 space-y-3 flex flex-col-reverse">
      {/* Messages à remplacer plus tard */}
      <div className="self-start bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
        Salut 👋
      </div>

      <div className="self-end bg-[var(--BRAND-500)] text-white rounded-lg px-3 py-2 max-w-[75%] ml-auto">
        Hello !
      </div>
      <div className="self-start bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
        Salut 👋
      </div>

      <div className="self-end bg-[var(--BRAND-500)] text-white rounded-lg px-3 py-2 max-w-[75%] ml-auto">
        Hello !
      </div>
      <div className="self-start bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
        Salut 👋
      </div>

      <div className="self-end bg-[var(--BRAND-500)] text-white rounded-lg px-3 py-2 max-w-[75%] ml-auto">
        Hello !
      </div>
      <div className="self-start bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
        Salut 👋
      </div>

      <div className="self-end bg-[var(--BRAND-500)] text-white rounded-lg px-3 py-2 max-w-[75%] ml-auto">
        Hello !
      </div>
      <div className="self-start bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
        Salut 👋
      </div>

      <div className="self-end bg-[var(--BRAND-500)] text-white rounded-lg px-3 py-2 max-w-[75%] ml-auto">
        Hello !
      </div>
    </div>
  );
}
