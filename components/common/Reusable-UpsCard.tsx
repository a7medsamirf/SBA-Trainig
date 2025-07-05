import React from 'react';
import type { SVGProps } from 'react';

interface UpsCardProps {
  item: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  iconSize?: {
    width?: number | string;
    height?: number | string;
  };
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  showDescription?: boolean;
}

const ReusableUpsCard: React.FC<UpsCardProps> = ({ 
  item,
  iconSize = { width: 50, height: 50 },
  className = '',
  itemClassName = '',
  iconClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  showDescription= 'true'
}) => {
  return (
    <>

        <div className={`my-md-0 my-3 ${className}`}>
          <div className={`item-list d-flex py-3 UpsCard ${itemClassName}`}>
            <div className={`flex-shrink-0 Icon ${iconClassName}`}>
              {React.isValidElement(item.icon) 
                ? React.cloneElement(item.icon as React.ReactElement<SVGProps<SVGSVGElement>>, {
                    width: iconSize.width,
                    height: iconSize.height,
                    className: iconClassName
                  })
                : item.icon}
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className={`font-lg-bold color-gray-100 ${titleClassName}`}>{item.title}</h5>
              {showDescription && showDescription && (
                <p className={`font-sm color-gray-500 mt-10 ${descriptionClassName}`}>{item.description}</p>
               )}
            </div>
          </div>
        </div>
 
    </>
  )
}

export default ReusableUpsCard









/* import SvgCompare from '@/components/icons/compare';
import SvgCpu from '@/components/icons/cpu';
import SvgVoucher from '@/components/icons/voucher';
import SvgDevices from '@/components/icons/devices';
import ReusableUpsCard from '@/components/common/Reusable-UpsCard';

const cardData = [
  {
      id: 1,
      icon: <SvgCompare />,
      title: "مدربين محترفين",
      description: "في جميع التخصصات الإعلامية"
  },
  {
      id: 2,
      icon: <SvgVoucher />,
      title: "شهادات معتمدة",
      description: "من المؤسسة العامة للتدريب التقني والمهني"
  },
  {
      id: 3,
      icon: <SvgCpu  />,
      title: "بيئة تدريبية محفزة",
      description: "ومجهزة باستديوهات تلفزيونية وإذاعية وغرف تحكم"
  },
  {
      id: 4,
      icon: <SvgDevices />,
      title: " بنية تحتية متكاملة",
      description: "في جميع التخصصات الإعلامية"
  },
];

const UpsCardComponent = () => {
  return (
    <>
    <div className='row'>
      {cardData.map((card) => (
        <div className='col-xl-3 col-sm-6 UpsCard-border '>
          <ReusableUpsCard
            className={""}
            key={card.id}
            item={card}
            
        />
        </div>
      ))}
        </div>
    </>
  );
};

export default UpsCardComponent; */