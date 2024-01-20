import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LikedImages } from "../contexts/LikedImages";

const ImageCard = ({ src, alt_description, user, id, onChange }) => {
  const { saveImageData, isImageSaved, deleteSavedImg } =
    useContext(LikedImages);
  const [isHover, setisHover] = useState(false);
  const [isLiked, setisLiked] = useState(isImageSaved(id));

  const handleLike = () => {
    if (isLiked) {
      deleteSavedImg(id);
    } else {
      saveImageData({
        urls: {
          regular: src
        },
        alt_description,
        user,
        id
      });
    }
    setisLiked(isImageSaved(id));
    onChange();
  };

  return (
    <div
      className={`relative max-w-96 `}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      <div className="relative">
        {isHover && (
          <div className="absolute top-0 left-0 h-full right-0 bg-gradient-to-t from-black via-transparent to-black/10 p-4 flex flex-col justify-between items-end">
            <button
              onClick={handleLike}
              className={`${isLiked ? "text-red-700" : "text-gray-500"}`}
            >
              <p className="text-3xl bg-white h-8 w-8  cursor-pointer rounded-3xl flex justify-center items-center">
                &hearts;
              </p>
            </button>
            {user.portfolio_url ? (
              <p className="hover:underline text-lg w-full text-left bottom-2 left-2 text-white cursor-pointer">
                <Link target="_blank" to={user.portfolio_url}>
                  {user.name}
                </Link>
              </p>
            ) : (
              <p className="text-lg w-full text-left bottom-2 left-2 text-white cursor-pointer">
                {user.name}
              </p>
            )}
          </div>
        )}
        <img src={src} alt={alt_description} className="w-full" />
      </div>
    </div>
  );
};

export default ImageCard;
