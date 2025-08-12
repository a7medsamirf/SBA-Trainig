import { fetcher } from "@/utils";
import axiosBase from "@/utils/axios.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get("date");
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");

    // Build query string for the external API
    const queryParams = new URLSearchParams();
    
    if (date) {
      queryParams.append("date", date);
    }
    if (start_date) {
      queryParams.append("start_date", start_date);
    }
    if (end_date) {
      queryParams.append("end_date", end_date);
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/calendar?${queryString}` : "/calendar";

    // Use fetcher which handles authentication automatically
    const res = await axiosBase.get(url);

 
    const data = await res.data;

    if (res.status !== 200) {
      return NextResponse.json(
        {
          message: "Failed to fetch calendar events",
          status: res.status,
          details: data,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("🚀 ~ GET ~ Calendar route error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
