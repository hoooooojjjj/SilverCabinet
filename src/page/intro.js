import React, { useEffect } from "react";

const Intro = () => {
  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "실버캐비넷";
  });
  return <div>소개페이지</div>;
};

export default Intro;
