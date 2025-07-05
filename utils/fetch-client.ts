export const fetcherClient = async ({
  url,
  options,
  method = "Get",
  token = "",
}: {
  url: string;
  options?: any;
  method?: string;
  token?: string;
}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}` as string, {
    method,
    ...options,
    headers: {
      ...options?.headers,
      Authorization: "Bearer " + token,
    },
  });
};
