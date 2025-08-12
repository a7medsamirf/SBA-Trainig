"use client";
import ReusableHorizontalCard from "@/components/common/Reusable-HorizontalCard";
import { InitiativeData } from "@/models";
import { slugify } from "@/utils/slugify";

interface InitiativesCardComponentProps {
  Initiatives: InitiativeData[];
}

const InitiativesCardComponent: React.FC<InitiativesCardComponentProps> = ({ Initiatives }) => {
  return (
    <>
      {Initiatives && Initiatives.length > 0 &&
        Initiatives.map((Initiative: InitiativeData) => {
          const slug = slugify(Initiative.title);
          return (
            <ReusableHorizontalCard
              key={Initiative.id}
              tag={Initiative.type}
              date={Initiative.date}
              title={Initiative.title}
              description={Initiative.description}
              image={{ src: Initiative.image }}
              href={`/initiatives/${Initiative.id}-${slug}`}
            />
          );
        })}
    </>
  );
};

export default InitiativesCardComponent;
