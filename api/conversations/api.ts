// Auto-generated API functions
import api from '@/lib/axios';
import type { CreateMessageDto, UpdateMessageDto } from './types';

/**
 * Get user conversations
 */
export const conversationsControllerFindAll = async (): Promise<any> => {
  const { data } = await api.get<any>(`/conversations`);
  return data;
};

/**
 * Get conversation details
 */
export const conversationsControllerFindOne = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/conversations/${id}`);
  return data;
};

/**
 * Get messages in a conversation
 */
export const conversationsControllerGetMessages = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/conversations/${id}/messages`);
  return data;
};

/**
 * Send a message
 */
export const conversationsControllerCreateMessage = async (id: string, payload: CreateMessageDto): Promise<any> => {
  const { data } = await api.post<any>(`/conversations/${id}/messages`, payload);
  return data;
};

/**
 * Update a message
 */
export const conversationsControllerUpdateMessage = async (messageId: string, payload: UpdateMessageDto): Promise<any> => {
  const { data } = await api.patch<any>(`/conversations/messages/${messageId}`, payload);
  return data;
};

/**
 * Delete a message
 */
export const conversationsControllerDeleteMessage = async (messageId: string): Promise<any> => {
  const { data } = await api.delete<any>(`/conversations/messages/${messageId}`);
  return data;
};

/**
 * Mark conversation messages as read
 */
export const conversationsControllerMarkAsRead = async (id: string): Promise<any> => {
  const { data } = await api.post<any>(`/conversations/${id}/read`);
  return data;
};

