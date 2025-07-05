export type Gender = {
  id: number;
  name: string;
};

export type GendersResponse = {
  data: Gender[];
  status: number;
};
