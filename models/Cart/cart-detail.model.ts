export type CartDetailResponse = {
    status: number;
    data: {
      is_enrollment_available: boolean;
      carts: Array<{
        course: {
          detail: {
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
          };
          contents: Array<{
            sessions: Array<{
              id: number;
              name: string;
              duration: string | null;
            }>;
            id: number;
            name: string;
            sessions_count: number;
            sessions_duration: number;
          }>;
          category: {
            id: number;
            name: string;
            image: string;
            courses_count: number;
          };
          place: {
            id: number;
            name: string;
            address: string;
            latitude: string;
            longitude: string;
          };
          instructor: {
            id: number;
            name: string;
            english_name: string | null;
            national_id: string | null;
            avatar: string | null;
            email: string;
            can_join_in_courses: boolean;
            phone: string | null;
            dial_code: string | null;
            is_active: string;
            api_token: string | null;
            language: string;
            nationality: string | null;
            age_category: string | null;
            gender: string | null;
            educational_degree: string | null;
            language_level: string | null;
            educational_experience: string | null;
          };
          id: number;
          name: string;
          image: string;
          duration: string;
          start_date: string;
          is_favorited: boolean;
          price: string;
          price_after_discount: string;
          max_students: string;
          remaining_seats: string;
          is_active: string;
          category_name: string;
          instructor_name: string;
          can_reserve: boolean;
          details_contains: string;
          is_in_cart: boolean;
        };
        id: number;
      }>;
      courses_count: number;
      course_prices: number;
      vat: number;
      total_price: number;
    };
  };
  