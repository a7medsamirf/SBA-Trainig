"use server";
import { fetcher } from "@/utils";
import type { ContactFormType } from "@/validation/ContactUsSchema";

export const sendContactMessageAction = async (data: ContactFormType) => {
    const res = await fetcher({
        url: "contact-us/",
        method: "POST",
        options: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone: data.phone,
                message: data.message,
            }),
        },
    });

    if (!res.ok) {
        throw new Error("Failed to send contact message");
    }

    // Handle cases where response body might be empty
    const text = await res.text();
    return text ? JSON.parse(text) : {};
}; 