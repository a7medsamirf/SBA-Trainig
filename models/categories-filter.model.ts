export interface CategoryFilterItem {
  id: number;
  name: string;
  image: string | null;
  courses_count: number;
}
export interface CategoriesFilterResponse {
  data: CategoryFilterItem[];
  status: number;
  message: string | null;
}