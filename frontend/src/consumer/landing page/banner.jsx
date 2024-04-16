// Banner.jsx
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './banner.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner() {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className='hero__slider' id="banner">
      <div className="slider__item slider__item-01 mt0" style={{ backgroundImage: `url('./farmers/banner3.jpg')` }}>
        <div className="slider__overlay"></div>
        <Container>
          <div className="slider__content">
            <h4 className="text-light mb-3">Welcome</h4>
            <h1 className='text-light mb-4'>Discover Fresh and Local Produce</h1>
            <button className="btn reserve__btn mt-4">
              <Link to='/products'>Shop Now</Link>
            </button>
          </div>
        </Container>
      </div>
      <div className="slider__item slider__item-02 mt0" style={{ backgroundImage: `url('./farmers/banner5.png')` }}>
        <div className="slider__overlay"></div>
        <Container>
          <div className="slider__content">
            <h4 className="text-light mb-3">Get Excited</h4>
            <h1 className='text-light mb-4'>Shop Organic, Eat Healthy</h1>
            <button className="btn reserve__btn mt-4">
              <Link to='/products'>Start Shopping</Link>
            </button>
          </div>
        </Container>
      </div>
      <div className="slider__item slider__item-03 mt0" style={{ backgroundImage: `url('./farmers/banner6.jpg')` }}>
        <div className="slider__overlay"></div>
        <Container>
          <div className="slider__content">
            <h6 className="text-light mb-3">Special Offer</h6>
            <h1 className='text-light mb-4'>Get 20% Off Today</h1>
            <button className="btn reserve__btn mt-4">
              <Link to='/products'>Claim Discount</Link>
            </button>
          </div>
        </Container>
      </div>
    </Slider>
  );
}
