"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MessagesSquare } from "lucide-react";
import { ExperienceCommentsPanel } from "../experience-comments-panel";

interface EventDetailsDrawerProps {
  experienceId: string;
  eventTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EventDetailsSheet({
  experienceId,
  eventTitle,
  open,
  onOpenChange,
}: EventDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-md:w-full max-md:max-w-full max-md:rounded-none max-md:mr-0 md:h-[98vh] md:w-[30vw] my-auto md:mr-4 flex min-h-0 flex-col rounded-[12px] md:[&>button]:hidden">
        <SheetHeader className="border-b px-6 py-4 max-md:pr-14">
          <SheetTitle className="text-lg font-semibold flex items-center gap-2 text-second-500">
            <span className="flex items-center h-10 w-10 bg-brand-50 text-brand-500 p-2 rounded-[10px]">
              <MessagesSquare className="h-5 w-5 " />
            </span>
            Commentaires - {eventTitle}
          </SheetTitle>
        </SheetHeader>

        <ExperienceCommentsPanel
          experienceId={experienceId}
          eventTitle={eventTitle}
          className="min-h-0 flex-1"
        />
      </SheetContent>
    </Sheet>
  );
}
