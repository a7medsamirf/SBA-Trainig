export interface EventsDetailData {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
  date: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface EventsDetailResponse {
  data: EventsDetailData[];
  links: PaginationLinks;
  meta: PaginationMeta;
  status: number;
  message: string | null;
}
