/* 
import { createQueryString } from "@/utils/create-query-string.util";
import { fetcher } from "@/utils/fetcher.util";

export const getEnrollments = async (params: { status?: string }) => {
  try {
    const query = createQueryString(params);

    const res = await fetcher({
      url: `control-enrollments?${query}`,
    });

    if (!res.ok) {
      return [];
    }

    console.log("🎯 Full Response:", res);
    const data = await res.json();
    console.log("🎯 Response Data:", data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};
 */

import { createQueryString } from "@/utils/create-query-string.util";
import { fetcher } from "@/utils/fetcher.util";

export const getEnrollments = async (params: { status?: string }) => {
  try {
    const query = createQueryString(params);
    console.log("🔍 Generated Query String:", query);
    console.log("📡 Final URL:", `control-enrollments?${query}`);
    const res = await fetcher({
      url: `control-enrollments?${query}`,
    });

    console.log("🎯 Full Response:", res);
    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    console.log("🎯 Response Data:", data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};
