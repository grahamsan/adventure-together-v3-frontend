'use client';

import { BellOff } from 'lucide-react';

export function NotificationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
      <div className="mb-6 relative">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <BellOff className="w-10 h-10 text-gray-400" />
        </div>
        <div className="absolute inset-0 animate-ping opacity-20">
          <div className="w-20 h-20 rounded-full bg-gray-300" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">No Notifications Here</h3>
      <p className="text-gray-500 text-sm max-w-xs">
        It looks like you're all caught up! Try adjusting your filters to find what you're looking for.
      </p>
    </div>
  );
}
