"use client";
import SvgCalendar2 from "@/components/icons/svg/calendar-2";
import Svgexport15 from "@/components/icons/svg/svgexport-15";
import SvgTimer from "@/components/icons/svg/timer";
import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { useCalendarEvents } from "@/hooks";

type ViewType = "daily" | "weekly" | "monthly";

export default function MonthlyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewType, setViewType] = useState<ViewType>("monthly");
  const t = useTranslations("trans.view");
  // Use the calendar events hook
  const { events, loading, error } = useCalendarEvents(currentMonth, viewType);

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
        <button className="nav-btn ArrowBack" onClick={navigatePrevious}>
          <ArrowBack height={24} width={24} />
        </button>
        <h2 className="current-date">{getDateDisplay()}</h2>
        <button className="nav-btn ArrowForward" onClick={navigateNext}>
          <ArrowForward width={24} height={24} />
        </button>
      </div>

      <div className="header-left">
        <div className="view-selector">
          <button
            className={`view-btn ${viewType === "daily" ? "active" : ""}`}
            onClick={() => setViewType("daily")}
          >
             {t("daily")}
          </button>
          <button
            className={`view-btn ${viewType === "weekly" ? "active" : ""}`}
            onClick={() => setViewType("weekly")}
          >
          {t("weekly")}
          </button>
          <button
            className={`view-btn ${viewType === "monthly" ? "active" : ""}`}
            onClick={() => setViewType("monthly")}
          >
               {t("monthly")}
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
    const dailyEvents = events.filter((e: any) => e.date === dateStr);

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
            {loading ? (
              <div className="loading">جاري التحميل...</div>
            ) : error ? (
              <div className="error">حدث خطأ في تحميل الفعاليات</div>
            ) : dailyEvents.length > 0 ? (
              <div className="events-list">
                {dailyEvents.map((event: any, index: number) => (
                 <div key={event.id} className="tooltip-event">
                 <div className="tooltip-event-content">
                   <Gps className="tooltip-event-icon" />
                   <div className="tooltip-event-details">
                     <div className="tooltip-event-title">
                       {event.course?.name}
                     </div>
                     <div className="tooltip-event-address">
                       {event.course?.category_name}
                     </div>
                     <div className="tooltip-event-attendees">
                     <div className="gap-2 d-flex align-items-center">
                       <SvgTimer width={18} height={18} />
                         <span className="color-gray-900">
                         {event?.course?.duration}
                         </span>
                     </div>
                     </div>
                     <div className="tooltip-event-time">
                     <div className="gap-2 d-flex align-items-center">
                         <SvgCalendar2
                           color="#76A441"
                           width={20}
                           height={20}
                         />
                         <span className="color-gray-900">
                         {new Date(event.date).toLocaleDateString("ar-EG", {
                               weekday: "long",
                               day: "numeric",
                               month: "long",
                               year: "numeric",
                               numberingSystem: "latn" 
                             })}
                             
                         </span>
                         -
                         <div className="tooltip-event-time ">
                            <span className="color-gray-900">{event.time}</span>
                        </div>
                       </div>
                       
                     </div>
                     <div className="tooltip-event-address">
                     <div className="gap-2 d-flex align-items-center">
                     <Svgexport15 width={18} height={18} />
                     <span className="color-gray-900">
                       {event.course.instructor_name}
                     </span>
                   </div>
                     </div>
                 
                   </div>
                 </div>
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
      const dayEvents = events.filter((e: any) => e.date === dateStr);

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
            {loading ? (
              <div className="loading">جاري التحميل...</div>
            ) : error ? (
              <div className="error">خطأ</div>
            ) : (
              dayEvents.map((event: any, index: number) => (
                <div key={event.id} className="event-item">
                  <div className="event-content">
                    <div className="event-text">
                      <div className="event-title">
                        <span>{event.course?.name}</span>
                        <span className="event-icon">
                          <Gps width={13} height={13} />
                        </span>
                      </div>
                      <div className="event-address">
                        {event.course?.category_name}
                      </div>
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
                            {dayEvents.length} فعالية
                          </div>
                        </div>
                        <div className="events-list">
                          {dayEvents.map((dayEvent: any) => (
                           <div key={dayEvent.id} className="tooltip-event">
                           <div className="tooltip-event-content">
                             <Gps className="tooltip-event-icon" />
                             <div className="tooltip-event-details">
                               <div className="tooltip-event-title">
                                 {dayEvent.course?.name}
                               </div>
                               <div className="tooltip-event-address">
                                 {dayEvent.course?.category_name}
                               </div>
                               <div className="tooltip-event-attendees">
                               <div className="gap-2 d-flex align-items-center">
                                 <SvgTimer width={18} height={18} />
                                   <span className="color-gray-900">
                                   {dayEvent?.course?.duration}
                                   </span>
                               </div>
                               </div>
                               <div className="tooltip-event-time">
                               <div className="gap-2 d-flex align-items-center">
                                   <SvgCalendar2
                                     color="#76A441"
                                     width={20}
                                     height={20}
                                   />
                                   <span className="color-gray-900">
                                   {new Date(dayEvent.date).toLocaleDateString("ar-EG", {
                                         weekday: "long",
                                         day: "numeric",
                                         month: "long",
                                         year: "numeric",
                                         numberingSystem: "latn" 
                                       })}
                                       
                                   </span>
                                   -
                                   <div className="tooltip-event-time ">
                                      <span className="color-gray-900">{dayEvent.time}</span>
                                  </div>
                                 </div>
                                 
                               </div>
                               <div className="tooltip-event-address">
                               <div className="gap-2 d-flex align-items-center">
                               <Svgexport15 width={18} height={18} />
                               <span className="color-gray-900">
                                 {dayEvent.course.instructor_name}
                               </span>
                             </div>
                               </div>
                           
                             </div>
                           </div>
                           </div>

                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))
            )}
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
        const dayEvents = events.filter((e: any) => e.date === dateStr);
        days.push(
          <div
            key={day.toString()}
            className={`calendar-cell ${
              !isSameMonth(day, monthStart) ? "other-month" : ""}`}
            onMouseEnter={() => setSelectedDate(cloneDay)}
            onMouseLeave={() => setSelectedDate(null)}
          >
            <div className="day-number">{dateFormat(day, "D")}</div>
            {loading ? (
              <div className="loading-small">...</div>
            ) : error ? (
              <div className="error-small">!</div>
            ) : (
              dayEvents.map((event: any, index: number) => (
                <div key={event.id} className="event-item">
                  <div className="event-content">
                    <div className="event-text">
                      <div className="event-title">
                        <span>{event.course?.name}</span>
                        <span className="event-icon">
                          <Gps width={13} height={13} />
                        </span>
                      </div>
                      <div className="event-address">
                        {event.course?.category_name}
                      </div>
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
                            {dayEvents.length} فعالية
                          </div>
                        </div>
                        <div className="events-list">
                          {dayEvents.map((dayEvent: any) => (
                            <div key={dayEvent.id} className="tooltip-event">
                              <div className="tooltip-event-content">
                                <Gps className="tooltip-event-icon" />
                                <div className="tooltip-event-details">
                                  <div className="tooltip-event-title">
                                    {dayEvent.course?.name}
                                  </div>
                                  <div className="tooltip-event-address">
                                    {dayEvent.course?.category_name}
                                  </div>
                                  <div className="tooltip-event-attendees">
                                  <div className="gap-2 d-flex align-items-center">
                                    <SvgTimer width={18} height={18} />
                                      <span className="color-gray-900">
                                      {dayEvent?.course?.duration}
                                      </span>
                                  </div>
                                  </div>
                                  <div className="tooltip-event-time">
                                  <div className="gap-2 d-flex align-items-center">
                                      <SvgCalendar2
                                        color="#76A441"
                                        width={20}
                                        height={20}
                                      />
                                      <span className="color-gray-900">
                                      {new Date(dayEvent.date).toLocaleDateString("ar-EG", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            numberingSystem: "latn" 
                                          })}
                                          
                                      </span>
                                      -
                                      <div className="tooltip-event-time ">
                                         <span className="color-gray-900">{dayEvent.time}</span>
                                     </div>
                                    </div>
                                    
                                  </div>
                                  <div className="tooltip-event-address">
                                  <div className="gap-2 d-flex align-items-center">
                                  <Svgexport15 width={18} height={18} />
                                  <span className="color-gray-900">
                                    {dayEvent.course.instructor_name}
                                  </span>
                                </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))
            )}
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
