const usePagination = () => {
  const startObserver = (nodeToObserve, callback) => {
    function throtle(cb) {
      let allowCb = true;
      return function () {
        if (allowCb) {
          allowCb = false;
          cb();
          setTimeout(() => {
            allowCb = true;
          }, 100);
        }
      };
    }

    let throtleFN = throtle(callback);
    const observer = new IntersectionObserver(() => throtleFN(), {
      rootMargin: "800px"
    });
    if (nodeToObserve) {
      observer.observe(nodeToObserve);
    }

    return observer;
  };
  //   [nodeToObserve]
  return { startObserver };
};

export default usePagination;
