// types.ts
export interface User {
  name: string;
  avatar: string;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  unread: number;
  timestamp: string;
}

export interface Trip {
  id: string;
  title: string;
  date: string;
  chats: Chat[];
}

export interface Message {
  id: string;
  sender: string;
  message: string;
  avatar?: string;
  timestamp: string;
  isOwn: boolean;
}