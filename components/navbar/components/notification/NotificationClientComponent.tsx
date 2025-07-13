"use client";

import SvgNotification from "@/components/icons/svg/notification";
import Link from "next/link";
import "../../navbar.scss";
import { useEffect, useRef, useState } from "react";
/* import {
  markNotificationAsRead,
  deleteNotificationApi,
} from "./actions"; */

interface Notification {
  id: number;
  title: string;
  body: string;
  date: string;
  read?: boolean;
}

export const NotificationClientComponent = ({
  notifications: initialNotifications,
}: {
  notifications: Notification[];
}) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [visibleCount, setVisibleCount] = useState(5);
  const lastVisibleRef = useRef<HTMLLIElement>(null);

/*   const handleMarkAsRead = async (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    await markNotificationAsRead(id);
  };

  const handleDelete = async (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    await deleteNotificationApi(id);
  }; */

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // scroll تلقائي داخل قائمة الإشعارات فقط
/*   useEffect(() => {
    if (lastVisibleRef.current) {
      lastVisibleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [visibleCount]); */

  const visibleNotifications = notifications.slice(0, visibleCount);
  const hasMore = visibleCount < notifications.length;
  /// عدد الاشعارات
/*   const unreadCount = notifications.filter((n) => !n.read).length; */

  return (
    <li className="has-children item.submenu notifications-dropdown">
      <Link className="dropdown-link" href="#">
        <SvgNotification width={20} />
      </Link>

      <ul
        className="notification-item-container"
        style={{
          maxHeight: 400,
          overflowY: "auto",
          direction: "rtl",
        }}
      >
        {notifications.length === 0 ? (
          <li className="notification-item text-center py-2">
            لا يوجد إشعارات حالياً.
          </li>
        ) : (
          <>
            {visibleNotifications.map((notification, index) => {
              const isLast = index === visibleNotifications.length - 1;
              return (
                <li
                  key={notification.id}
                  ref={isLast ? lastVisibleRef : null}
                  className={`notification-item ${
                    notification.read ? "read" : "unread"
                  }`}
                >
                  <a className="notification-link" href="#">
                    <div className="d-flex">
                      <div className="notification-icon flex-shrink-0">
                        <SvgNotification
                          width={24}
                          height={24}
                          color="rgba(118, 164, 65, 1)"
                        />
                      </div>
                      <div className="notification-content flex-grow-1 ms-3">
                        <h6 className="notification-title color-gray-900">
                          {notification.title}
                        </h6>
                        <p className="notification-time">
                          {notification.date.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <p className="notification-description two-row">
                      {notification.body}
                    </p>
                      {/*     <div className="notification-actions mt-2 d-flex gap-2">
                      {!notification.read && (
                        <button
                          className="btn btn-sm btn-outline-success w-50"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          تعليم كمقروء
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-danger text-white w-50"
                        onClick={() => handleDelete(notification.id)}
                      >
                        حذف
                      </button>
                    </div> */}
                  </a>
                </li>
              );
            })}

            {hasMore && (
              <li className="notification-item show-more text-center d-flex justify-content-center w-100">
                <button
                  className="show-more-link w-100"
                  onClick={handleShowMore}
                >
                  عرض المزيد
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </li>
  );
};
