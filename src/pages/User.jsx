import React, { useContext, useEffect, useState } from "react";

import UserInput from "../components/UserInput";
import Gallery from "../components/Gallery";
import { LikedImages } from "../contexts/LikedImages";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { getAllImgs } = useContext(LikedImages);
  const [isLikedImgsAvailable, setisLikedImgsAvailable] = useState([]);
  const [imagesRow1, setImagesRow1] = useState([]);
  const [imagesRow2, setImagesRow2] = useState([]);
  const [imagesRow3, setImagesRow3] = useState([]);
  const [imagesRow4, setImagesRow4] = useState([]);

  const setImgs = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      setisLikedImgsAvailable(true);
    } else {
      setisLikedImgsAvailable(false);
    }
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];
    for (let i = 0; i < images.length; i++) {
      if (i % 4 === 0) {
        row1.push(images[i]);
      }
      if (i % 4 === 1) {
        row2.push(images[i]);
      }
      if (i % 4 === 2) {
        row3.push(images[i]);
      }
      if (i % 4 === 3) {
        row4.push(images[i]);
      }
    }
    setImagesRow1(row1);
    setImagesRow2(row2);
    setImagesRow3(row3);
    setImagesRow4(row4);
  };

  useEffect(() => {
    let images = getAllImgs();
    setImgs(images);
  }, [getAllImgs]);

  return (
    <>
      <div className="p-2 bg-slate-900 fixed w-full top-0 z-10">
        <UserInput />
      </div>
      <div className="mt-24">
        <>
          <h1 className="text-xl m-4">Liked Images</h1>
          <Gallery
            imagesRow1={imagesRow1}
            imagesRow2={imagesRow2}
            imagesRow3={imagesRow3}
            imagesRow4={imagesRow4}
            disableLoading={true}
            onChange={() => setImgs(getAllImgs())}
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
