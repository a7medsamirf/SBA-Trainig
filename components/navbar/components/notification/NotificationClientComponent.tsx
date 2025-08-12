"use client";

import SvgNotification from "@/components/icons/svg/notification";
import Link from "next/link";
import "../../navbar.scss";
import { useEffect, useRef, useState } from "react";
import { deleteNotificationApi, markNotificationAsRead } from "./actions";
import { useTranslations } from "next-intl";

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

  // const handleMarkAsRead = async (id: number) => {
  //   setNotifications((prev) =>
  //     prev.map((n) => (n.id === id ? { ...n, read: true } : n))
  //   );
  //   await markNotificationAsRead(id);
  // };

  // const handleDelete = async (id: number) => {
  //   setNotifications((prev) => prev.filter((n) => n.id !== id));
  //   await deleteNotificationApi(id);
  // };

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
  const t = useTranslations('trans');

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
          <li className="py-2 text-center notification-item">
           {t('no_notifications')}

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
                      <div className="flex-shrink-0 notification-icon">
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
                    <p className="notification-description">
                      {notification.body}
                    </p>
                    {/*     <div className="gap-2 mt-2 notification-actions d-flex">
                      {!notification.read && (
                        <button
                          className="btn btn-sm btn-outline-success w-50"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          تعليم كمقروء
                        </button>
                      )}
                      <button
                        className="text-white btn btn-sm btn-danger w-50"
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
              <li className="text-center notification-item show-more d-flex justify-content-center w-100">
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
