import React from 'react'
import type { SVGProps } from 'react';

import SvgCompare from '@/components/icons/compare';
import SvgCpu from '@/components/icons/cpu';
import SvgVoucher from '@/components/icons/voucher';
import SvgDevices from '@/components/icons/devices';

interface UpsCardProps {
  iconSize?: {
    width?: number | string;
    height?: number | string;
  };
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

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

const UpsCard: React.FC<UpsCardProps> = ({ 
  iconSize = { width: 50, height: 50 },
  className = '',
  itemClassName = '',
  iconClassName = '',
  titleClassName = '',
  descriptionClassName = ''
}) => {
  return (
    <>
      {cardData.map((item) => (
        <div key={item.id} className={`col-xl-3 col-sm-6 ${className}`}>
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
              <p className={`font-sm color-gray-500 mt-10 ${descriptionClassName}`}>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default UpsCard


