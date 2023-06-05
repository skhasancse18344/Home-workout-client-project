import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "./SliderCard";
import { CiDumbbell } from "react-icons/ci";

const CardSlider = () => {
  const [sliderCardPosts, setSliderCardPosts] = useState([]);
  
  
  useEffect(() => {
    fetch("http://localhost:5000/getRecentPost")
      .then((res) => res.json())
      .then((data) => setSliderCardPosts(data));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  return (
      <div className="my-16">
               <div className=" text-center text-4xl font-bold text-workout-primary">
        Most Recent
      </div>
      <div className="divider w-64  mx-auto">
        <CiDumbbell className="text-8xl text-workout-primary"></CiDumbbell>
      </div>
      <Slider {...settings}>
      {sliderCardPosts.map((sliderCardPost) => (
        <SliderCard key={sliderCardPost._id}   sliderCardPost={sliderCardPost}></SliderCard>
      ))}
    </Slider>
      </div>
    
  );
};

export default CardSlider;
