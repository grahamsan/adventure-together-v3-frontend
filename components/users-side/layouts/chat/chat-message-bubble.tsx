"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ChatMessage, ChatAttachment } from "@/api/conversations/types";

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export default function MessageBubble({
  message,
  isCurrentUser,
}: MessageBubbleProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Vérifier si le message contient des fichiers
  const hasAttachments = message.attachments && message.attachments.length > 0;
  const isFileType = hasAttachments;

  // Récupération de l'URL de la première image
  const getImageUrl = (): string | null => {
    if (!hasAttachments) {
      return null;
    }

    const firstAttachment = message.attachments![0];

    // Si c'est un string directement (format du serveur: string[])
    if (typeof firstAttachment === "string") {
      return firstAttachment;
    }

    // Si c'est un objet ChatAttachment (format objet: ChatAttachment[])
    if (
      firstAttachment &&
      typeof firstAttachment === "object" &&
      "url" in firstAttachment
    ) {
      return firstAttachment.url;
    }

    return null;
  };

  const imageUrl = getImageUrl();

  /** Placeholder côté client quand seul un fichier est envoyé sans légende (voir chat-input). */
  const hideTextAsFilePlaceholder =
    hasAttachments &&
    message.content.trim().toLowerCase() === "isfile";

  return (
    <div
      className={`rounded-lg px-3 py-2 w-full ${
        isCurrentUser
          ? "bg-[var(--BRAND-500)] text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Type: File - Affichage de l'image */}
      {isFileType && imageUrl && (
        <div className="rounded-lg overflow-hidden mb-2">
          {imageLoading && !imageError && (
            <div className="w-full h-48 bg-gray-200/30 flex items-center justify-center rounded-lg">
              <Loader2
                className={`w-6 h-6 animate-spin ${
                  isCurrentUser ? "text-white/70" : "text-gray-400"
                }`}
              />
            </div>
          )}

          {imageError ? (
            <div className="p-3 bg-red-100/20 rounded-lg text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span
                className={isCurrentUser ? "text-white/90" : "text-red-700"}
              >
                Impossible de charger l'image
              </span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Pièce jointe"
              className={`w-full h-auto rounded-[8px] ${
                imageLoading ? "hidden" : "block"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          )}
        </div>
      )}

      {/* Type: Text - Affichage du contenu texte */}
      {message.content && !hideTextAsFilePlaceholder && (
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
      )}
    </div>
  );
}
