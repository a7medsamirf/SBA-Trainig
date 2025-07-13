export const fetcherClient = async ({
  url,
  method = "GET",
  token = "",
}: {
  url: string;
  method?: string;
  token?: string;
}) => {
/*   console.log("🌐 Requesting:", `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`);
  console.log("🔐 Token:", token); */

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "ar",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

/*   console.log("✅ Fetch finished. Status:", response.status); */
  return response;
};
