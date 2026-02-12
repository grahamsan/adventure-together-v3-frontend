// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  conversationsControllerFindAll,
  conversationsControllerFindOne,
  conversationsControllerGetMessages,
  conversationsControllerCreateMessage,
  conversationsControllerUpdateMessage,
  conversationsControllerDeleteMessage,
  conversationsControllerMarkAsRead
} from './api';
import type { CreateMessageDto, UpdateMessageDto } from './types';

// Query Hooks

export const useConversationsControllerFindAll = () => {
  return useQuery({
    queryKey: queryKeys.conversations.lists(),
    queryFn: conversationsControllerFindAll,
  });
};

export const useConversationsControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.conversations.detail(id),
    queryFn: () => conversationsControllerFindOne(id),
    enabled: !!(id),
  });
};

export const useConversationsControllerGetMessages = (id: string) => {
  return useQuery({
    queryKey: queryKeys.conversations.detail(id),
    queryFn: () => conversationsControllerGetMessages(id),
    enabled: !!(id),
  });
};


// Mutation Hooks

export const useConversationsControllerCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: CreateMessageDto & { id: string }) => conversationsControllerCreateMessage(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
    },
  });
};

export const useConversationsControllerUpdateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateMessageDto & { messageId: string }) => conversationsControllerUpdateMessage(vars.messageId, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
    },
  });
};

export const useConversationsControllerDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { messageId: string }) => conversationsControllerDeleteMessage(vars.messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
    },
  });
};

export const useConversationsControllerMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => conversationsControllerMarkAsRead(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
    },
  });
};

