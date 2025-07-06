export type Nationality = {
  id: number;
  name: string;
}

export type NationalitiesResponse = {
  data: Nationality[];
  status: number;
  message: string | null;
}