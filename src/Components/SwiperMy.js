import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Item from "./Item"

export default function SwiperMy(props) {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={'auto'}
            slidesPerGroup={1}

            breakpoints={{
                0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                532: {
                    slidesPerView: 2,
                    slidesPerGroup: 2
                },
                // when window width is >= 576px
                576: {
                    slidesPerView: 2,
                    slidesPerGroup: 2
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 1
                },
                1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 1
                },
            }}
        >
            <Swiper >
                {Array.isArray(props.data) && props.data.length > 0 ? (
                    props.data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Item pageRu={props.pageRu} pageEn={props.pageEn} category={props.category} img={item.img} price={item.price} title={item.title} />
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Swiper>
        </Swiper>
    )
}
