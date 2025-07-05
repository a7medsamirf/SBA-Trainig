export interface CourseSession {
  id: number;
  name: string;
  duration: string;
}

export interface CourseContent {
  sessions: CourseSession[];
  id: number;
  name: string;
  sessions_count: number;
  sessions_duration: number;
}

export interface CourseDetail {
  id: number;
  details: string;
  attendance_requirement: string | null;
  goal: string;
  duration: string;
  exams: string;
  articles: string;
  support_files: string;
  lifetime_access: string;
  certificate: string;
}

export interface CourseCategory {
  id: number;
  name: string;
  image: string | null;
  courses_count: number;
}

export interface CoursePlace {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
}

export interface CourseInstructor {
  id: number;
  name: string;
  avatar: string | null;
  email: string;
  phone: string | null;
  is_active: string;
  api_token: string | null;
}

export interface CourseData {
  detail: CourseDetail;
  contents: CourseContent[];
  category: CourseCategory;
  place: CoursePlace;
  instructor: CourseInstructor;
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

export interface CourseDetailResponse {
  data: CourseData;
  status: number;
  message: string;
}
