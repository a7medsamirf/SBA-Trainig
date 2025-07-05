export interface Nationality {
  id: number;
  name: string;
}

export interface NationalitiesResponse {
  data: Nationality[];
  status: number;
  message: string | null;
}
