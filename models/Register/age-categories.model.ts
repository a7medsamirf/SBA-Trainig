export type AgeCategory = {
  id: number;
  name: string;
};

export type AgeCategoriesResponse = {
  data: AgeCategory[];
  status: number;
  message: string | null;
};
