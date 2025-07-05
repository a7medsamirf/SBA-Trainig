export interface Initiative {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
}

export interface InitiativesLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface InitiativesMetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface InitiativesMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: InitiativesMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface InitiativesResponse {
  data: Initiative[];
  links: InitiativesLinks;
  meta: InitiativesMeta;
  status: number;
  message: string | null;
}
