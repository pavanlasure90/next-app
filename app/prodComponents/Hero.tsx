'use client';
import React from 'react';
import Slider from 'react-slick';
import Slide from './Slide'; 

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false
  };

  const slideData = [
    {
      id: 0,
      image: 'slider-8.jpg', 
      title: 'Trending Item',
      mainTitle: 'MODERN COLLECTIONS',
      price: '20'
    },
    {
      id: 1,
      image: 'slider-6.avif', 
      title: 'Trending Accessories',
      mainTitle: 'NEW FASHION SUMMER SALE',
      price: '15'
    },
    {
      id: 2,
      image: 'slider-5.avif', 
      title: 'Sale Offer',
      mainTitle: "WOMEN'S LATEST FASHION SALE",

      price: '40'
    }, 
  ];

  return (
    <div>
      <div className="container pt-6 lg:pt-0">
        <Slider {...settings}>
          {slideData.map((item) => (
            <Slide
              key={item.id}
              image={item.image}
              title={item.title}
              mainTitle={item.mainTitle}
              price={item.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
