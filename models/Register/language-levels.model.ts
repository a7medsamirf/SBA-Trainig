export type LanguageLevel = {
  id: number;
  name: string;
};

export type LanguageLevelsResponse = {
  data: LanguageLevel[];
  status: number;
};
