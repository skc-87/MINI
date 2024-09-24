import React from "react";
import Slider from "react-slick";
import TourCard from "../Home/TourCard";

export default function CardSlider({ tours }) {
  console.log("TOurs in CardSlider -", tours);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="flex">
     
        {tours?.map((tour, index) => (
          <div key={index} className="">
            <TourCard tour={tour} />
          </div>
        ))}
 
    </Slider>
  );
}
    