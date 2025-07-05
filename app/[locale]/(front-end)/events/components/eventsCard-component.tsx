"use client";
import ReusableHorizontalCard from "@/components/common/Reusable-HorizontalCard";
import { EventData  } from "@/models";
import { slugify } from "@/utils/slugify"; // 👈 استدعاء الدالة
interface InitiativesCardComponentProps {
  events: EventData[];
}

const InitiativesCardComponent: React.FC<InitiativesCardComponentProps> = ({ events }) => {
  return (
    <>
     {events && events.length > 0 && events.map((event: EventData) => {
       const slug = slugify(event.title);
       return (
        <ReusableHorizontalCard
          key={event.id}
          tag={event.type}
          title={event.title}
          description={event.description}
          image={{ src: event.image }}
          showTag={true}
          href={`/events/${event.id}-${slug}`}
        />
      );
    })}
    </>
  );
};

export default InitiativesCardComponent;

