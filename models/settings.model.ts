export interface Setting {
  id: number;
  label: string;
  value: string;
  key: string;
}

export interface SettingsResponse {
  data: Setting[];
  status: number;
}

export interface SettingsWithMetaResponse {
  data: Setting[];
  meta: {
    student: number;
    courses: number;
    initiatives: number;
  };
} 