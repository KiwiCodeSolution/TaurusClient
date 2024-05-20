import { useState } from "react";

const useScrollBlock = () => {
  const [isScrollBlocked, setIsScrollBlocked] = useState(false);

  const blockScroll = () => {
    setIsScrollBlocked(true);
    document.body.classList.add("body-scroll-lock");
    console.log("block");
  };

  const allowScroll = () => {
    setIsScrollBlocked(false);
    document.body.classList.remove("body-scroll-lock");
    console.log("remove block");
  };

  return [blockScroll, allowScroll];
};

export default useScrollBlock;
