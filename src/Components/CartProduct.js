import React, { useState } from 'react'
import axios from 'axios';
import { Button, Card, Image, Toast } from 'react-bootstrap';

export default function CartProduct(props) {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    const [count, setCount] = useState(props.count);
    const [total_price, setTotalPrice] = useState(props.total_price);

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
            console.error('Ошибка при проверке сессии:', error);
            return { success: false, userInfo: null };
        }
    };

    const handleAdditionToCart = async () => {
        try {
            const sessionInfo = await checkSession(); // Ожидаем результат проверки сеанса
            if (!sessionInfo.success) {
                setMessage('Для добавления товара в корзину необходимо авторизоваться!');
                setShow(true); // Показываем сообщение об ошибке
            } else {
                setShow(false); // Скрываем сообщение об ошибке

                const cartItem = {
                    product_id: props.product_id,
                    category: props.category,
                    user_info: sessionInfo.userInfo, // Используем полученную информацию о пользователе,
                    count: 1
                };

                const cartResponse = await axios.post('/cart', cartItem);

                if (cartResponse.data.success) {
                    setMessage(cartResponse.data.message)
                    setShow(true);
                    const cartProductId = props.id
                    const productCount = await axios.post('/getCart', { sessionInfo, cartProductId });
                    setCount(productCount.data.count);
                    setTotalPrice(productCount.data.total_price);
                    props.fetchData();
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


    const handleReductionToCart = async () => {
        try {
            const sessionInfo = await checkSession(); // Ожидаем результат проверки сеанса
            if (!sessionInfo.success) {
                setMessage('Для добавления товара в корзину необходимо авторизоваться!');
                setShow(true); // Показываем сообщение об ошибке
            } else {
                setShow(false); // Скрываем сообщение об ошибке

                const cartItem = {
                    product_id: props.product_id,
                    category: props.category,
                    user_info: sessionInfo.userInfo, // Используем полученную информацию о пользователе
                    count: -1
                };

                const cartResponse = await axios.post('/cart', cartItem);

                if (cartResponse.data.success) {
                    const cartProductId = props.id
                    const productCount = await axios.post('/getCart', { sessionInfo, cartProductId });
                    if (productCount.data.count > 0) {
                        setMessage(cartResponse.data.message)
                        setShow(true);
                        setCount(productCount.data.count);
                        setTotalPrice(productCount.data.total_price);
                        props.fetchData();
                        console.log('Товар успешно удален из корзину', cartResponse.data);
                    }
                    else {
                        handleDeleteFromCart();
                    }
                } else {
                    console.error('Ошибка при удалении товара из корзины', cartResponse.data);
                }
            }
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.error);
            setShow(true);
        }
    }

    const handleDeleteFromCart = async () => {
        try {
            const sessionInfo = await checkSession();
            if (!sessionInfo.success) {
                setMessage('Для добавления товара в корзину необходимо авторизоваться!');
                setShow(true); // Показываем сообщение об ошибке
            } else {
                setShow(false); // Скрываем сообщение об ошибке
                const request = {
                    id: props.id,
                }
                props.removeFromCart(props.id);
                const deleteFromCartResponse = await axios.post('/deleteCart', request);
                if (deleteFromCartResponse.data.success) {
                    setMessage(deleteFromCartResponse.data.message);
                    setShow(true); // Показываем сообщение об успехе
                    setIsVisible(false); // Скрываем или удаляем элемент из DOM
                }
                console.log(deleteFromCartResponse);
            }
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.error);
            setShow(true);
        }
    }


    return (
        isVisible && (
            <Card key={props.id} id={props.id} className="mb-3 h-100">
                <Card.Header className='d-flex flex-column h-100'>
                    <Card.Title className='text-center'>{props.title}</Card.Title>
                    <Image src={props.img} className="mb-2 me-2 mt-2 h-100 img-fluid" thumbnail />
                </Card.Header>
                <Card.Body>
                    <Card.Text>Цена: {props.price} руб.</Card.Text>
                    <Card.Text id='count'>Количество: {count} шт</Card.Text>
                    <Card.Text>Сумма: {total_price} руб.</Card.Text>
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
                    <Button variant="success" onClick={handleAdditionToCart}>+</Button>{' '}
                    <Button variant="secondary" onClick={handleReductionToCart}>-</Button>{' '}
                    <Button variant="danger" onClick={handleDeleteFromCart}>Удалить</Button>
                </Card.Body>
            </Card >
        ))
}
