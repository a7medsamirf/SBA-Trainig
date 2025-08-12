// Shared TypeScript interfaces for feedback functionality

export interface FeedbackAnswer {
  id: number;
  name: string;
}

export interface FeedbackType {
  id: number;
  name: string;
}

export interface FeedbackQuestionData {
  id: number;
  course_question_id: number;
  course_id: string;
  name: string;
  type: FeedbackType;
  answers: FeedbackAnswer[] | null;
  is_active: string;
}

export interface FeedbackApiResponse {
  data: FeedbackQuestionData[];
  message: string;
  status: number;
}

export interface FeedbackFormData {
  [key: string]: any;
} 