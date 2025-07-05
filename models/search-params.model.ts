export interface SearchParamProps {
  params?: Promise<any>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
