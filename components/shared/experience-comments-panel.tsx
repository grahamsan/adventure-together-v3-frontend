"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  X,
  MoreVertical,
  Trash2,
  SendHorizonal,
  Puzzle,
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
import UserAvatarComponent from "./user-avatar-component";
import { useUserControllerGetMe } from "@/api/users/hooks";
import { cn } from "@/lib/utils";

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
    <div className={cn(isReply && "ml-12")}>
      <div className="flex gap-3 group">
        <UserAvatarComponent
          fullname={authorName}
          avatar={comment.user.avatarUrl}
          size={40}
        />
        <div className="w-fit">
          <div className="bg-second-50 rounded-[8px] px-4 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-x-2 items-center">
                <p className="font-semibold text-sm text-gray-900">
                  {authorName}
                </p>
                {comment.user.role === "Organizer" && (
                  <span className="rounded-[8px] bg-second-50 h-6 w-6 flex items-center justify-center font-medium">
                    <Puzzle className="h-4 w-4 text-second-500" />
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
              type="button"
              onClick={() => onLike(comment.id)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span className="font-medium">{comment.likesCount}</span>
            </button>

            <button
              type="button"
              onClick={() => onDislike(comment.id)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 transition-colors"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              <span className="font-medium">{comment.dislikesCount}</span>
            </button>

            {!isReply && (
              <button
                type="button"
                onClick={() => onReply(comment.id, authorName)}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-second-500 cursor-pointer transition-colors"
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
                  comment={reply as Comment}
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

export function ExperienceCommentsPanel({
  experienceId,
  eventTitle,
  className,
  embedded = false,
}: {
  experienceId: string;
  eventTitle: string;
  className?: string;
  /** Dans un Dialog : hauteur scroll contrôlée */
  embedded?: boolean;
}) {
  const [newComment, setNewComment] = React.useState("");
  const [replyTo, setReplyTo] = React.useState<{
    id: string;
    authorName: string;
  } | null>(null);

  const { data: me } = useUserControllerGetMe();

  const { data: commentsData, isLoading } =
    useCommentsControllerFindAll(experienceId);
  const createComment = useCommentsControllerCreate();
  const likeComment = useCommentsControllerLike();
  const dislikeComment = useCommentsControllerDislike();
  const reportComment = useCommentsControllerReport();
  const removeComment = useCommentsControllerRemove();

  const comments = React.useMemo(() => {
    const raw = commentsData || [];
    return raw.filter((c) => c.parentId == null || c.parentId === "");
  }, [commentsData]);

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
    } catch {
      toast.error("Impossible de publier le commentaire.");
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await likeComment.mutateAsync({ id: commentId });
    } catch {
      toast.error("Impossible de liker le commentaire.");
    }
  };

  const handleDislike = async (commentId: string) => {
    try {
      await dislikeComment.mutateAsync({ id: commentId });
    } catch {
      toast.error("Impossible de disliker le commentaire.");
    }
  };

  const handleReport = async (commentId: string) => {
    try {
      await reportComment.mutateAsync({ id: commentId });
      toast.success("Signalement envoyé");
    } catch {
      toast.error("Impossible de signaler le commentaire.");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await removeComment.mutateAsync({ id: commentId });
      toast.success("Commentaire supprimé");
    } catch {
      toast.error("Impossible de supprimer le commentaire.");
    }
  };

  const handleReply = (commentId: string, authorName: string) => {
    setReplyTo({ id: commentId, authorName });
  };

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col",
        embedded && "max-h-[min(70vh,520px)]",
        className,
      )}
    >
      <p className="sr-only">Commentaires pour {eventTitle}</p>
      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto px-1",
          embedded ? "py-2" : "px-6 py-4",
        )}
      >
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              <p className="text-sm text-gray-500">
                Chargement des commentaires...
              </p>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center text-center">
            <p className="mb-1 text-sm text-gray-500">
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
                currentUserId={me?.id}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className={cn(
          "border-t bg-white",
          embedded ? "mt-2 rounded-lg border-gray-100 p-3" : "rounded-b-[24px] px-6 py-4",
        )}
      >
        {replyTo && (
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-gray-600">
            <Reply className="h-4 w-4 shrink-0" />
            <span>
              Répondre à{" "}
              <span className="font-medium">{replyTo.authorName}</span>
            </span>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="ml-auto rounded p-0.5 transition-colors hover:bg-blue-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 rounded-b-[12px]">
          <Textarea
            placeholder="Écrire un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-8 max-h-24 resize-none rounded-[8px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || createComment.isPending}
            className="h-11 w-11 shrink-0 rounded-[8px] bg-brand-600 hover:bg-brand-700"
            size="icon"
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
