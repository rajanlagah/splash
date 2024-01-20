import React, { useEffect, useState } from "react";

import useFetchImages from "../hooks/useFetchImages";
import Gallery from "../components/Gallery";
import Header from "../components/Header";

const Landing = () => {
  const {
    fetchImgs,
    isLoadingImages,
    imagesRow1,
    imagesRow2,
    imagesRow3,
    moreImgsAvailable,
    imagesRow4,
    isError
  } = useFetchImages();
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
        imagesRow1={imagesRow1}
        moreImgsAvailable={moreImgsAvailable}
        imagesRow2={imagesRow2}
        imagesRow3={imagesRow3}
        imagesRow4={imagesRow4}
        // pageEndObserver={pageEndObserver}
        isLoading={isLoadingImages}
        handleNext={() => setpageNumber((prev) => prev + 1)}
      />
    </>
  );
};

export default Landing;
