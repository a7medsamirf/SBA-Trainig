"use server";

import { signIn } from "@/auth";
import axiosBase from "@/utils/axios.util";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const sendNafathRequest = async (
  prevState: string | undefined,
  formData: any
) => {
  const nafath_id = formData.nafath_id;

  try {
    const res = await axiosBase.post("/nafath/send-request", formData);

    const data = (await res.data) as any;
    console.log("🚀 ~ data:", data);

    return {
      succeeded: true,
      nafath_id,
      ...data,
    };
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
};

export const checkNafathStatus = async (formData: {
  nafath_id: string;
  trans_id: string;
  random: number;
}) => {
  console.log("🚀 ~ formData:", formData);
  const controller = new AbortController();

  // Set timeout to cancel request after 50 seconds
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 50500);

  try {
    const res = await axiosBase.post("/nafath/check-request", formData, {
      signal: controller.signal,
    } as any);

    clearTimeout(timeoutId);
    const data = (await res.data) as any;
    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request cancelled due to timeout");
    }
    console.error("🚀 ~ error:", error);
    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
};

export const nafathLogin = async (formData: any) => {
  console.log("🚀 ~ nafathLogin ~ formData:", formData);
  const t = await getTranslations("trans");
  const lang = await getLocale();

  try {
    await signIn("credentials", {
      ...formData,
      isNafathLogin: true,
      redirect: false,
    });

    revalidatePath("/");
    revalidatePath(`/${lang}`);

    return {
      succeeded: true,
      message: t("nafath.success"),
    };
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
    if (error.type === "CredentialsSignin") {
      return {
        succeeded: false,
        error: error?.message || t("nafath.invalid"),
      };
    } else if (error.type === "CallbackRouteError") {
      return {
        succeeded: false,
        error: t("nafath.somethingWentWrong"),
      };
    }
    throw error;
  }
};
