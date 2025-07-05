"use client";

import { Setting } from "@/models";
import { useTranslations } from "next-intl";

interface CommunicationComponentProps {
    getCommunication: Setting[];
}

const CommunicationComponent: React.FC<CommunicationComponentProps> = ({ getCommunication }) => {
    
    const t = useTranslations("trans.footer");

    const filteredCommunication = getCommunication.filter(
        (info) =>
            ["working_hours", "address", "email", "phone"].includes(info.key)
    );

    return (
        <>
           <h4 className="mb-30 color-gray-1000">{t("communication")}</h4>
            {filteredCommunication.map((info: Setting) => (
                <div key={info.key} className="font-md mb-20 color-gray-900">
                    <strong className="font-md-bold">{info.label}:</strong> {info.value}
                </div>
            ))}
        </>
    );
};

export default CommunicationComponent;