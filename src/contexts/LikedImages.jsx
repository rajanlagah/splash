import React, { createContext } from "react";

export const LikedImages = createContext();

const LOCALSTORAGE_ID = "unsplash_user";

const LikedImagesComponent = ({ children }) => {

  const deleteSavedImg = (id) => {
    let prevData = window.localStorage.getItem(LOCALSTORAGE_ID);
    prevData = JSON.parse(prevData);
    if (!prevData) {
      prevData = [];
    }
    let newData = prevData.filter((img) => img.id != id);
    newData = JSON.stringify(newData);
    window.localStorage.setItem(LOCALSTORAGE_ID, newData);
  };

  const saveImageData = (imageData) => {
    let prevData = window.localStorage.getItem(LOCALSTORAGE_ID);
    prevData = JSON.parse(prevData);
    if (!prevData) {
      prevData = [];
    }
    prevData.push(imageData);
    prevData = JSON.stringify(prevData);
    window.localStorage.setItem(LOCALSTORAGE_ID, prevData);
  };

  const getAllImgs = () => {
    let prevData = window.localStorage.getItem(LOCALSTORAGE_ID);
    prevData = JSON.parse(prevData);
    if (!prevData) {
      prevData = [];
    }
    return prevData;
  };

  const isImageSaved = (id) => {
    let imgData = getAllImgs();
    return imgData.some((item) => item.id == id);
  };

  return (
    <LikedImages.Provider value={{ saveImageData, getAllImgs, isImageSaved,deleteSavedImg }}>
      {children}
    </LikedImages.Provider>
  );
};

export default LikedImagesComponent;
