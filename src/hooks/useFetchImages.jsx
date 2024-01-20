import { useState } from "react";

const useFetchImages = () => {
  const [imagesCount, setImagesCount] = useState(0);
  const [prevQuery, setprevQuery] = useState("");
  const [moreImgsAvailable, setmoreImgsAvailable] = useState(true);
  const [isError, setisError] = useState(false);
  const [imagesRow1, setImagesRow1] = useState([]);
  const [imagesRow2, setImagesRow2] = useState([]);
  const [imagesRow3, setImagesRow3] = useState([]);
  const [imagesRow4, setImagesRow4] = useState([]);
  const [isLoadingImages, setisLoadingImages] = useState(false);

  const setImgs = (images, reset = false, query = "") => {
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];
    for (let i = 0; i < images.length; i++) {
      if ((i + imagesCount) % 4 == 0) {
        row1.push(images[i]);
      }
      if ((i + imagesCount) % 4 == 1) {
        row2.push(images[i]);
      }
      if ((i + imagesCount) % 4 == 2) {
        row3.push(images[i]);
      }
      if ((i + imagesCount) % 4 == 3) {
        row4.push(images[i]);
      }
    }
    if (reset) {
      setImagesRow1([...row1]);
      setImagesRow2([...row2]);
      setImagesRow3([...row3]);
      setImagesRow4([...row4]);
      setImagesCount(images.length);
    } else {
      if (row1.length == 0) {
        setmoreImgsAvailable(false);
      } else {
        setmoreImgsAvailable(true);
      }
      setImagesRow1((prevImagesRow) => [...prevImagesRow, ...row1]);
      setImagesRow2((prevImagesRow) => [...prevImagesRow, ...row2]);
      setImagesRow3((prevImagesRow) => [...prevImagesRow, ...row3]);
      setImagesRow4((prevImagesRow) => [...prevImagesRow, ...row4]);
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
      console.log(e);
    }
  };
  return {
    fetchImgs,
    isLoadingImages,
    queryImgs,
    moreImgsAvailable,
    imagesRow1,
    imagesRow2,
    imagesRow3,
    imagesRow4,
    isError
  };
};

export default useFetchImages;
