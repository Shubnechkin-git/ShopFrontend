import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import CartProduct from '../Components/CartProduct';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete(`/cart/${itemId}`);
      if (response.data.success) {
        setCartItems(cartItems.filter(item => item.id !== itemId));
      } else {
        console.error('Ошибка при удалении товара из корзины:', response.data.error);
      }
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      const response = await axios.put(`/cart/${itemId}/decrease`);
      if (response.data.success) {
        setCartItems(cartItems.map(item => {
          if (item.id === itemId) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        }));
      } else {
        console.error('Ошибка при уменьшении количества товара:', response.data.error);
      }
    } catch (error) {
      console.error('Ошибка при уменьшении количества товара:', error);
    }
  };

  const handleIncreaseQuantity = async (itemId) => {
    try {
      const response = await axios.put(`/cart/${itemId}/increase`);
      if (response.data.success) {
        setCartItems(cartItems.map(item => {
          if (item.id === itemId) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        }));
      } else {
        console.error('Ошибка при увеличении количества товара:', response.data.error);
      }
    } catch (error) {
      console.error('Ошибка при увеличении количества товара:', error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionInfo = await checkSession();
        setIsLoggedIn(sessionInfo.success);
        if (sessionInfo.success) {
          const getCartResponse = await axios.post('/getCart', { sessionInfo });
          setCartItems(getCartResponse.data);
        } else {
          setErrorMessage('Для просмотра корзины необходимо авторизоваться.');
        }
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
        setErrorMessage('Произошла ошибка при загрузке корзины.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  return (
    <>
      <title>Корзина</title>
      <div>Cart</div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : isLoggedIn ? (
        cartItems.length > 0 ? (
          <div>
            <h2>Ваша корзина:</h2>
            <Row>
              {cartItems.map(item => (
                <Col className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 mb-2'>
                  <CartProduct price={item.price} count={item.count} title={item.product_info.title} img={item.product_info.img} total_price={item.total_price} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <p>Корзина пуста.</p>
        )
      ) : (
        <p>{errorMessage}</p>
      )}
    </>
  );
}
