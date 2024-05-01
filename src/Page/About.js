import React, { useState } from 'react'
import { Row, Col, Form, Toast, Button, ToastContainer } from "react-bootstrap"
import '../styles/about.css'
import MaskedInput from 'react-input-mask';

import axios from 'axios';

export default function About(props) {
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [number, setNumber] = useState('');
  const [text, setText] = useState('');

  const [show, setShow] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState();
  const [emailError, setEmailError] = useState('');
  const [enterAllInputError, setEnterAllInputError] = useState('');
  const [textError, setTextError] = useState('');

  const [message, setMessage] = useState('');

  const handleForm = () => {
    // Ваша логика валидации
    setUsernameError('');
    setPhoneError('');
    setEmailError('');
    setEnterAllInputError('');
    setTextError('');

    // Пример простой проверки, замените на вашу логику
    if (!username || !mail || !number || !text) {
      setEnterAllInputError('Заполните все поля!');
      return;
    }

    if (username.length < 4) {
      setUsernameError('Имя пользователя должно содержать как минимум 4 символа.');
      return;
    }

    if (text.length < 50) {
      setTextError('Сообщение должно содержать как минимум 50 символов.');
      return;
    }
    // Проверка, что номер телефона соответствует ожидаемому формату
    const phoneRegex = /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(number)) {
      setPhoneError('Некорректный формат номера телефона.');
      return;
    }


    // Пример валидации электронной почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      setEmailError('Некорректный адрес электронной почты.');
      return;
    }

    axios.post('/send_email', { type: 'contact', username, mail, number, text }).then(response => {
      setUsername('');
      setMail('');
      setNumber('');
      setText('');
      if (response.data.success) {
        setShow(true);
        setMessage(response.data.message);
      }
      console.log(response);
    }).catch(error => {
      setShow(true);
      setMessage(error.response.data.message);
      console.log(error);
    });
  }

  const handleText = (e) => {
    let text = e.target.value.slice(0, 3000);
    setText(text);
  }

  return (
    <>
      <title>О Нас</title>
      <div className="container-fluid d-flex text-center text-white align-items-center jumbo mt-3 mb-5">
        <div className='overlay'></div>
        <div className="container p-5">
          <h1 className="display-4 fw-bold">GenaBooker</h1>
          <h2>Одежда, которая делает вас заметным!
          </h2>
        </div>
      </div>
      <Row className='mb-4 '>
        <h2 className='text-center'>Связаться с нами</h2>
        <div className='text-center'>
          <span className="fs-1 text-danger">{enterAllInputError}</span>
        </div>
        <Col className='col-12 d-flex justify-content-center'>
          <Col className='col-9 col-sm-9 col-md-8 col-lg-6'>
            <Form className='d-flex flex-column'>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameError('')}
                  required
                  value={username}
                  placeholder="Ivan"
                />
                <span className="text-danger">{usernameError}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Электронная почта</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setMail(e.target.value)}
                  onFocus={() => setEmailError('')}
                  required
                  value={mail}
                  placeholder="example@mail.com"
                />
                {emailError && <span className="text-danger">{emailError}</span>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Номер телефона</Form.Label>
                <MaskedInput
                  mask="+7 (999) 999-99-99"
                  autoComplete="tel"
                  placeholder="+7 (XXX) XXX-XX-XX"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  onFocus={() => setPhoneError('')}
                  className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                />
                <span className="text-danger">{phoneError}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Ваше сообщение</Form.Label>
                <textarea
                  onChange={(e) => handleText(e)}
                  onFocus={() => setTextError('')}
                  value={text}
                  placeholder='Здравствуйте! У меня появился такой вопрос...'
                  rows={5}
                  className={`form-control ${textError ? 'is-invalid' : ''}`}
                />
                <span>{text.length}/3000</span><br />
                <span className="text-danger">{textError}</span>
              </Form.Group>
              <Button variant="dark" onClick={handleForm} type="button">
                Отправить
              </Button>
            </Form>
          </Col>
        </Col>
      </Row >
      <Row className='d-flex align-items-center'>
        <h2 className="text-center mb-4">Где мы?</h2>
        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 col-xxl-6 col-xl-6 d-flex justify-content-center mt-2'>
          <iframe title='map' src="https://yandex.ru/map-widget/v1/?um=constructor%3Afc1974f4c29873fbca3b30b4541d09804f90c9c5d4f9a4285a2ae53fa074a758&amp;source=constructor" width="500" height="400" frameBorder="0"></iframe>
        </Col>
        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 col-xxl-6 col-xl-6 d-flex align-content-center flex-column mt-2 col-sm-2 col-md-0 col-lg-0 col-xl-0 col-xxl-0'>
          <h2 className='text-center'>
            Режим работы
          </h2>
          <Row>
            <Col className='d-flex justify-content-center col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 '>
              <ul>
                <li>
                  <span className='fw-bold'>
                    Пн-Пт:&nbsp;
                  </span>
                  <span>08:00 - 21:00</span>
                </li>
                <li>
                  <span className='fw-bold'>
                    Сб-Вс:&nbsp;
                  </span>
                  <span>08:00 - 20:00</span>
                </li>
              </ul>
            </Col>
            <Col className='d-flex text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start justify-content-center col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
              <div className='d-flex flex-column  mb-3'>
                <span className='fw-bold'>
                  VK:&nbsp;
                  <a href='vk.com/gena_booker'>vk.com/gena_booker</a>
                </span>
                <span className='fw-bold'>
                  Telegram:&nbsp;
                  <a href='vk.com/gena_booker'>telegram.com/gena_booker</a>
                </span>
              </div>
            </Col>
          </Row>
          <div className='d-flex justify-content-center'>
            <span>
              Добро пожаловать в GenaBooker - ваш идеальный партнер в мире моды и стиля! В GenaBooker мы предлагаем вам самые актуальные и стильные тренды в мире одежды. Независимо от того, ищете ли вы повседневный наряд для прогулки по городу или элегантное платье для особого случая, у нас есть все, чтобы выглядеть и чувствовать себя настоящей звездой!

              Наш интернет-магазин предлагает широкий ассортимент одежды для всех возрастов, размеров и стилей. От классических фасонов до смелых экспериментов с модой - у нас вы обязательно найдете то, что подходит именно вам. Кроме того, мы постоянно обновляем наш ассортимент, чтобы предложить вам только лучшее из мира моды.

              Мы гордимся тем, что предлагаем не только качественную одежду, но и высокий уровень обслуживания клиентов. Наша команда всегда готова помочь вам с выбором, ответить на ваши вопросы и обеспечить незабываемый опыт покупок.
            </span>
          </div>
        </Col>
      </Row >
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
    </>
  )
}
