"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LeftSideSection from "./left-side-section";
import RightSideSection from "./right-side-section";
import HomePage from "./home-page";
import TripPage from "./trip-page";
import PlacesPage from "./places-page";
import StatsPage from "./stats-page";
import VehiclePage from "./vehicle-page";
import AddNewSection from "./layouts/add-new-section";


export default function MainPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("events");

  // Synchroniser l'onglet actif avec l'URL
  useEffect(() => {
    const tab = searchParams.get("tab") || "events";
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    router.push(`${pathname}?tab=${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return <HomePage />;
      case "trips":
        return <TripPage />;
      case "places":
        return <PlacesPage />;
      case "stats":
        return <StatsPage />;
      case "vehicles":
        return <VehiclePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    // <div className="flex w-full justify-between min-h-screen">
    //   <AddNewSection userFullName="John Doe" />
    //   <LeftSideSection
    //     userRole="admin"
    //     userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //     userFullName="John Doe"
    //     activeTab={activeTab}
    //     onTabChange={handleTabChange}
    //   />
    //   <div className="flex max-w-[50vw] justify-center items-center flex-col gap-y-2">
    //     {renderContent()}
    //   </div>
    //   <RightSideSection />
    // </div>
    <h1>main page</h1>
  );
}