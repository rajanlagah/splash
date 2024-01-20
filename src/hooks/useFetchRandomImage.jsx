import { useState } from "react";

const useFetchRandomImages = () => {
  const [randomImage, setrandomImage] = useState([]);
  const [isLoadingRandomImages, setisLoadingRandomImages] = useState(false);

  const fetchRandomImage = async (query) => {
    setisLoadingRandomImages(true);
    console.log(query);
    try {
      let response = await fetch(
        "https://api.unsplash.com/photos/random?" +
          new URLSearchParams({
            client_id: process.env.REACT_APP_NOT_SECRET_UNSPLASH_API_KEY,
            orientation: "landscape"
          })
      );
      response = await response.json();
      console.log("response", response);
      setisLoadingRandomImages(false);
      setrandomImage(response);
    } catch (e) {
      setisLoadingRandomImages(false);
      console.log(e);
    }
  };

  return { fetchRandomImage, randomImage, isLoadingRandomImages };
};

export default useFetchRandomImages;
