import React, { useEffect, useState } from "react";

import useFetchImages from "../hooks/useFetchImages";
import Gallery from "../components/Gallery";
import Header from "../components/Header";

const Landing = () => {
  const { fetchImgs, isLoadingImages, imagesRow, moreImgsAvailable, isError } =
    useFetchImages();
  const [pageNumber, setpageNumber] = useState(1);

  useEffect(() => {
    fetchImgs(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <Header />
      <Gallery
        isError={isError}
        pageNumber={pageNumber}
        imagesRow={imagesRow}
        moreImgsAvailable={moreImgsAvailable}
        isLoading={isLoadingImages}
        handleNext={() => setpageNumber((prev) => prev + 1)}
      />
    </>
  );
};

export default Landing;
