"use client";
import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProdCard from "../Home/prod/Card";

const SuggestDetailScroll = () => {
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
    <section className="grid grid-cols-1 p-5 border-2  my-2 rounded-lg">
      <div>
        <p className="underline font-bold">Suggestion game</p>
      </div>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide ">
            <ProdCard />
            {/* <h2 className="text-center mt-4">{slide.title}</h2> */}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SuggestDetailScroll;
