import React, { useEffect } from "react";

import UserInput from "./UserInput";
import LikedImagesBtn from "./LikedImagesBtn";
import useFetchRandomImages from "../hooks/useFetchRandomImage";

const Header = () => {
  const { fetchRandomImage, randomImage, isLoadingRandomImages } =
    useFetchRandomImages();
  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div className="relative h-[70vh] w-full">
      {!isLoadingRandomImages && randomImage?.urls?.regular && (
        <img
          className="absolute h-[60vh] w-full "
          src={randomImage?.urls?.regular}
        />
      )}
      <LikedImagesBtn path={"/user"} />
      <div className="relative w-full flex items-center justify-center gap-2 h-[60vh] bg-gradient-to-b from-black to-black/10 ">
        <UserInput />
      </div>
    </div>
  );
};

export default Header;
