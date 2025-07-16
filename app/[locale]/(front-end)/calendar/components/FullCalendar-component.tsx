"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import "./FullCalendar-component.scss";
import { dateFormat } from "@/utils";
import { ArrowBack, ArrowForward, Gps } from "@/components/icons/icons";

type Event = {
  id: number;
  date: string;
  title: string;
  address: string;
  time: string;
  attendees: number;
};

type ViewType = "daily" | "weekly" | "monthly";

const sampleEvents: Event[] = [
  {
    id: 1,
    date: "2025-01-04",
    title: "اسم الفعالية سيكون هنا",
    address: "عنوان المحاضرة سيكون هنا",
    time: "12:00 - 3:30 م",
    attendees: 4,
  },
  {
    id: 2,
    date: "2025-01-01",
    title: "اسم الفعالية سيكون هنا",
    address: "عنوان المحاضرة سيكون هنا",
    time: "10:00 - 1:00 م",
    attendees: 2,
  },
  {
    id: 3,
    date: "2025-01-17",
    title: "اسم الفعالية سيكون هنا",
    address: "عنوان المحاضرة سيكون هنا",
    time: "4:00 - 5:30 م",
    attendees: 5,
  },
  {
    id: 4,
    date: "2025-07-19",
    title: "اسم الفعالية سيكون هنا",
    address: "عنوان المحاضرة سيكون هنا",
    time: "2:00 - 4:00 م",
    attendees: 3,
  },
  {
    id: 5,
    date: "2025-07-19",
    title: "44اسم الفعالية سيكون هنا",
    address: "44عنوان المحاضرة سيكون هنا",
    time: "2:00 - 4:00 م",
    attendees: 3,
  },
  {
    id: 6,
    date: "2025-07-20",
    title: "55اسم الفعالية سيكون هنا",
    address: "888عنوان المحاضرة سيكون هنا",
    time: "2:00 - 4:00 م",
    attendees: 3,
  },
];

