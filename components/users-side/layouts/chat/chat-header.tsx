'use client';

import { ChevronLeft, EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ChatHeaderProps = {
  chatName: string;
  onBack: () => void;
};

export default function ChatHeader({ chatName, onBack }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200 bg-white">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <h1 className="text-base font-semibold text-gray-900 truncate">
        {chatName}
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>Voir le profil</DropdownMenuItem>
          <DropdownMenuItem>Rechercher</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            Supprimer la discussion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
