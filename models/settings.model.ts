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

// Type for the provided JSON structure
export type SettingsApiResponse = {
  data: Array<{
    id: number;
    label: string;
    value: string | number;
    key: string;
  }>;
  meta: {
    student: number;
    courses: number;
    initiatives: number;
  };
}; 