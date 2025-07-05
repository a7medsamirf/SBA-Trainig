
import React from 'react'
import type { SVGProps } from 'react';

import SvgGame from '@/components/icons/game';
import SvgVoucher from '@/components/icons/voucher';
import SvgMusicPlay from '@/components/icons/music-play';
import SvgClock from '@/components/icons/clock';
import SvgDevices from '@/components/icons/devices';


interface OurValuesComponentProps {
  iconSize?: {
    width?: number | string;
    height?: number | string;
  };
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
}

const OurValueData = [
    {
        id: 1,
        icon: <SvgGame />,
        title: "الإلهام المولد للابتكار",
    },
    {
        id: 2,
        icon: <SvgVoucher />,
        title: "التميز في العملية التدريبية",
    },
    {
        id: 3,
        icon: <SvgMusicPlay  />,
        title: "البيئة الإبداعية",
    },
    {
        id: 4,
        icon: <SvgClock />,
        title: "الوعي الإعلامي",
    },
    {
      id: 5,
      icon: <SvgDevices />,
      title: "التأهيل المتكامل",
  },
];

export const OurValuesComponent: React.FC<OurValuesComponentProps> = ({ 
  iconSize = { width: 50, height: 50 },
  className = '',
  itemClassName = '',
  iconClassName = '',
  titleClassName = '',
}) => {
  return (
    <>
       <div className="section-box mt-50 mb-60">
            <div className="mb-60">
              <h2 className='mb-15'>قيمنا</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 ">
                  {OurValueData.map((item) => (
                    <div key={item.id} className={`col my-md-0 my-3 ${className}`}>
                      <div className={`item-list d-flex align-items-center py-3 OurValueCard ${itemClassName}`}>
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
                        </div>
                      </div>
                    </div>
                  ))}
             </div>
            </div>
         </div>
    </>
  )
}



