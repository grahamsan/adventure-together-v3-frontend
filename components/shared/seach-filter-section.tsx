"use client";
import LocationFilterWidget from "./widgets/location-filter-widget";
import SearchHeaderWidget from "./widgets/search-header-widget";
import DateFilterWidget from "./widgets/date-filter-widget";
import PeriodFilterWidget from "./widgets/period-filter-widget";
import ParticipantsFilterWidget from "./widgets/participants-filter-widget";

export default function SearchSection() {
  return (
    <div className="fixed left-0 top-16 flex flex-col w-full lg:w-[320px] h-screen">
      <div className="flex-1 overflow-y-auto p-4 pb-25 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* <SearchHeaderWidget /> */}
        <DateFilterWidget />
        <PeriodFilterWidget />
        <LocationFilterWidget />
        <ParticipantsFilterWidget />
      </div>
    </div>
  );
}
