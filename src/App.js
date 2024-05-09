import Header from "./Components/Header"
import Footer from "./Components/Footer"
import "./styles/app.css"
import "./styles/footer.css"
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Home from "./Page/Home";
import Catalog from "./Page/Catalog";
import About from "./Page/About";
import Cart from "./Page/Cart";
import Profile from "./Page/Profile";
import Product from "./Page/Product";

function App() {
  const [state, setState] = useState(null);
  const [colors, setColors] = useState([null]);

  const callBackendAPI = async () => {
    // Создайте объект Headers
    const headers = new Headers();

    axios.get('/getColor')
      .then(response => {
        console.log(response)
        if (response.data.success) {
          document.getElementsByTagName('header')[0].style.backgroundColor = response.data.colors[0].navbar;
          document.getElementsByClassName('footer')[0].firstChild.style.backgroundColor = response.data.colors[0].footer;
          document.getElementsByTagName('body')[0].style.backgroundColor = response.data.colors[0].background;
          document.getElementsByTagName('body')[0].style.color = response.data.colors[0].text_color;
          setColors(response.data.colors[0]);
        }
      })
      .catch(error => {
        console.log(error);
      });

    // Получите значение sessionId из куки (замените 'sessionId' на ваш реальный ключ куки)
    const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");

    console.log(sessionId);
    // Если sessionId найден, добавьте его к заголовкам
    if (sessionId) {
      headers.set('Cookie', `sessionId=${sessionId}`);
    }


    // Используйте объект Headers при создании запроса
    const response = await fetch('/express_backend', { headers });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    console.log(body);
    return body;
  };

  // Получение GET маршрута с сервера Express, который соответствует GET из server.js 
  useEffect(() => {
    callBackendAPI()
      .then(res => setState(res.express))
      .catch(err => {
        console.log(err);
        console.log("Response from server:", err.response); // Логирование ответа от сервера
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile colors={colors} />} />
            <Route path="/product" element={<Product />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <div className="wrapper mt-5 mb-5">
        </div>
        <div className="footer mt-5">
          <Footer />
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
