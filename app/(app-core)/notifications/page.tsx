'use client';

import { useState, useEffect } from 'react';
import { NotificationFiltersSidebar } from '@/components/users-side/notifications/notif-filter';
import { NotificationList } from '@/components/users-side/notifications/notif-list';
import { NotificationFilters } from '@/features/notifications/types';
import { Menu, X } from 'lucide-react';

export default function NotificationsPage() {
  const [filters, setFilters] = useState<NotificationFilters>({
    type: null,
    experience: '',
    trip: '',
  });
  
  const [appliedFilters, setAppliedFilters] = useState<NotificationFilters>(filters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setIsMobileFilterOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      type: null,
      experience: '',
      trip: '',
    };
    setFilters(resetFilters);
    setAppliedFilters(resetFilters);
  };

  return (
    <div className="max-h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar Desktop */}
      {!isMobile && (
        <NotificationFiltersSidebar
          filters={filters}
          onFiltersChange={setFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
      )}

      {/* Sidebar Mobile */}
      {isMobile && (
        <>
          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Overlay */}
          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Sidebar Mobile Slide-in */}
          <div
            className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
              isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-screen overflow-y-auto">
              <NotificationFiltersSidebar
                filters={filters}
                onFiltersChange={setFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
              />
            </div>
          </div>
        </>
      )}

      <NotificationList filters={appliedFilters} />
    </div>
  );
}
