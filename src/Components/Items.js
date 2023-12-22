import 'swiper/css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';

import SwiperMy from "../Components/SwiperMy";


export default function Items() {
    const [hotItems, setHotItems] = useState(null);
    const [noveltyItems, setNoveltyItems] = useState(null);
    const [discountItems, setDiscountItems] = useState(null);

    useEffect(() => {
        axios.get('/hot_items')
            .then(function (response) {
                // handle success
                console.log(response.data);
                setHotItems(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        axios.get('/discount_items')
            .then(function (response) {
                // handle success
                console.log(response.data);
                setDiscountItems(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        axios.get('/novelty_items')
            .then(function (response) {
                // handle success
                console.log(response.data);
                setNoveltyItems(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);
    return (
        <div>
            <h1 className='text-center mt-5'>Популярные товары</h1>
            <SwiperMy data={hotItems} />
            <h1 className='text-center mt-5'>Новинки</h1>
            <SwiperMy data={noveltyItems} />
            <h1 className='text-center mt-5'>Скидки</h1>
            <SwiperMy data={discountItems} />
        </div >
    )
}
