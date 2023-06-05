import React from "react";
import Banner from "./Banner/Banner";
import CardSlider from "./Slider/CardSlider";

import Posts from "./Posts/Posts";

const Home = () => {
  return (
    <div className="text-red-600">
      <Banner></Banner>
      <Posts></Posts>
      <CardSlider></CardSlider>
     
    </div>
  );
};

export default Home;
