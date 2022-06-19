import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

const isInfinite = ({ images, slidesToShow }) => {
  if (slidesToShow === 1) return true;
  const windowWidth = window.screen.width;
  return windowWidth >= 768 ? images.length > 7 : images.length > 3;
};

const Carousel = ({
  images,
  slidesToShow,
  imageWidth,
  handleImageClickFn = () => {},
  showCursorOnHover = false,
  initialSlide = 0,
  isFullScreen = false,
  isLightbox = false,
}) => {
  const settings = {
    infinite: isInfinite({ images, slidesToShow }),
    speed: 500,
    slidesToShow,
    initialSlide,
    responsive: slidesToShow
      ? undefined
      : [
          {
            breakpoint: 3000,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 8,
            },
          },
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 300,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
  };
  const widthStyles = imageWidth ? `${imageWidth}` : `w-full`;
  const style = showCursorOnHover
    ? `${widthStyles} cursor-pointer`
    : `${widthStyles}`;
  const imagesArray = images.map((image, index) => {
    return (
      <div key={index}>
        {isLightbox ? (
          <img
            src={image}
            alt="carousel"
            class={style}
            onClick={() =>
              handleImageClickFn({ images, indexToDisplay: index })
            }
          />
        ) : (
          <img
            src={image}
            alt="carousel"
            class={style}
            onClick={() =>
              handleImageClickFn({ images, indexToDisplay: index })
            }
          />
        )}
      </div>
    );
  });
  return (
    <div id={isFullScreen ? "full-screen-carousel" : ""}>
      <Slider {...settings}>{imagesArray}</Slider>
    </div>
  );
};

export default Carousel;
