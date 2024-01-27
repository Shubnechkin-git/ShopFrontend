import React from 'react'
import { Row, Col } from "react-bootstrap"
import '../styles/about.css'

export default function About() {
  return (
    <>
      <div>About</div>
      <div className="container-fluid d-flex text-center text-white align-items-center jumbo mt-3 mb-5">
        <div className='overlay'></div>
        <div className="container p-5">
          <h1 className="display-4 fw-bold">GenaBooker</h1>
        <h2>Одежда, которая делает вас заметным!
          </h2>
        </div>
      </div>
      <Row className='d-flex align-items-center'>
        <h2 className="text-center mb-4">Где мы?</h2>
        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 col-xxl-6 col-xl-6 d-flex justify-content-center mt-2'>
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Afc1974f4c29873fbca3b30b4541d09804f90c9c5d4f9a4285a2ae53fa074a758&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
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
                  <a href='#'>vk.com/gena_booker</a>
                </span>
                <span className='fw-bold'>
                  Telegram:&nbsp;
                  <a href='#'>telegram.com/gena_booker</a>
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
    </>
  )
}
