"use client";
import React from 'react'
import type { SVGProps } from 'react';
import { VisionData, MissionData } from "@/models";
import SvgLamp from '@/components/icons/lamp';
import SvgDevices from '@/components/icons/devices';

interface VisionComponentProps {
  vision?: VisionData;
  mission?: MissionData;
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

export const VisionComponent: React.FC<VisionComponentProps> = ({ 
  vision,
  mission,
  iconSize = { width: 50, height: 50 },
  className = '',
  itemClassName = '',
  iconClassName = '',
  titleClassName = '',
  descriptionClassName = ''

}) => {
  const ourValueData = [];

  if (mission) {
    ourValueData.push({
      id: mission.id,
      icon: <SvgLamp />,
      title: mission.title,
      description: mission.description,
    });
  }

  if (vision) {
    ourValueData.push({
      id: vision.id,
      icon: <SvgDevices />,
      title: vision.title,
      description: vision.description,
    });
  }

  if (ourValueData.length === 0) {
    return null;
  }

  return (
    <> 
       <div className="section-box mt-50 mb-60" id='vnm'>
              <div className="row row-cols-1 row-cols-md-2">
                  {ourValueData.map((item) => (
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
                          <p className={`font-sm color-gray-500 mt-10 ${descriptionClassName}`}>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
             </div>
         </div>
    </>
  )
}



