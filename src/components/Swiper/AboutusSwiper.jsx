"use client";
import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutusSwiper = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      id: 1,
      title: "Slide 1",
      image:
        "https://wallpapercat.com/w/full/c/4/1/126595-1920x1080-desktop-full-hd-game-of-thrones-wallpaper-photo.jpg",
    },
    {
      id: 2,
      title: "Slide 2",
      image:
        "https://blackheartprints.com/cdn/shop/files/CallOfDutyBlackOps62024GamePosterLandscapeWeb_600x.jpg?v=1717361285",
    },
    {
      id: 3,
      title: "Slide 3",
      image: "https://m.media-amazon.com/images/I/71GOg9QFFFL.jpg",
    },
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-64 rounded-lg object-cover"
            />
            {/* <h2 className="text-center mt-4">{slide.title}</h2> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AboutusSwiper;
