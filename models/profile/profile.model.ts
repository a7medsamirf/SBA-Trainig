export interface ProfileNationality {
  id: number;
  name: string;
}

export interface ProfileAgeCategory {
  id: number;
  name: string;
}

export interface ProfileGender {
  id: number;
  name: string;
}

export interface EducationalDegree {
  id: number;
  name: string;
}

export interface ProfileLanguageLevel {
  id: number;
  name: string;
}

export interface EducationalExperience {
  id: number;
  name: string;
}

export interface ProfileData {
  id: number;
  name: string;
  english_name: string;
  national_id: string;
  avatar: string | null;
  email: string;
  can_join_in_courses: boolean;
  phone: string;
  dial_code: string;
  is_active: string;
  api_token: string;
  language: string;
  nationality: ProfileNationality;
  age_category: ProfileAgeCategory;
  gender: ProfileGender;
  educational_degree: EducationalDegree | null;
  language_level: ProfileLanguageLevel | null;
  educational_experience: EducationalExperience | null;
}

export interface ProfileResponse {
  data: ProfileData;
  status: number;
  message: string;
}
