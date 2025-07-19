"use client";

/* import { useFavourites } from "./hooks/useFavourites.hook"; */
import { FavouriteCardComponents } from "./FavouriteCard-components";
import FavouriteCardDetailsComponents from "./FavouriteCardDetails-components";
import FavouriteSearchComponents from "./FavouriteSearch-components";

export default function FavouriteClientPage({favourites,}: {favourites: any[];}) {
  /*   const {
    favourites,
    loading,
    error,
    searchValue,
    handleSearchChange,
  } = useFavourites(search);
  console.log("🚀 favourites:", favourites); */

  return (
    <div className="border-0 card custom-border-radius">
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900">المفضلة</h4>
        </div>
      </div>

      <div className="p-4 card-body">
        <div className="mb-4 Favorites-search">
          <div className="row">
            <div className="col-lg-4">
              <FavouriteSearchComponents />
            </div>
          </div>
        </div>

        <>
          <div className="row g-4">
            {favourites.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item?.id}>
                <FavouriteCardComponents {...item} />
              </div>
            ))}
          </div>

          <div className="row g-4">
            {favourites.map((item) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={item?.id + "-details"}
              >
                <FavouriteCardDetailsComponents {...item} />
              </div>
            ))}
          </div>
        </>

        {/* 
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <div className="py-5 text-center">
            <p className="text-muted">{error}</p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {favourites.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item?.id}>
                  <FavouriteCardComponents {...item} />
                </div>
              ))}
            </div>

            <div className="row g-4">
              {favourites.map((item) => (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={item?.id + "-details"}
                >
                  <FavouriteCardDetailsComponents {...item} />
                </div>
              ))}
            </div>
          </>
        )} */}
      </div>
    </div>
  );
}
