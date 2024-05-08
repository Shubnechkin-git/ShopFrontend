import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import CartProduct from '../Components/CartProduct';
import MaskedInput from 'react-input-mask';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cartPrice, setCartPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);

  const [lastname, setLastname] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [patrynomic, setPatrynomic] = useState(null);
  const [email, setEmail] = useState(null);
  const [tel, setTel] = useState(null);
  const [address, setAdress] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  let id = [];

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

  const [lastnameError, setLastnameError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [patrynomicError, setPatrynomicError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleForm = () => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    // Validation for last name, first name, and middle name (assuming they only contain letters)
    setLastnameError('')

    let id = [];

    cartItems.forEach((item, index) => {
      id[index] = item.id;
    });

    if (!lastname) {
      setLastnameError('Фамилия не может быть пустой.');
      return;
    } else if (!nameRegex.test(lastname)) {
      setLastnameError('Некорректная фамилия.');
      return;
    } else { setLastnameError('') };

    if (!firstname) {
      setFirstnameError('Имя не может быть пустым.');
      return;
    } else if (!nameRegex.test(firstname)) {
      setFirstnameError('Некорректное имя.');
      return;
    } else setFirstnameError('');

    if (!patrynomic) {
      setPatrynomicError('Отчество не может быть пустым.');
      return;
    } else if (!nameRegex.test(patrynomic)) {
      setPatrynomicError('Некорректное отчество.');
      return;
    } else setPatrynomicError('');

    // Пример валидации электронной почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Некорректный адрес электронной почты.');
      return;
    } else setEmailError('');

    // Проверка, что номер телефона соответствует ожидаемому формату
    const phoneRegex = /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(tel)) {
      setPhoneError('Некорректный формат номера телефона.');
      return;
    } else setPhoneError('');

    // Validation for address (assuming it can contain letters, digits, spaces, and some special characters)
    const addressRegex = /^[a-zA-Zа-яА-Я0-9\s.,-]+$/;
    if (!address) {
      setAddressError('Адрес не может быть пустым.');
      return;
    } else if (!addressRegex.test(address)) {
      setAddressError('Некорректный адрес.');
      return;
    } else setAddressError('');

    axios.put('/change_status', { cart_id: id, status: "processing" }).then(response => {
      console.log(response);
      if (response.data.success) {
        axios.post('/send_email', { type: 'order', lastname, firstname, patrynomic, email, tel, address, cartItems }).then(response => {
          if (response.data.success) {
            setShow(true);
            setLastname('');
            setFirstname('');
            setPatrynomic('');
            setEmail('');
            setTel('');
            setAdress('');
            setMessage(response.data.message);
            setTimeout(() => {
              fetchData();
            }, 3000)
          }
          console.log(response);
        }).catch(error => {
          setShow(true);
          setMessage(error.response.data.message);
          console.log(error);
        });
      }
    }).catch(error => {
      console.log(error);
    });

  }
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
      {isLoading ? (
        <p>Загрузка...</p>
      ) : isLoggedIn ? (
        cartItems.length > 0 ? (
          <div>
            <h2>Ваша корзина:</h2>
            <Row className='row-gap-3 mt-3 mb-3'>
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
              <Row className='d-flex'>
                <Col className="col-12 col-sm-12 col-md-6 col-xl-6 col-xxl-6">
                  <h3>Получатель и доставка</h3>
                  <h4>Ваши данные</h4>
                  <div className='mb-3'>
                    <label forh="lastname">Фамлия</label>
                    <input className={`form-control ${lastnameError ? 'is-invalid' : ''}`}
                      onFocus={() => setLastnameError('')} onChange={(e) => setLastname(e.target.value)} value={lastname} placeholder='Иванов' type="text" id="lastname" required />

                    <span className='text-danger'>{lastnameError}</span>
                  </div>
                  <div className='mb-3'>
                    <label forh="firstname">Имя</label>
                    <input className={`form-control ${firstnameError ? 'is-invalid' : ''}`} placeholder="Иван" onFocus={() => setFirstnameError('')} onChange={(e) => setFirstname(e.target.value)} value={firstname} type="text" id="firstname" required />
                    <span className='text-danger'>{firstnameError}</span>
                  </div>
                  <div className='mb-3'>
                    <label forh="patrynomic">Отчесвто</label>
                    <input className={`form-control ${patrynomicError ? 'is-invalid' : ''}`} placeholder="Иванович" onFocus={() => setPatrynomicError('')} onChange={(e) => setPatrynomic(e.target.value)} value={patrynomic} type="text" id="patrynomic" required />
                    <span className='text-danger'>{patrynomicError}</span>
                  </div>
                  <div className='mb-3'>
                    <label forh="email">Email</label>
                    <input className={`form-control ${emailError ? 'is-invalid' : ''}`} placeholder="example@example.com" onFocus={() => setEmailError('')} onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" required />
                    <span className='text-danger'>{emailError}</span>
                  </div>
                  <div className='mb-3'>
                    <label forh="tel">Телефон</label>
                    <MaskedInput
                      id='tel'
                      className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                      onFocus={() => setPhoneError('')}
                      onChange={(e) => setTel(e.target.value)}
                      mask="+7 (999) 999-99-99"
                      autoComplete="tel"
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={tel}
                      required
                    />
                    <span className='text-danger'>{phoneError}</span>
                  </div>
                  <div className='mb-3'>
                    <label forh="address">Адрес</label>
                    <input className={`form-control ${addressError ? 'is-invalid' : ''}`} placeholder="г. Ижевск, ул. Пушкина, д.27" onFocus={() => setAddressError('')} onChange={(e) => setAdress(e.target.value)} value={address} type="text" id="address" required />
                    <span className='text-danger'>{addressError}</span>
                  </div>
                </Col>
                <Col className='d-none d-sm-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex justify-content-center'>
                  <div className="verticalLine h-100" style={{ borderRight: '1px solid', opacity: .25 }}>
                  </div>
                </Col>
                <Col className="col-12 col-sm-12 col-md-5 col-xx-5 col-xxl-5">
                  <div>
                    <h3>Сумма корзины: {cartPrice} руб.</h3>
                    <h3>Товаров: {cartCount} шт.</h3>
                    <button className='text-uppercase btn btn-success' onClick={handleForm}>заказать</button>
                  </div>
                </Col>
              </Row>
            </Row>
            <ToastContainer className='position-fixed mb-2 me-2' position="bottom-end">
              <Toast onClose={() => setShow(false)} show={show} delay={3000} bg={message === 'Ошибка повторите позже!' ? 'danger' : 'success'} autohide>
                <Toast.Header>
                  <div className="header__logo me-2"><svg width="15" height="15" viewBox="0 0 63 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.1279 21.8721L17.6768 22.918V14.2021L12.6963 14.6006V44.4834L17.6768 44.085V40.3496L15.1865 40.5488V28.0977L30.1279 26.8525V55.4902L0.245117 57.9805V3.19531L30.1279 0.705078V21.8721Z" fill="black"></path><path d="M45.0693 44.4834L50.0498 44.085V35.3691L45.0693 35.7676V44.4834ZM50.0498 14.2021L45.0693 14.6006V23.3164L50.0498 22.918V14.2021ZM62.501 31.833V55.4902L32.6182 57.9805V3.19531L62.501 0.705078V24.3623L58.7656 28.0977L62.501 31.833Z" fill="black"></path></svg></div>
                  <strong className="me-auto ">GenaBooker</strong>
                  <small>Только что</small>
                </Toast.Header>
                <Toast.Body className='text-white'>{message}</Toast.Body>
              </Toast>
            </ToastContainer >
          </div>
        ) : (
          <p>Корзина пуста.</p>
        )
      ) : (
        <p>{errorMessage}</p>
      )
      }
    </>
  );
}
