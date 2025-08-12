import React from 'react'
import type { SVGProps } from 'react';
import { useTranslations } from "next-intl";
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

const UpsCard: React.FC<UpsCardProps> = ({ 
  iconSize = { width: 50, height: 50 },
  className = '',
  itemClassName = '',
  iconClassName = '',
  titleClassName = '',
  descriptionClassName = ''
}) => {
  const t = useTranslations("trans.upsCard");

const cardData = [
    {
        id: 1,
        icon: <SvgCompare />,
       title: t("Trainers-Title"),
       description: t("Trainers-Description")
    },
    {
        id: 2,
        icon: <SvgVoucher />,
        title: t("Certificates-Title"),
        description: t("Certificates-Description")
    },
    {
        id: 3,
        icon: <SvgCpu  />,
        title: t("Environment-Title"),
        description: t("Environment-Description")
    },
    {
        id: 4,
        icon: <SvgDevices />,
        title: t("Infrastructure-Title"),
        description: t("Infrastructure-Description")
    },

];

  return (
    <>
      {cardData.map((item) => (
        <div key={item.id} className={`col-xl-3 col-sm-6 ${className}`}>
          <div className={`py-3 item-list d-flex UpsCard ${itemClassName}`}>
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
              <p className={`mt-10 font-sm color-gray-500 ${descriptionClassName}`}>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default UpsCard


