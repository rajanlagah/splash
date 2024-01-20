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

  if (!isLoading && imagesRow1.length === 0) {
    return (
      <div className="flex justify-center">
        <h3>No Image found. Try some other word</h3>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap w-full justify-center items-start p-4">
        <div className="flex flex-col justify-center items-center gap-8 lg:w-1/5 md:w-1/3 w-full">
          {imagesRow1.map((item, index) => (
            <ImageCard
              onChange={onChange}
              key={item.id}
              src={item.urls.regular}
              user={item.user}
              id={item.id}
              alt_description={item.alt_description}
            />
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-8 lg:w-1/5 md:w-1/3 w-full">
          {imagesRow2.map((item, index) => (
            <ImageCard
              onChange={onChange}
              key={item.id}
              src={item.urls.regular}
              user={item.user}
              id={item.id}
              alt_description={item.alt_description}
            />
          ))}
        </div>
        <div className="flex flex-col justify-start items-center gap-8 lg:w-1/5 md:w-1/3 w-full">
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
        </div>
        <div className="flex flex-col justify-start items-center gap-8 lg:w-1/5 md:w-1/3 w-full">
          {imagesRow4.map((item, index) => (
            <ImageCard
              onChange={onChange}
              key={item.id}
              src={item.urls.regular}
              user={item.user}
              id={item.id}
              alt_description={item.alt_description}
            />
          ))}
          {!disableLoading && !isError && moreImgsAvailable && (
            <p ref={row4EndObserver}>Loading...</p>
          )}
        </div>
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
    </>
  );
};

export default Gallery;
