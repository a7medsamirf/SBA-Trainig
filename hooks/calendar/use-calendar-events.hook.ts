"use client";

import { useEffect, useState, useRef } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { getCalendarEvents, CalendarEventParams } from "@/shared-apis";

type ViewType = "daily" | "weekly" | "monthly";

export const useCalendarEvents = (currentDate: Date, viewType: ViewType) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use ref to store the current AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  // Format date for API (matching your working Swagger format)
  const formatDateForAPI = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // No zero padding
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  // Calculate date parameters based on view type
  const getDateParams = (date: Date, view: ViewType): CalendarEventParams => {
    switch (view) {
      case "daily":
        return {
          date: formatDateForAPI(date),
        };
      case "weekly":
        const weekStart = startOfWeek(date, { weekStartsOn: 6 }); // Saturday
        const weekEnd = endOfWeek(date, { weekStartsOn: 6 });
        return {
          start_date: formatDateForAPI(weekStart),
          end_date: formatDateForAPI(weekEnd),
        };
      case "monthly":
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        return {
          start_date: formatDateForAPI(monthStart),
          end_date: formatDateForAPI(monthEnd),
        };
      default:
        return {};
    }
  };

  // Fetch events when date or view type changes
  useEffect(() => {
    const fetchEvents = async () => {
      // Abort previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this request
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const params = getDateParams(currentDate, viewType);

        const data = await getCalendarEvents(params, controller.signal);

        // Check if request was aborted
        if (controller.signal.aborted) {
          return;
        }

        if (data) {
          setEvents(data.data || []);
        } else {
          setEvents([]);
        }
      } catch (err: any) {
        // Don't set error state if request was aborted
        if (err.name === "AbortError" || controller.signal.aborted) {
          return;
        }

        setError("Failed to fetch calendar events");
        setEvents([]);
        console.error("Calendar events fetch error:", err);
      } finally {
        // Only update loading state if this request wasn't aborted
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    // Cleanup function to abort request when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentDate, viewType]);

  // Refresh function for manual refetch
  const refreshEvents = async () => {
    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for refresh request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const params = getDateParams(currentDate, viewType);
    setLoading(true);
    setError(null);

    try {
      const data = await getCalendarEvents(params, controller.signal);

      // Check if request was aborted
      if (controller.signal.aborted) {
        return;
      }

      if (data) {
        setEvents(data.data || []);
      } else {
        setEvents([]);
      }
    } catch (err: any) {
      // Don't set error state if request was aborted
      if (err.name === "AbortError" || controller.signal.aborted) {
        return;
      }

      setError("Failed to refresh calendar events");
      setEvents([]);
      console.error("Calendar events refresh error:", err);
    } finally {
      // Only update loading state if this request wasn't aborted
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  return {
    events,
    loading,
    error,
    refreshEvents,
  };
};
