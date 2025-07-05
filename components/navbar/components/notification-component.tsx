"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SvgNotification from "@/components/icons/svg/notification";
import "../navbar.scss";

interface INotification {
  id: number;
  title: string;
  time: string;
  description: string;
}

export const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    fetch("/data/notifications.json")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <li className="has-children item.submenu notifications-dropdown">
      <Link className="dropdown-link" href="#">
        <SvgNotification width={20} />
      </Link>
      <ul className="notification-item-container">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <Link href="#" className="notification-link">
              <div className=" d-flex">
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
                  <p className="notification-time">{notification.time}</p>
                </div>
              </div>
              <p className="notification-description two-row">
                {notification.description}
              </p>
            </Link>
          </li>
        ))}
        {notifications.length > 0 && (
          <li className="notification-item">
            <Link href="#" className="show-more-link">
              عرض المزيد
            </Link>
          </li>
        )}
      </ul>
    </li>
  );
};




