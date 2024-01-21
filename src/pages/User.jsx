import React, { useContext, useEffect, useState } from "react";

import UserInput from "../components/UserInput";
import Gallery from "../components/Gallery";
import { LikedImages } from "../contexts/LikedImages";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { getAllImgs } = useContext(LikedImages);
  const [isLikedImgsAvailable, setisLikedImgsAvailable] = useState([]);
  const [imagesRow, setImagesRow] = useState([]);

  useEffect(() => {
    setImgs();
  }, [getAllImgs]);

  const setImgs = () => {
    let imgs = getAllImgs();
    if (imgs.length == 0) {
      setisLikedImgsAvailable(false);
    } else {
      setisLikedImgsAvailable(true);
    }
    setImagesRow(imgs);
  };

  return (
    <>
      <div className="p-2 bg-slate-900 fixed w-full top-0 z-10">
        <UserInput />
      </div>
      <div className="mt-24">
        <>
          <h1 className="text-xl m-4">Liked Images</h1>
          <Gallery
            imagesRow={imagesRow}
            disableLoading={true}
            onChange={setImgs}
          />
        </>
        {!isLikedImgsAvailable && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl">Please Like Some Images</p>
            <Link
              className="text-xl text-gray-700 underline"
              to={"/search/cars"}
            >
              Do you like Cars?
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
