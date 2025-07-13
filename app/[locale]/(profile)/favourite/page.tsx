import { SearchParamProps } from "@/models/search-params.model";
import FavouriteClientPage from "./components/FavouriteClientPage";
import { getFavoriteData } from "@/shared-apis";

const FavouritePage = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const search = (resolvedSearchParams?.search || "") as string;

  const favourites = await getFavoriteData({ keyword: search });

  console.log("🚀 ~ FavouritePage ~ favourites:", favourites)
  return <FavouriteClientPage favourites={favourites} />;
};

export default FavouritePage;
