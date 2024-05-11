import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Toast, ToastContainer } from "react-bootstrap"
import { Link } from 'react-router-dom';
import axios from 'axios';

function Item(props) {
    const { img, title, price, category, pageRu, pageEn, productId, available, description } = props;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const checkSession = async () => {
        try {
            const response = await axios.get('/checkSession');
            if (response.data.success) {
                const userResponse = await axios.post('/user');
                const userInfo = userResponse.data.user;
                return { success: true, userInfo: userInfo };
            } else {
                return { success: false, userInfo: null };
            }
        } catch (error) {
            console.log(error);
            return { success: false, userInfo: null };
        }
    };

    const handleCart = async () => {
        try {
            const sessionInfo = await checkSession(); // Ожидаем результат проверки сеанса
            if (!sessionInfo.success) {
                setMessage('Для добавления товара в корзину необходимо авторизоваться!');
                setShow(true); // Показываем сообщение об ошибке
            } else {
                setShow(false); // Скрываем сообщение об ошибке

                const cartItem = {
                    product_id: props.productId,
                    category: props.category,
                    user_info: sessionInfo.userInfo, // Используем полученную информацию о 
                    count: 1
                };

                const cartResponse = await axios.post('/cart', cartItem);

                if (cartResponse.data.success) {
                    setMessage(cartResponse.data.message)
                    setShow(true);
                    console.log('Товар успешно добавлен в корзину', cartResponse.data);
                } else {
                    console.error('Ошибка при добавлении товара в корзину', cartResponse.data);
                }
            }
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.error);
            setShow(true);
        }
    };


    return (
        <>
            <div className='card__item mt-4 mb-4 d-flex flex-column h-100' category={category} product_id={productId}>
                <Link
                    className="text-decoration-none h-100 fs-2 fw-bold text-black nav-link"
                    to={{
                        pathname: `/product`,
                    }}
                    state={{
                        img: img,
                        price: price,
                        title: title,
                        pageRu: pageRu,
                        pageEn: pageEn,
                        category: category,
                        productId: productId,
                        available: available,
                        description: description
                    }
                    }
                >
                    <div className='card__img h-100 d-flex'>
                        <img alt='1' className='img-fluid' src={img} />
                    </div>
                    <div className='card__price mt-2 d-flex justify-content-between align-content-center'>
                        <span className='fw-bold fs-4'>{price} ₽</span>
                        <span className='fw-bold fs-5'>В наличие:{available}</span>
                    </div>
                    <div className='card__title mb-3 mt-1'>{title}</div>
                </Link>
                <div className='d-flex justify-content-center'>
                    <Toast className='w-100 mb-4' onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <svg width="15" viewBox="0 0 63 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.1279 21.8721L17.6768 22.918V14.2021L12.6963 14.6006V44.4834L17.6768 44.085V40.3496L15.1865 40.5488V28.0977L30.1279 26.8525V55.4902L0.245117 57.9805V3.19531L30.1279 0.705078V21.8721Z" fill="black" />
                                <path d="M45.0693 44.4834L50.0498 44.085V35.3691L45.0693 35.7676V44.4834ZM50.0498 14.2021L45.0693 14.6006V23.3164L50.0498 22.918V14.2021ZM62.501 31.833V55.4902L32.6182 57.9805V3.19531L62.501 0.705078V24.3623L58.7656 28.0977L62.501 31.833Z" fill="black" />
                            </svg>
                            <strong className="me-auto ms-2">GenaBooker</strong>
                            <small>Только что</small>
                        </Toast.Header>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast >
                </div>
                <div className='card__btn'>
                    <Button className='btn btn-dark' onClick={handleCart}>В КОРЗИНУ</Button>
                </div>
            </div>
        </>
    );
}

Item.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Item
