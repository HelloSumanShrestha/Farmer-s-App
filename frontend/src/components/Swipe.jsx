import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from "../assets/images/banner1.jpg"
import banner2 from "../assets/images/banner2.jpg"
import banner3 from "../assets/images/banner3.jpg"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../assets/css/Swiper.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Swipe() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={banner1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner3} alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
