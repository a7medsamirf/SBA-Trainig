"use server";

import { signIn, signOut } from "@/auth";
import { REVALIDATE_PATHS } from "@/constant";
import axiosBase from "@/utils/axios.util";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// actions/auth.ts for login user to session
export async function signInUser(
  prevState: string | undefined,
  formData: FormData
) {
  const t = await getTranslations("trans");

  try {
    const { password, identifier } = formData as any;

    const res = await axiosBase.post("/Account/login", {
      identifier,
      password,
      otpVia: 1,
    });

    const login = (await res.data) as any;

    return {
      ...login?.data,
      succeeded: true,
      meta: null,
      identifier,
      message: t("login.success"),
      Message: null,
    };
  } catch (error: any) {
    console.error("🚀 ~ error:", error);

    return error?.response?.data;
  }
}

export const addUserNotificationToken = async (
  userId: string,
  fcmToken: string
) => {
  try {
    const res = await axiosBase.post("/Notifications/AddUserFCMToken", {
      userId,
      fcmToken,
      Platform: "WEB",
    });

    const data = await res.data;

    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
  }
};

export async function signOutUser() {
  try {
    await logOutUser();

    await signOut({ redirect: false });
    return {
      succeeded: true,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
}

// actions/auth.ts for logout user from session
/* export async function signOutUser() {
  try {
    (await cookies()).delete("kycValues");
    // (await cookies()).delete("callbackRedirect");

    await logOutUser();

    await signOut();
  } catch (error: any) {
    throw error;
  }
}
 */
export const logOutUser = async () => {
  try {
    const res = await axiosBase.post("/logout");

    const data = await res.data;

    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
    return error?.response?.data;
  }
};

interface LoginApi {
  password: string;
  email: string;
}
// for login user to api call in signInUser function with next-auth
export async function loginApi({ email, password }: LoginApi) {
  try {
    const res = await axiosBase.post("/login", {
      email,
      password,
    });

    const data = (await res.data) as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    console.error("🚀 ~ loginApi ~ error:", error);
    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
}

// for register user
export async function registerApi(
  prevState: string | undefined,
  formData: any
) {
  try {
    const res = await axiosBase.post("/register-student", formData);
    const data = (await res.data) as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
}

// for verify otp
export async function verifyOTP(prevState: string | undefined, formData: any) {
  try {
    const res = await axiosBase.post("/verify-otp", formData);
    const data = (await res.data) as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
}

export async function login(prevState: string | undefined, formData: any) {
  const t = await getTranslations("trans");

  try {
    await signIn("credentials", {
      ...formData,
      isNafathLogin: false,
      redirect: false,
    });

    return {
      succeeded: true,
      message: t("verifyOtp.success"),
    };
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
    if (error.type === "CredentialsSignin") {
      return {
        succeeded: false,
        error: error?.message || t("verifyOtp.invalid"),
      };
    } else if (error.type === "CallbackRouteError") {
      return {
        succeeded: false,
        error: t("verifyOtp.somethingWentWrong"),
      };
    }
    throw error;
  }
}

export async function validateOTP({
  userId,
  otp,
}: {
  userId: string;
  otp: string;
}) {
  try {
    const res = await axiosBase.post("/Account/validateOTP", { userId, otp });

    return await res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function regenerateOTP({ userId }: { userId: string }) {
  const t = await getTranslations("trans");

  try {
    const res = await axiosBase.post(`/Account/regenerateOTP?userId=${userId}`);

    const data = (await res.data) as any;

    return {
      succeeded: true,
      message: t("verifyOtp.resend.success"),
      otp: data?.data?.otp,
    };
  } catch (error: any) {
    return error?.response?.data;
  }
}
