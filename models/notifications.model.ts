export type NotificationItem = {
  id: number;
  title: string;
  body: string;
  date: string; // ISO date string
  read_at: string | null;
}

export type NotificationLink = {
  url: string | null;
  label: string;
  active: boolean;
}

export type NotificationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: NotificationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export type NotificationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export type NotificationsResponse = {
  data: NotificationItem[];
  links: NotificationLinks;
  meta: NotificationMeta;
  status: number;
  message: string | null;
}
