import { fetcher } from "@/utils";

export const getCartApi = async () => {
  try {
    const response = await fetcher({
      url: "carts/index",
    });

    const data = await response.json();
    return data?.data || { carts: [] };
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    return { carts: [] };
  }
};

