import axios from "axios";
import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosBase.interceptors.request.use(
  async (config: any) => {
    const session: any = await auth();
    const lang = await getLocale();

    if (typeof window) {
      config.headers = {
        "Accept-Language": lang,
        ...config.headers,
      };
      if (session) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${session?.user?.token}`,
        };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosBase;
