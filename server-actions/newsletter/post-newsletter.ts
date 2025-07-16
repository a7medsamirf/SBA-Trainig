"use server";
import { fetcher } from "@/utils";

export const sendContactMessageAction = async (email: string) => {
  const res = await fetcher({
    url: "newsletter/",
    method: "POST",
    options: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to send newsletter");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : {};
};
