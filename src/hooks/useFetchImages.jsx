import { useState } from "react";

const useFetchImages = () => {
  const [imagesCount, setImagesCount] = useState(0);
  const [prevQuery, setprevQuery] = useState("");
  const [moreImgsAvailable, setmoreImgsAvailable] = useState(true);
  const [isError, setisError] = useState(false);
  const [imagesRow, setImagesRow] = useState([]);
  const [isLoadingImages, setisLoadingImages] = useState(false);

  const setImgs = (images, reset = false, query = "") => {
    if (reset) {
      setImagesRow([...images]);
      setImagesCount(images.length);
    } else {
      if (images.length == 0) {
        setmoreImgsAvailable(false);
      } else {
        setmoreImgsAvailable(true);
      }
      setImagesRow((prevImagesRow) => [...prevImagesRow, ...images]);
      setImagesCount(imagesCount + images.length);
    }
    setprevQuery(query);
  };

  const fetchImgs = async (page = 1) => {
    // if (!page) {
    //   return [];
    // }
    setisLoadingImages(true);
    let fetchURL =
      "https://api.unsplash.com/photos?" +
      new URLSearchParams({
        client_id: process.env.REACT_APP_NOT_SECRET_UNSPLASH_API_KEY,
        page,
        per_page: 16
      });

    try {
      setisError(false);
      let response = await fetch(fetchURL);
      response = await response.json();
      setisLoadingImages(false);
      setImgs(response);
    } catch (e) {
      console.log(e);
      setisLoadingImages(false);
      setisError(true);
    }
  };

  const queryImgs = async (query = false, page = 1) => {
    let fetchURL =
      "https://api.unsplash.com/search/photos?" +
      new URLSearchParams({
        client_id: process.env.REACT_APP_NOT_SECRET_UNSPLASH_API_KEY,
        query,
        page,
        per_page: 16
      });

    try {
      setisError(false);
      setisLoadingImages(true);
      let response = await fetch(fetchURL);
      response = await response.json();
      setisLoadingImages(false);
      setImgs(response.results, prevQuery !== query, query);
    } catch (e) {
      setisError(true);
      setisLoadingImages(false);
      console.log(e);
    }
  };
  return {
    fetchImgs,
    isLoadingImages,
    queryImgs,
    moreImgsAvailable,
    imagesRow,
    isError
  };
};

export default useFetchImages;
