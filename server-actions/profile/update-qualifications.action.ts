"use server";
import { fetcher } from "@/utils";

interface UpdateQualificationsPayload {
  language_level?: number;
  educational_experience?: string;
  educational_degree?: number;
}

interface UpdateQualificationsResponse {
  succeeded: boolean;
  message: string;
  status?: number;
  data?: any;
}

export const updateQualificationsApi = async (
  payload: UpdateQualificationsPayload
): Promise<UpdateQualificationsResponse> => {
  try {
    const response = await fetcher({
      url: "update-qualifications", // Update this to the correct API endpoint
      method: "POST",
      options: {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        succeeded: true,
        message: data.message || "تم تحديث المؤهلات العلمية بنجاح",
        status: response.status,
        data: data.data,
      };
    } else {
      return {
        succeeded: false,
        message: data.message || "فشل التحديث",
        status: response.status,
      };
    }
  } catch (error) {
    console.error("❌ Error updating qualifications:", error);
    return {
      succeeded: false,
      message: "حدث خطأ أثناء الاتصال بالسيرفر",
    };
  }
}; 