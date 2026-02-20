"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { queryKeys } from "@/lib/query-keys";
import {
  useConversationsControllerCreateMessage,
  useConversationsControllerUpdateMessage,
} from "@/api/conversations/hooks";
import { useWebSockets } from "@/hooks/use-websockets";
import { useUserControllerGetMe } from "@/api/users/hooks";
import { toast } from "react-hot-toast";

type ChatComponentProps = {
  chatId: string;
  chatName: string;
  onBack: () => void;
  tripName: string;
  tripId: string;
  applyId: string;
  applyStatus: string;
};

export default function ChatComponent({
  chatId,
  chatName,
  onBack,
  tripName,
  tripId,
  applyId,
  applyStatus,
}: ChatComponentProps) {
  const queryClient = useQueryClient();
  const createMessageMutation = useConversationsControllerCreateMessage();
  const updateMessageMutation = useConversationsControllerUpdateMessage();
  const { data: me } = useUserControllerGetMe();

  const [editingMessage, setEditingMessage] = useState<{
    id: string;
    text: string;
  } | null>(null);

  // WebSocket Integration
  const { chatSocket, joinConversation, leaveConversation, isChatConnected } =
    useWebSockets(me?.id, { enableChat: true, enableNotif: false });

  // Gérer la connexion à la conversation
  useEffect(() => {
    if (chatId && chatSocket && isChatConnected) {
      console.log("📥 Joining conversation:", chatId);
      joinConversation(chatId);

      // Invalider les conversations list pour mettre à jour le dernier message
      const handleNewMessage = () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.conversations.lists(),
        });
      };

      chatSocket.on("newMessage", handleNewMessage);

      return () => {
        console.log("📤 Leaving conversation:", chatId);
        chatSocket.off("newMessage", handleNewMessage);
        leaveConversation(chatId);
      };
    }
  }, [
    chatId,
    chatSocket,
    isChatConnected,
    joinConversation,
    leaveConversation,
    queryClient,
  ]);

  // 🎯 Handler pour l'envoi de message (sans image, fallback)
  const handleSendMessage = (text: string) => {
    if (editingMessage) {
      updateMessageMutation.mutate(
        {
          messageId: editingMessage.id,
          text,
        },
        {
          onSuccess: () => {
            setEditingMessage(null);
            toast.success("Message modifié");
          },
          onError: () => toast.error("Erreur lors de la modification"),
        },
      );
    } else {
      // Ce handler ne sera plus utilisé pour les nouveaux messages
      // car ChatInput gère lui-même l'envoi avec conversationId
      createMessageMutation.mutate(
        { id: chatId, text },
        {
          onSuccess: () => {
            console.log("✅ Message sent successfully");
          },
          onError: () => toast.error("Erreur lors de l'envoi"),
        },
      );
    }
  };

  // 🎯 Callback après envoi réussi d'un message avec image
  const handleMessageSent = () => {
    console.log("✅ Message with image sent successfully");
    // Invalider les queries pour rafraîchir la liste
    queryClient.invalidateQueries({
      queryKey: queryKeys.conversations.lists(),
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white relative rounded-[12px]">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white z-10 rounded-t-[12px]">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <ChatHeader chatName={chatName} onBack={onBack} tripName={tripName} />

        {/* Indicateur de connexion */}
        {/* {!isChatConnected && (
          <div className="ml-auto flex items-center gap-2 text-xs text-amber-600">
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
            Connexion...
          </div>
        )} */}
        {/* {isChatConnected && (
          <div className="ml-auto flex items-center gap-2 text-xs text-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            En ligne
          </div>
        )} */}
      </div>

      <ChatMessages
        chatId={chatId}
        onEdit={(msg) => setEditingMessage(msg)}
        chatSocket={chatSocket} // Passer le socket au composant ChatMessages
      />

      <div className="p-4 bg-white border-t border-gray-100 rounded-b-[12px]">
        <ChatInput
          onSend={handleSendMessage}
          isLoading={
            createMessageMutation.isPending || updateMessageMutation.isPending
          }
          defaultValue={editingMessage?.text || ""}
          isEditing={!!editingMessage}
          onCancelEdit={() => setEditingMessage(null)}
          tripId={tripId}
          applyId={applyId}
          conversationId={chatId}
          onMessageSent={handleMessageSent}
          applyStatus={applyStatus}
        />
      </div>
    </div>
  );
}
