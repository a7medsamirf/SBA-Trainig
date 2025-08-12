"use client";

import { paymentLink } from "@/constant";
import { useLocale } from "next-intl";
import React, { useEffect, useRef } from "react";

export const HyperPay = ({
  checkoutId,
  currentChannel,
  paymentMethod,
}: {
  checkoutId: string;
  currentChannel: string[];
  paymentMethod: string;
}) => {
  const lang = useLocale();
  const payRef = useRef<HTMLDivElement>(null);

  // Create URL with currentChannel query parameter
  const getActionUrl = () => {
    const url = new URL(window.location.href);
    if (paymentMethod) {
      url.searchParams.set("paymentMethod", paymentMethod);
    }
    return url.toString();
  };

  useEffect(() => {
    if (checkoutId) {
      const wpwlScript = document.createElement("script");
      wpwlScript.innerHTML = `
        var wpwlOptions = {
          locale: "${lang}",
        };
      `;
      document.body.appendChild(wpwlScript);

      const hyperScript = document.createElement("script");
      hyperScript.id = "hyperpay-gate";
      hyperScript.src = `${paymentLink}=${checkoutId}`;
      document.body.appendChild(hyperScript);

      hyperScript.onload = () => {
        const loaded = document.getElementById("hyperpay-gate");
        if (loaded) {
          setTimeout(() => {
            payRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "end",
            });
          }, 500);
        }
      };

      return () => {
        document.getElementById("hyperpay-gate")?.remove();
        wpwlScript.remove();
      };
    }
  }, [checkoutId, lang]);

  return (
    <>
      <div
        ref={payRef}
        className="Hyperpay flex flex-col gap-5 rounded-md md:min-w-[600px]"
      >
        <form
          className="paymentWidgets"
          style={{ margin: "auto" }}
          action={getActionUrl()}
          data-brands={currentChannel?.join(" ")}
        />
      </div>
    </>
  );
};
