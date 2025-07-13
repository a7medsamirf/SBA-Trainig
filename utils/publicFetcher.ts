export const publicFetcher = async ({
    url,
    method = "GET",
    options,
  }: {
    url: string;
    method?: string;
    options?: any;
  }) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
      method,
      ...options,
    });
  };
  