import React from "react";
import { Link } from "react-router-dom";

const LikedImagesBtn = () => {
  return (
    <Link className="absolute right-4 top-2 z-10 text-white" to={"/user"}>
      <span className="hidden md:flex justify-center items-center gap-1">
        Your<span className="text-4xl text-red-700">&hearts;</span>
        Images
      </span>
      <span className="flex md:hidden justify-center items-center gap-1">
        <span className="text-4xl text-red-700">&hearts;</span>
      </span>
    </Link>
  );
};

export default LikedImagesBtn;
