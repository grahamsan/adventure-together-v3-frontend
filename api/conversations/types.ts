// Auto-generated TypeScript types

export interface CreateMessageDto {
  text: string;

  attachments?: string[];
}

export interface UpdateMessageDto {
  text: string;

  attachments?: ChatAttachment[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
  senderName: string;
  readByUserIds: string[];
}

export interface Conversation {
  id: string;
  name: string;
  type: ConversationType;
  trip: ConversationTrip;
  unreadCount: number;
  lastMessage: ChatMessage | null;
  destinataireId: string;
  destinataireName: string;
  applyId: string;
  tripId: string;
  applyStatus: string;
}

export interface ConversationTrip {
  from: string;
  to: string;
}

export type ConversationType = "user2user" | "group" | "support";

export interface ChatAttachment {
  url: string;
}
