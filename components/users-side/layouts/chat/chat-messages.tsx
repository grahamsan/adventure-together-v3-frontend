import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  useConversationsControllerGetMessages,
  useConversationsControllerMarkAsRead,
  useConversationsControllerDeleteMessage,
} from "@/api/conversations/hooks";
import { useUserControllerGetMe } from "@/api/users/hooks";
import { ChatMessage } from "@/api/conversations/types";
import { Loader2, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import MessageBubble from "./chat-message-bubble";

type ChatMessagesProps = {
  chatId: string;
  onEdit: (message: { id: string; text: string }) => void;
  chatSocket?: any;
};

export default function ChatMessages({
  chatId,
  onEdit,
  chatSocket,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages, isLoading } =
    useConversationsControllerGetMessages(chatId);

  const { data: currentUser } = useUserControllerGetMe();

  const markAsReadMutation = useConversationsControllerMarkAsRead();
  const deleteMessageMutation = useConversationsControllerDeleteMessage();

  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(
    null,
  );

  // Scroll to bottom on load and new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages?.length]);

  // Mark as read when chat is opened
  const unreadMessageIds = useMemo(() => {
    if (!messages || !Array.isArray(messages) || !currentUser) return "";

    return (messages as ChatMessage[])
      .filter(
        (m) =>
          !m.readByUserIds?.includes(currentUser.id) &&
          m.senderId !== currentUser.id,
      )
      .map((m) => m.id)
      .sort()
      .join(",");
  }, [messages, currentUser]);

  const markAsReadMutate = markAsReadMutation.mutate;

  useEffect(() => {
    if (chatId && unreadMessageIds) {
      markAsReadMutate({ id: chatId });
    }
  }, [chatId, unreadMessageIds, markAsReadMutate]);

  // ✅ AJOUT: WebSocket listeners
  const handleNewMessage = useCallback(
    (message: ChatMessage) => {
      console.log("📨 New message received via WebSocket:", message);

      // Invalider la query pour rafraîchir les messages
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.message(chatId),
      });

      // Scroll automatique vers le bas
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    },
    [chatId, queryClient],
  );

  const handleMessageUpdated = useCallback(
    (message: ChatMessage) => {
      console.log("✏️ Message updated via WebSocket:", message);

      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.message(chatId),
      });
    },
    [chatId, queryClient],
  );

  const handleMessageDeleted = useCallback(
    (data: { messageId: string }) => {
      console.log("🗑️ Message deleted via WebSocket:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.message(chatId),
      });
    },
    [chatId, queryClient],
  );

  // ✅ Setup WebSocket listeners
  useEffect(() => {
    if (!chatSocket) {
      console.log("⚠️ No chat socket available");
      return;
    }

    console.log("🔗 Setting up WebSocket listeners for messages");

    chatSocket.on("newMessage", handleNewMessage);
    chatSocket.on("messageUpdated", handleMessageUpdated);
    chatSocket.on("messageDeleted", handleMessageDeleted);

    return () => {
      console.log("🧹 Cleaning up WebSocket listeners for messages");
      chatSocket.off("newMessage", handleNewMessage);
      chatSocket.off("messageUpdated", handleMessageUpdated);
      chatSocket.off("messageDeleted", handleMessageDeleted);
    };
  }, [
    chatSocket,
    handleNewMessage,
    handleMessageUpdated,
    handleMessageDeleted,
  ]);

  const handleDelete = (messageId: string) => {
    deleteMessageMutation.mutate(
      { messageId },
      {
        onSuccess: () => {
          toast.success("Message supprimé");
          setDeletingMessageId(null);
        },
        onError: () => {
          toast.error("Erreur lors de la suppression");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--BRAND-500)]" />
      </div>
    );
  }

  if (!messages || !Array.isArray(messages)) {
    console.error("❌ Messages is not an array:", messages);
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <p className="text-gray-500">Erreur de chargement des messages</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: queryKeys.conversations.message(chatId),
              })
            }
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <div className="text-6xl">💬</div>
          <p className="text-gray-400 text-sm">Aucun message pour le moment</p>
          <p className="text-gray-300 text-xs">Envoyez le premier message !</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto scrollbar-thin 
      scrollbar-thumb-gray-300 scrollbar-track-gray-100 
      px-4 py-3 bg-gray-50 space-y-3 flex flex-col"
    >
      {messages.map((message) => {
        const isMe = message.senderId === currentUser?.id;

        return (
          <div
            key={message.id}
            className={`group max-w-[75%] rounded-lg shadow-sm relative flex flex-col ${
              isMe ? "self-end ml-auto bg-[var(--BRAND-500)]" : "self-start"
            }`}
          >
            {/* 🎯 Utilisation de MessageBubble pour afficher le message (texte ou image) */}
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <MessageBubble message={message} isCurrentUser={isMe} />
              </div>

              {/* Menu d'actions (uniquement pour les messages de l'utilisateur) */}
              {isMe && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                    >
                      <EllipsisVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        onEdit({ id: message.id, text: message.content })
                      }
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => setDeletingMessageId(message.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Timestamp */}
            <span
              className={`text-[10px] mt-1 px-3 ${
                isMe ? "text-gray-500 text-right" : "text-gray-400"
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      })}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingMessageId}
        onOpenChange={(open) => !open && setDeletingMessageId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le message ?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500">
            Cette action est irréversible. Voulez-vous vraiment supprimer ce
            message ?
          </p>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>

            <Button
              variant="destructive"
              onClick={() =>
                deletingMessageId && handleDelete(deletingMessageId)
              }
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
