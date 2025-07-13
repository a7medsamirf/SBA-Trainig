// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { getFavoriteData } from "@/shared-apis/favorite/get-favorite.api";

// export function useFavourites(initialSearch: string) {
//   const [favourites, setFavourites] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchValue, setSearchValue] = useState(initialSearch);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const fetchFavourites = useCallback(async (keyword?: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await getFavoriteData(keyword);
//       if (data && Array.isArray(data) && data.length > 0) {
//         setFavourites(data);
//       } else {
//         setFavourites([]);
//         if (keyword) {
//           setError("لا توجد نتائج بهذا العنوان.");
//         } else {
//           setError("لا توجد عناصر في المفضلة.");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//       setFavourites([]);
//       setError("حدث خطأ أثناء تحميل المفضلة.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleSearchChange = useCallback(
//     (value: string) => {
//       setSearchValue(value);
//       const params = new URLSearchParams(searchParams);
//       if (value) {
//         params.set("search", value);
//       } else {
//         params.delete("search");
//       }
//       router.replace(`?${params.toString()}`, { scroll: false });
//     },
//     [searchParams, router]
//   );

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchFavourites(searchValue || undefined);
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchValue, fetchFavourites]);

//   useEffect(() => {
//     setSearchValue(initialSearch);
//   }, [initialSearch]);

//   useEffect(() => {
//     fetchFavourites(initialSearch || undefined);
//   }, []);

//   return {
//     favourites,
//     loading,
//     error,
//     searchValue,
//     handleSearchChange,
//   };
// }