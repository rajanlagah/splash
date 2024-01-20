import React, { useEffect, useRef } from "react";
import ImageCard from "./ImageCard";
import usePagination from "../hooks/usePagination";

const Gallery = ({
  onChange = () => undefined,
  disableLoading,
  imagesRow1,
  moreImgsAvailable = true,
  imagesRow2,
  imagesRow3,
  isLoading,
  imagesRow4,
  isError,
  handleNext = () => undefined
}) => {
  const row4EndObserver = useRef(null);
  const { startObserver } = usePagination();
  useEffect(() => {
    let elementToObserve;
    if (row4EndObserver.current) {
      elementToObserve = startObserver(row4EndObserver.current, handleNext);
    }

    return () => {
      if (elementToObserve) {
        elementToObserve.disconnect();
      }
    };
  }, [row4EndObserver.current]);

  if (!isError && !isLoading && imagesRow1.length === 0) {
    return (
      <div className="flex justify-center">
        <h3>No Image found. Try some other word</h3>
      </div>
    );
  }

  return (
    <div className="w-4/5 m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {[
          ...imagesRow1,
          ...imagesRow2,
          ...imagesRow3,
          ...imagesRow4,
        ].map((item, index) => (
          <ImageCard
            onChange={onChange}
            key={item.id}
            src={item.urls.regular}
            user={item.user}
            id={item.id}
            alt_description={item.alt_description}
          />
        ))}
        {/* {imagesRow2.map((item, index) => (
          <ImageCard
            onChange={onChange}
            key={item.id}
            src={item.urls.regular}
            user={item.user}
            id={item.id}
            alt_description={item.alt_description}
          />
        ))}
        {imagesRow3.map((item, index) => (
          <ImageCard
            onChange={onChange}
            key={item.id}
            src={item.urls.regular}
            user={item.user}
            id={item.id}
            alt_description={item.alt_description}
          />
        ))}
        {imagesRow4.map((item, index) => (
          <ImageCard
            onChange={onChange}
            key={item.id}
            src={item.urls.regular}
            user={item.user}
            id={item.id}
            alt_description={item.alt_description}
          />
        ))} */}
        {!disableLoading && !isError && moreImgsAvailable && (
          <p ref={row4EndObserver}>Loading...</p>
        )}
      </div>
      {!disableLoading && !moreImgsAvailable && (
        <div className="flex justify-center items-center">
          <h3>No more image</h3>
        </div>
      )}
      {!disableLoading && isError && (
        <div className="flex flex-col justify-center items-center mb-10">
          <h3>Error. Most likely Rate Limit Exceeded</h3>
          <p>Try after 1 hour</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
