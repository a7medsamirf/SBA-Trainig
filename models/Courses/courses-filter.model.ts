export interface CoursesFilterData {
  data: Course[];
  links: Links;
  meta: Meta;
  status: number;
  message: string | null;
}

export interface Course {
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
export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

