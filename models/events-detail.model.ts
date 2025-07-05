export interface EventsDetailData {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
}

export interface EventsDetailResponse {
  data: EventsDetailData;
  status: number;
  message: string;
}
