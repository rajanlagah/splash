import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserInput from "../components/UserInput";
import useFetchImages from "../hooks/useFetchImages";
import Gallery from "../components/Gallery";
import LikedImagesBtn from "../components/LikedImagesBtn";

const SearchPage = () => {
  let { query } = useParams();
  const {
    queryImgs,
    imagesRow,
    moreImgsAvailable,
    isLoadingImages,
    isError
  } = useFetchImages();
  const [pageNumber, setpageNumber] = useState(1);

  useEffect(() => {
    // debugger
    queryImgs(query, pageNumber);
  }, [pageNumber, query]);

  return (
    <>
      <div className="p-2 bg-slate-900 fixed w-full top-0 z-10">
        <UserInput
          presetValue={query}
          isLoadingImages={isLoadingImages}
          callback={(newQuery) => queryImgs(newQuery)}
        />
        <LikedImagesBtn />
      </div>
      <div className="mt-24">
        <Gallery
          moreImgsAvailable={moreImgsAvailable}
          pageNumber={pageNumber}
          imagesRow={imagesRow}
          isError={isError}
          isLoading={isLoadingImages}
          handleNext={() => setpageNumber((prev) => prev + 1)}
        />
      </div>
    </>
  );
};

export default SearchPage;
