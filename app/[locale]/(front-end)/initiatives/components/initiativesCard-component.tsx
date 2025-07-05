"use client";
import ReusableHorizontalCard from "@/components/common/Reusable-HorizontalCard";
import { EventData } from "@/models";

interface InitiativesCardComponentProps {
  events: EventData[];
}

const InitiativesCardComponent: React.FC<InitiativesCardComponentProps> = ({ events }) => {
  return (
    <>
     {events && events.length > 0 && events.map((event: EventData) => (
        <ReusableHorizontalCard
          key={event.id}
          tag={""}
          title={event.title}
          description={event.description}
          image={{ src: event.image }}
          showTag={false}
  /*         href={`/initiatives/${event.id}?title=${encodeURIComponent(event.title)}`} */
        />
      ))}
    </>
  );
};

export default InitiativesCardComponent;

