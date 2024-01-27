import 'swiper/css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';

import SwiperMy from "../Components/SwiperMy";

export default function Items() {
    const [hotItems, setHotItems] = useState([]);
    const [noveltyItems, setNoveltyItems] = useState([]);
    const [discountItems, setDiscountItems] = useState([]);

    const fetchData = () => {
        axios.post('/hot_items')
            .then(response => {
                setHotItems(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.post('/discount_items')
            .then(response => {
                setDiscountItems(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.post('/novelty_items')
            .then(response => {
                setNoveltyItems(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        // Загрузка данных при монтировании
        fetchData();

        // Периодический опрос сервера каждые 5 секунд
        const intervalId = setInterval(fetchData, 300000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1 className='text-center mt-5'>Популярные товары</h1>
            <SwiperMy pageEn='/' pageRu='Главная' category="Популярные товары" data={hotItems} />
            <h1 className='text-center mt-5'>Новинки</h1>
            <SwiperMy pageEn='/' pageRu='Главная' category="Новинки" data={noveltyItems} />
            <h1 className='text-center mt-5'>Скидки</h1>
            <SwiperMy pageEn='/' pageRu='Главная' category="Скидки" data={discountItems} />
        </div>
    );
};
