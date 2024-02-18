import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import CartProduct from '../Components/CartProduct';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cartPrice, setCartPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // После каждого обновления корзины пересчитываем общую цену и количество товаров
    let totalPrice = 0;
    let totalCount = 0;
    cartItems.forEach(item => {
      totalPrice += item.total_price;
      totalCount += item.count;
    });
    setCartPrice(totalPrice);
    setCartCount(totalCount);
  }, [cartItems]);

  const fetchData = async () => {
    try {
      const sessionInfo = await checkSession();
      setIsLoggedIn(sessionInfo.success);
      if (sessionInfo.success) {
        const getCartResponse = await axios.post('/getCart', { sessionInfo });
        setCartItems(getCartResponse.data);
        let totalItems = 0;
        let totalPrice = 0;
        cartItems.forEach(item => {
          totalItems += item.count;
          totalPrice += item.total_price;
        });

        setCartCount(totalItems);
        setCartPrice(totalPrice);
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

  const removeFromCart = (id) => {
    console.log("Removing:", id);
    setCartItems(cartItems.filter(item => item.id !== id));
    let totalItems = 0;
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalItems += item.count;
      totalPrice += item.total_price;
    });

    setCartCount(totalItems);
    setCartPrice(totalPrice);
  };


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
                  <CartProduct
                    key={item.id} // Важно добавить ключ для каждого элемента списка
                    id={item.id}
                    category={item.category}
                    product_id={item.product_id}
                    price={item.price}
                    count={item.count}
                    title={item.product_info.title}
                    img={item.product_info.img}
                    total_price={item.total_price}
                    removeFromCart={removeFromCart} // Передаем функцию удаления из корзины
                    fetchData={fetchData}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <hr />
              <div>
                <h3>Сумма корзины: {cartPrice} руб.</h3>
                <h3>Товаров: {cartCount} шт.</h3>
                <button className='text-uppercase btn btn-success'>заказать</button>
              </div>
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
