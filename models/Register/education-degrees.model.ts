export interface EducationDegree {
  id: number;
  name: string;
}

export interface EducationDegreesResponse {
  data: EducationDegree[];
  status: number;
}
