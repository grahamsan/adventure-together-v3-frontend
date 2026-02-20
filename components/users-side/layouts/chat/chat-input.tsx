"use client";

import { useRef, useState, useEffect } from "react";
import {
  Paperclip,
  SendHorizonal,
  X,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTripsControllerDecision } from "@/api/trips/hooks";
import { useGetUserRole } from "@/api/app/hooks";
import { useUploadControllerUploadSingle } from "@/api/upload/hooks";
import { useConversationsControllerCreateMessage } from "@/api/conversations/hooks";
import { useSendMessageWithImageStore } from "@/api/stores/message-w-image-store";
import { toast } from "react-hot-toast";

type ChatInputProps = {
  onSend: (message: string, files: File[]) => void;
  isLoading?: boolean;
  defaultValue?: string;
  isEditing?: boolean;
  onCancelEdit?: () => void;
  // Props pour la décision
  tripId?: string;
  applyId?: string;
  // Props pour l'envoi de message avec image
  conversationId?: string;
  applyStatus: string;
  onMessageSent?: () => void;
};

export default function ChatInput({
  onSend,
  isLoading,
  defaultValue = "",
  isEditing = false,
  onCancelEdit,
  tripId,
  applyId,
  conversationId,
  applyStatus,
  onMessageSent,
}: ChatInputProps) {
  const [message, setMessage] = useState(defaultValue);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🎯 Récupération du rôle
  const { isDriver } = useGetUserRole();
  const decisionMutation = useTripsControllerDecision();

  // 🎯 Hooks pour l'upload et l'envoi de message
  const uploadMutation = useUploadControllerUploadSingle();
  const createMessageMutation = useConversationsControllerCreateMessage();

  // 🎯 Store pour gérer le processus d'envoi
  const { isProcessing, currentStep, setProcessing, setStep, setError, reset } =
    useSendMessageWithImageStore();

  const showDecisionButton =
    isDriver && tripId && applyId && !isEditing && applyStatus === "pending";

  useEffect(() => {
    setMessage(defaultValue);
  }, [defaultValue]);

  // Gestion des previews d'images
  useEffect(() => {
    if (files.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendWithImage = async () => {
    if ((!message.trim() && files.length === 0) || isProcessing) return;

    setProcessing(true);
    setStep("uploading");

    try {
      let attachments: string[] | undefined;

      // 1️⃣ Upload du fichier si présent
      if (files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await uploadMutation.mutateAsync({
          file: formData.get("file") as string,
        });

        // La réponse a la structure: { statusCode: 201, data: { url: "...", ... } }
        if (uploadResponse?.data?.url) {
          attachments = [uploadResponse.data.url];
        }
      }

      // 2️⃣ Envoi du message
      setStep("sending");

      if (conversationId) {
        await createMessageMutation.mutateAsync({
          id: conversationId,
          text: message.trim() || "isfile", // Envoyer " " si le texte est vide
          attachments: attachments,
        });

        // Callback de succès
        onMessageSent?.();
      } else {
        // Méthode classique si pas de conversationId
        onSend(message, files);
      }

      // 3️⃣ Réinitialisation
      setStep("complete");
      toast.success("Message envoyé !");

      if (!isEditing) {
        setMessage("");
        setFiles([]);
        setPreviewUrls([]);
      }

      reset();
    } catch (error) {
      setStep("error");
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'envoi",
      );
      toast.error("Erreur lors de l'envoi du message");
      console.error(error);
      reset();
    }
  };

  const handleSend = () => {
    if (files.length > 0 || conversationId) {
      handleSendWithImage();
    } else {
      if ((!message.trim() && files.length === 0) || isLoading) return;
      onSend(message, files);
      if (!isEditing) {
        setMessage("");
        setFiles([]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape" && isEditing && onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleDecision = async (status: "accepted" | "rejected") => {
    if (!tripId || !applyId) {
      toast.error("Informations manquantes");
      return;
    }

    try {
      await decisionMutation.mutateAsync({
        id: tripId,
        applyId: applyId,
        status: status,
      });

      toast.success(
        status === "accepted"
          ? "Candidature acceptée ✅"
          : "Candidature rejetée ❌",
      );
      setPopoverOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la décision");
      console.error(error);
    }
  };

  const isOperationLoading = isLoading || isProcessing;

  return (
    <div className="bg-white px-3 py-2">
      {isEditing && (
        <div className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-t-lg mb-2 text-xs text-gray-500">
          <span>Modification du message</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4"
            onClick={onCancelEdit}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Aperçu des fichiers */}
      {previewUrls.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-300"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isProcessing}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Indicateur de progression */}
      {isProcessing && (
        <div className="mb-2 text-xs text-gray-500 flex items-center gap-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>
            {currentStep === "uploading" && "Upload en cours..."}
            {currentStep === "sending" && "Envoi du message..."}
            {currentStep === "complete" && "Message envoyé !"}
          </span>
        </div>
      )}

      <div className="flex items-end gap-x-2">
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isOperationLoading}
            title="Joindre une image"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
        )}

        {/* 🎯 Bouton de décision (visible uniquement pour les Drivers) */}
        {showDecisionButton && (
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                disabled={decisionMutation.isPending}
              >
                {decisionMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 px-2 py-1">
                  Décision sur la candidature
                </p>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => handleDecision("accepted")}
                    disabled={decisionMutation.isPending}
                  >
                    Accepter
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDecision("rejected")}
                    disabled={decisionMutation.isPending}
                  >
                    Rejeter
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={false}
          hidden
          onChange={handleFileSelect}
          disabled={isOperationLoading}
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isEditing ? "Modifier le message..." : "Écrire un message..."
          }
          rows={1}
          className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--BRAND-500)]"
          disabled={isOperationLoading}
        />

        <Button
          onClick={handleSend}
          size="icon"
          disabled={
            isOperationLoading || (!message.trim() && files.length === 0)
          }
        >
          {isOperationLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SendHorizonal className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
