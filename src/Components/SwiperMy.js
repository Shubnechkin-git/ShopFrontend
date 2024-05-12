import React from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Item from "./Item"

import 'swiper/css/pagination';

export default function SwiperMy(props) {
    return (
        <>
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={'auto'}
                slidesPerGroup={1}
                className='ps-5 pe-5'
                pagination={{ el: '.paginnation', clickable: true, type: "progressbar" }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                    },
                    532: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    576: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
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
                {Array.isArray(props.data) && props.data.length > 0 ? (
                    props.data.map((item, index) => (
                        item.available > 0 ? (<SwiperSlide className='h-100' key={index}>
                            <Item className="h-100" productId={item.id} pageRu={props.pageRu} pageEn={props.pageEn} category={props.category} img={item.img} price={item.price} title={item.title} available={item.available} description={item.description} />
                        </SwiperSlide>) : (null)
                    ))
                ) : (
                    <p>Loading...</p>
                )}
                <div className='paginnation'></div>
            </Swiper >
        </>
    )
}
