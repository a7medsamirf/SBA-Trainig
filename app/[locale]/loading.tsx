import React from "react";
import { cn } from "@/utils";
import Image from "next/image";
export default function loading() {
  return (
    <div>
      <div className={cn("preloader flex items-center justify-center")}>
        <div className="relative">
          <div className="text-center">
            <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '90%', height: 'auto' }}
                alt="favicon"
                className="w-90 mb-2.5"
              src="/images/favicon.png"
            />
            <div className="preloader-dots"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
