import { createQueryString } from "@/utils";
import axios from "axios";

export interface CalendarEventParams {
  date?: string; // For daily view
  start_date?: string; // For weekly/monthly view
  end_date?: string; // For weekly/monthly view
}

// Client-side API call with AbortController support using Next.js API route
export const getCalendarEvents = async (
  params: CalendarEventParams,
  signal?: AbortSignal
) => {
  try {
    const query = createQueryString(params);
    
    // Create config object with abort signal support
    const config: any = {};
    
    // Add abort signal if provided
    if (signal) {
      config.signal = signal;
    }

    // Call our API route instead of external API directly
    const res = await axios.get(`/api/calendar?${query}`, config);

    const data = res.data as any;
    return data;
  } catch (error: any) {
    // Don't log aborted requests as errors
    if (error.name === "AbortError" || signal?.aborted) {
      return null; // Silently return null for aborted requests
    }
    console.error("error fetching calendar events:", error);
    return null;
  }
};
