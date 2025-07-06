"use client";
import Image from "next/image";
import { ManagerWordData  } from "@/models";

interface ManagerWordComponentProps {
  managerword: ManagerWordData;
}

export const ManagerWordComponent: React.FC<ManagerWordComponentProps> = ({ managerword }) => {

  return (
    <>
      <div className="CeoMessage" id="ceo-message">
        <div className="background-gray-100 row mt-50 p-20 pt-30 pb-30 ">
          <div className="col-lg-6">
            <Image
              src={`/images/president.png`}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              className="w-100"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="mt-15"> {managerword.title} </h2>
            <div
              className="font-sm font-medium color-gray-700 mb-15 mt-15 text-justify"
              dangerouslySetInnerHTML={{ __html: managerword.description }}
            />
        
            <h5>الرئيس التنفيذي لهيئة الإذاعة والتلفزيون</h5>
            <h5>محمد بن فهد الحارثي</h5>
          </div>
        </div>
      </div>
    </>
  );
}

