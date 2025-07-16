"use server";

import { signIn, signOut } from "@/auth";
import axiosBase from "@/utils/axios.util";
import { getTranslations } from "next-intl/server";

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

export async function deleteAccount() {
  try {
    const res = await axiosBase.delete("/profile");

    const data = (await res.data) as any;

    await signOutUser();

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
