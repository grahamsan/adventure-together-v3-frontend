"use client";

import QuickMessagesWidget from "./widgets/quick-messages-widget";
import WelcomeWidget from "./widgets/welcome-widget";
import UpcomingEventsWidget from "./widgets/upcoming-event-section";
import UpcomingTripsWidget from "./widgets/upcoming-trips-widget";
import QuickNotificationsWidget from "./widgets/quick-notification-widget";

export default function WelcomeSection() {
  return (
    <div className="fixed right-0 top-16 flex flex-col w-full lg:w-[320px] h-screen">
      <div className="flex-1 overflow-y-auto p-4 pb-25 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <WelcomeWidget />
        <UpcomingEventsWidget />
        <UpcomingTripsWidget />
        <QuickNotificationsWidget />
        <QuickMessagesWidget />
      </div>
    </div>
  );
}
