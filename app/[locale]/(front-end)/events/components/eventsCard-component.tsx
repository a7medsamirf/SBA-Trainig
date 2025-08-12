"use client";
import ReusableHorizontalCard from "@/components/common/Reusable-HorizontalCard";
import { EventData } from "@/models";
import { cn } from "@/utils";
import { slugify } from "@/utils/slugify"; 
import { LayoutGrid, LayoutList } from "lucide-react";
import { useState } from "react";
import ReusableGridCard from "@/components/common/ReusableGridCard";
interface InitiativesCardComponentProps {
  events: EventData[];
}

const InitiativesCardComponent: React.FC<InitiativesCardComponentProps> = ({
  events,
}) => {
  const [view, setView] = useState<"list" | "grid">("list");

const toggleView = () => {
  setView(view === "list" ? "grid" : "list");
};

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="inline-flex p-1 bg-white rounded-lg border border-gray-200">
          <button
            onClick={() => setView("list")}
            className={cn(
              "inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              view === "list"
                ? "bg-[#76A441] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <LayoutList className="w-4 h-4" />
          </button>
      <button
            onClick={() => setView("grid")}
            className={cn(
              "inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              view === "grid"
                ? "bg-[#76A441] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
  className={cn(
    "display-list gap-3 grid grid-cols-1",
    view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid grid-cols-1"
  )}
>
  {events &&
    events.length > 0 &&
    events.map((event: EventData) => {
      const slug = slugify(event.title);

      return view === "grid" ? (
        // كارت في حالة grid
        <ReusableGridCard
          key={event.id}
          tag={event.type}
          date={event.date}
          title={event.title}
          description={event.description}
          image={{ src: event.image }}
          href={`/events/${event.id}-${slug}`}
        />
      ) : (
        // كارت في حالة list
        <ReusableHorizontalCard
          key={event.id}
          tag={event.type}
          date={event.date}
          title={event.title}
          description={event.description}
          image={{ src: event.image }}
          showTag={true}
          href={`/events/${event.id}-${slug}`}
        />
      );
    })}
</div>

    </>
  );
};

export default InitiativesCardComponent;