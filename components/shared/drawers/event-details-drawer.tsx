"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ThumbsUp,
  ThumbsDown,
  Send,
  Reply,
  Flag,
  X,
  MoreVertical,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import {
  useCommentsControllerFindAll,
  useCommentsControllerCreate,
  useCommentsControllerLike,
  useCommentsControllerDislike,
  useCommentsControllerReport,
  useCommentsControllerRemove,
} from "@/api/comments/hooks";
import type { Comment } from "@/api/comments/types";

interface EventDetailsDrawerProps {
  experienceId: string;
  eventTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, authorName: string) => void;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReport: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  currentUserId?: string;
  isReply?: boolean;
}

function CommentItem({
  comment,
  onReply,
  onLike,
  onDislike,
  onReport,
  onDelete,
  currentUserId,
  isReply = false,
}: CommentItemProps) {
  // Déterminer le nom d'affichage selon le type d'utilisateur
  const authorName = React.useMemo(() => {
    if (comment.user.firstName && comment.user.lastName) {
      return `${comment.user.firstName} ${comment.user.lastName}`;
    }
    if (comment.user.name) {
      return comment.user.name;
    }
    if (comment.user.companyName) {
      return comment.user.companyName;
    }
    return "Utilisateur";
  }, [comment.user]);

  const isOwner = currentUserId === comment.user.id;

  return (
    <div className={`${isReply ? "ml-12" : ""}`}>
      <div className="flex gap-3 group">
        <Avatar className="size-9 flex-shrink-0">
          <AvatarImage src={comment.user.avatarUrl || undefined} />
          <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            {authorName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-2xl px-4 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <p className="font-semibold text-sm text-gray-900">
                  {authorName}
                </p>
                {comment.user.role === "Organizer" && (
                  <span className="text-xs text-blue-600 font-medium">
                    Organisateur
                  </span>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isOwner && (
                    <DropdownMenuItem
                      onClick={() => onDelete(comment.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  )}
                  {!isOwner && (
                    <DropdownMenuItem onClick={() => onReport(comment.id)}>
                      <Flag className="h-4 w-4 mr-2" />
                      Signaler
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-gray-700 mt-0.5 break-words">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-1.5 ml-2">
            <button
              onClick={() => onLike(comment.id)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span className="font-medium">{comment.likesCount}</span>
            </button>

            <button
              onClick={() => onDislike(comment.id)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 transition-colors"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              <span className="font-medium">{comment.dislikesCount}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => onReply(comment.id, authorName)}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Reply className="h-3.5 w-3.5" />
                <span className="font-medium">Répondre</span>
              </button>
            )}

            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  onDislike={onDislike}
                  onReport={onReport}
                  onDelete={onDelete}
                  currentUserId={currentUserId}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventDetailsDrawer({
  experienceId,
  eventTitle,
  open,
  onOpenChange,
}: EventDetailsDrawerProps) {
  const [newComment, setNewComment] = React.useState("");
  const [replyTo, setReplyTo] = React.useState<{
    id: string;
    authorName: string;
  } | null>(null);

  // Queries & Mutations
  const { data: commentsData, isLoading } =
    useCommentsControllerFindAll(experienceId);
  const createComment = useCommentsControllerCreate();
  const likeComment = useCommentsControllerLike();
  const dislikeComment = useCommentsControllerDislike();
  const reportComment = useCommentsControllerReport();
  const removeComment = useCommentsControllerRemove();

  const comments = commentsData || [];

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createComment.mutateAsync({
        experienceId,
        content: newComment.trim(),
        parentId: replyTo?.id,
      });

      setNewComment("");
      setReplyTo(null);

      toast.success("Commentaire publié");
    } catch (error) {
      toast.error("Impossible de publier le commentaire.");
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await likeComment.mutateAsync({ id: commentId });
    } catch (error) {
      toast.error("Impossible de liker le commentaire.");
    }
  };

  const handleDislike = async (commentId: string) => {
    try {
      await dislikeComment.mutateAsync({ id: commentId });
    } catch (error) {
      toast.error("Impossible de disliker le commentaire.");
    }
  };

  const handleReport = async (commentId: string) => {
    try {
      await reportComment.mutateAsync({ id: commentId });
      toast.success("Signalement envoyé");
    } catch (error) {
      toast.error("Impossible de signaler le commentaire.");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await removeComment.mutateAsync({ id: commentId });
      toast.success("Commentaire supprimé");
    } catch (error) {
      toast.error("Impossible de supprimer le commentaire.");
    }
  };

  const handleReply = (commentId: string, authorName: string) => {
    setReplyTo({ id: commentId, authorName });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] flex flex-col">
        <DrawerHeader className="border-b px-6 py-4">
          <DrawerTitle className="text-lg font-semibold">
            Commentaires - {eventTitle}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">
                  Chargement des commentaires...
                </p>
              </div>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-sm text-gray-500 mb-1">
                Aucun commentaire pour le moment
              </p>
              <p className="text-xs text-gray-400">
                Soyez le premier à commenter cette expérience !
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: Comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onReport={handleReport}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4 bg-white">
          {replyTo && (
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
              <Reply className="h-4 w-4" />
              <span>
                Répondre à{" "}
                <span className="font-medium">{replyTo.authorName}</span>
              </span>
              <button
                onClick={() => setReplyTo(null)}
                className="ml-auto hover:bg-blue-100 rounded p-0.5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <Textarea
              placeholder="Écrire un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[44px] max-h-32 resize-none rounded-2xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || createComment.isPending}
              className="h-11 w-11 rounded-full flex-shrink-0 bg-blue-600 hover:bg-blue-700"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-2 ml-1">
            Appuyez sur Entrée pour envoyer, Shift + Entrée pour un saut de
            ligne
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
