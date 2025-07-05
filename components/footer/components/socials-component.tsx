"use client";
import { useTranslations } from "next-intl";
import { Setting } from "@/models";

interface SocialsComponentProps {
    getSocials: Setting[];
}

const SocialsComponent: React.FC<SocialsComponentProps> = ({ getSocials }) => {
    const t = useTranslations("trans.footer");

    const socials = getSocials
        .filter(item => ["facebook", "instagram", "twitter", "linkedin"].includes(item.key))
        .map(item => ({
            name: item.key,
            href: item.value,
        }));

    return (
        <div className="mt-30">
            {socials.map((social) => (
                <a
                    key={social.name}
                    className={`icon-socials icon-${social.name}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t(social.name)}
                    aria-label={t(social.name)}
                ></a>
            ))}
        </div>
    );
};

export default SocialsComponent;
