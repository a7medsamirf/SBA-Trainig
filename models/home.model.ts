export type HomeBanner = {
    id: number;
    title: string;
    description: string;
    btn_title: string;
    link: string;
    image: string | null;
  };
  
  export type HomeCategory = {
    id: number;
    name: string;
    image: string | null;
    courses_count: number;
  };
  
  export interface HomePartner {
    id: number;
    name: string;
    image: string;
    link: string;
  }

  export type HomeCourse = {
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
  };

  export type HomeEvent = {
    id: number;
    title: string;
    description: string;
    image: string;
    type: string;
  };

  export interface HomeData {
    banners: HomeBanner[];
    categories: HomeCategory[];
    courses: HomeCourse[];
    partners: HomePartner[];
    new_events: HomeEvent[];
    notifications: number;
    carts: number;
  }

  export interface HomeResponse {
    status: number;
    data: HomeData;
  }



