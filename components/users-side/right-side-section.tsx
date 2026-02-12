"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import QuickMessagesWidget from "../shared/widgets/quick-messages-widget";
import QuickNotificationsWidget from "../shared/widgets/quick-notification-widget";
import IncomingAccordion from "./layouts/incoming-accordion";
import ChatList from "./layouts/chat/chat-list";
import NotificationList from "./layouts/notifications/notification-list";

export default function LeftSideBar() {
  return (
    <div className="bg-white sticky top-0 right-0 h-screen w-[30vw] max-w-[30vw] bg-transparent border-l border-gray-200 flex flex-col justify-between">
      <Tabs defaultValue="upcoming" className="w-full min-w-0">
        <div className="px-6 py-5">
          <TabsList className="w-full bg-white/90 backdrop-blur-sm rounded-full p-1 mb-4 shadow-sm border-none">
            <TabsTrigger
              value="upcoming"
              className="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out border-none
                data-[state=active]:bg-[var(--BRAND-500)] data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-sm
                data-[state=inactive]:text-stone-600 hover:text-stone-800"
            >
              À venir
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out border-none
                data-[state=active]:bg-[var(--BRAND-500)] data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-sm
                data-[state=inactive]:text-stone-600 hover:text-stone-800"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out border-none
                data-[state=active]:bg-[var(--BRAND-500)] data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-sm
                data-[state=inactive]:text-stone-600 hover:text-stone-800"
            >
              Notifications
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-25 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-w-0">
          <TabsContent value="upcoming" className="mt-0 min-w-0">
            <IncomingAccordion />
          </TabsContent>
          <TabsContent value="messages" className="mt-0 min-w-0">
            <ChatList />
          </TabsContent>
          <TabsContent value="notifications" className="mt-0 min-w-0">
            <NotificationList/>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
