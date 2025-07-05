export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface SimilarCourse {
  id: number;
  name: string;
  image: string | null;
  duration: string;
  start_date: string;
  is_favorited: boolean;
  price: string;
  max_students: string;
  remaining_seats: string;
  is_active: string;
  category_name: string;
  instructor_name: string;
  can_reserve: boolean;
}

export interface SimilarCoursesResponse {
  data: SimilarCourse[];
  links: PaginationLinks;
  meta: PaginationMeta;
  status: number;
  message: string | null;
}