export default function MonthlyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewType, setViewType] = useState<ViewType>("monthly");

  // Helper function to get date display based on view type
  const getDateDisplay = () => {
    switch (viewType) {
      case "daily":
        return dateFormat(currentMonth, "D MMMM YYYY");
      case "weekly":
        const weekStart = startOfWeek(currentMonth, { weekStartsOn: 6 });
        const weekEnd = endOfWeek(currentMonth, { weekStartsOn: 6 });
        return `${dateFormat(weekStart, "D MMM")} - ${dateFormat(
          weekEnd,
          "D MMM YYYY"
        )}`;
      case "monthly":
      default:
        return dateFormat(currentMonth, "MMMM, YYYY");
    }
  };

  // Helper function to navigate dates based on view type
  const navigatePrevious = () => {
    switch (viewType) {
      case "daily":
        setCurrentMonth(addDays(currentMonth, -1));
        break;
      case "weekly":
        setCurrentMonth(addDays(currentMonth, -7));
        break;
      case "monthly":
      default:
        setCurrentMonth(subMonths(currentMonth, 1));
        break;
    }
  };

  const navigateNext = () => {
    switch (viewType) {
      case "daily":
        setCurrentMonth(addDays(currentMonth, 1));
        break;
      case "weekly":
        setCurrentMonth(addDays(currentMonth, 7));
        break;
      case "monthly":
      default:
        setCurrentMonth(addMonths(currentMonth, 1));
        break;
    }
  };

  const renderHeader = () => (
    <div className="calendar-header">
      <div className="header-center">
        <button className="nav-btn" onClick={navigatePrevious}>
          <ArrowForward height={24} width={24} />
        </button>
        <h2 className="current-date">{getDateDisplay()}</h2>
        <button className="nav-btn" onClick={navigateNext}>
          <ArrowBack width={24} height={24} />
        </button>
      </div>

      <div className="header-left">
        <div className="view-selector">
          <button
            className={`view-btn ${viewType === "daily" ? "active" : ""}`}
            onClick={() => setViewType("daily")}
          >
            يومي
          </button>
          <button
            className={`view-btn ${viewType === "weekly" ? "active" : ""}`}
            onClick={() => setViewType("weekly")}
          >
            أسبوعي
          </button>
          <button
            className={`view-btn ${viewType === "monthly" ? "active" : ""}`}
            onClick={() => setViewType("monthly")}
          >
            شهري
          </button>
        </div>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth, { weekStartsOn: 6 }); // Saturday
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="day-header">
          {dateFormat(addDays(date, i), "dddd")}
        </div>
      );
    }
    return <div className="calendar-days-header">{days}</div>;
  };

  // Daily view renderer
  const renderDailyView = () => {
    const dateStr = dateFormat(currentMonth, "YYYY-MM-DD");
    const events = sampleEvents.filter((e) => e.date === dateStr);

    return (
      <div className="daily-view">
        <div className="day-column">
          <div className="day-header">
            <h3>{dateFormat(currentMonth, "dddd")}</h3>
            <span>{dateFormat(currentMonth, "D MMMM")}</span>
          </div>
          <div
            className="day-events"
            onMouseEnter={() => setSelectedDate(currentMonth)}
            onMouseLeave={() => setSelectedDate(null)}
          >
            {events.length > 0 ? (
              <div className="events-list">
                {events.map((event, index) => (
                  <div key={event.id} className="tooltip-event">
                    <div className="tooltip-event-content">
                      <Gps className="tooltip-event-icon" />
                      <div className="tooltip-event-details">
                        <div className="tooltip-event-title">{event.title}</div>
                        <div className="tooltip-event-address">
                          {event.address}
                        </div>
                        <div className="tooltip-event-time">
                          🕒 {event.time}
                        </div>
                        <div className="tooltip-event-attendees">
                          👥 {event.attendees} مشارك
                        </div>
                      </div>
                    </div>
                    <button className="register-button">
                      تسجيل حضوري للمحاضرة
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-events">لا توجد فعاليات في هذا اليوم</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Weekly view renderer
  const renderWeeklyView = () => {
    const weekStart = startOfWeek(currentMonth, { weekStartsOn: 6 });
    const weekEnd = endOfWeek(currentMonth, { weekStartsOn: 6 });

    const days = [];
    let day = weekStart;

    while (day <= weekEnd) {
      const dateStr = dateFormat(day, "YYYY-MM-DD");
      const events = sampleEvents.filter((e) => e.date === dateStr);
      console.log("🚀 ~ renderWeeklyView ~ events:", events)

      days.push(
        <div key={day.toString()} className="week-day">
          <div className="week-day-header">
            <div className="day-name">{dateFormat(day, "dddd")}</div>
            <div className="day-number">{dateFormat(day, "D")}</div>
          </div>
          <div
            className="week-day-events"
            onMouseEnter={() => setSelectedDate(day)}
            onMouseLeave={() => setSelectedDate(null)}
          >
            {events.map((event, index) => (
              <div key={event.id} className="event-item">
                <div className="event-content">
                  <div className="event-text">
                    <div className="event-title">
                      <span>{event.title}</span>
                      <span className="event-icon">
                        <Gps width={13} height={13} />
                      </span>
                    </div>
                    <div className="event-address">{event.address}</div>
                  </div>
                </div>
                {selectedDate &&
                  isSameDay(day, selectedDate) &&
                  index === 0 && (
                    <div className="event-tooltip">
                      <div className="tooltip-header">
                        <div className="date-title">
                          {dateFormat(day, "DD MMMM YYYY")}
                        </div>
                        <div className="events-count">
                          {events.length} فعالية
                        </div>
                      </div>
                      <div className="events-list">
                        {events.map((dayEvent) => (
                          <div key={dayEvent.id} className="tooltip-event">
                            <div className="tooltip-event-content">
                              <Gps className="tooltip-event-icon" />
                              <div className="tooltip-event-details">
                                <div className="tooltip-event-title">
                                  {dayEvent.title}
                                </div>
                                <div className="tooltip-event-address">
                                  {dayEvent.address}
                                </div>
                                <div className="tooltip-event-time">
                                  🕒 {dayEvent.time}
                                </div>
                                <div className="tooltip-event-attendees">
                                  👥 {dayEvent.attendees} مشارك
                                </div>
                              </div>
                            </div>
                            <button className="register-button">
                              تسجيل حضوري للمحاضرة
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }

    return <div className="weekly-view">{days}</div>;
  };

  // Monthly view renderer (existing function)
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 6 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 6 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dateStr = dateFormat(day, "YYYY-MM-DD");
        const events = sampleEvents.filter((e) => e.date === dateStr);
        days.push(
          <div
            key={day.toString()}
            className={`calendar-cell ${
              !isSameMonth(day, monthStart) ? "other-month" : ""}`}
            onMouseEnter={() => setSelectedDate(cloneDay)}
            onMouseLeave={() => setSelectedDate(null)}
          >
            <div className="day-number">{dateFormat(day, "D")}</div>
            {events.map((event, index) => (
              <div key={event.id} className="event-item">
                <div className="event-content">
                  <div className="event-text">
                    <div className="event-title">
                      <span>{event.title}</span>
                      <span className="event-icon">
                        <Gps width={13} height={13} />
                      </span>
                    </div>
                    <div className="event-address">{event.address}</div>
                  </div>
                </div>
                {selectedDate &&
                  isSameDay(cloneDay, selectedDate) &&
                  index === 0 && (
                    <div className="event-tooltip">
                      <div className="tooltip-header">
                        <div className="date-title">
                          {dateFormat(cloneDay, "DD MMMM YYYY")}
                        </div>
                        <div className="events-count">
                          {events.length} فعالية
                        </div>
                      </div>
                      <div className="events-list">
                        {events.map((dayEvent) => (
                          <div key={dayEvent.id} className="tooltip-event">
                            <div className="tooltip-event-content">
                              <Gps className="tooltip-event-icon" />
                              <div className="tooltip-event-details">
                                <div className="tooltip-event-title">
                                  {dayEvent.title}
                                </div>
                                <div className="tooltip-event-address">
                                  {dayEvent.address}
                                </div>
                                <div className="tooltip-event-time">
                                  🕒 {dayEvent.time}
                                </div>
                                <div className="tooltip-event-attendees">
                                  👥 {dayEvent.attendees} مشارك
                                </div>
                              </div>
                            </div>
                            <button className="register-button">
                              تسجيل حضوري للمحاضرة
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="calendar-week">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-grid">{rows}</div>;
  };

  // Main content renderer based on view type
  const renderContent = () => {
    switch (viewType) {
      case "daily":
        return renderDailyView();
      case "weekly":
        return renderWeeklyView();
      case "monthly":
      default:
        return (
          <>
            {renderDays()}
            {renderCells()}
          </>
        );
    }
  };

  return (
    <div className="calendar-container">
      <div>
        {renderHeader()}
        <div className="calendar-content">{renderContent()}</div>
      </div>
    </div>
  );
}
