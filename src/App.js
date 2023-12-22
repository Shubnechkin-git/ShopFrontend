import Header from "./Components/Header"
import Footer from "./Components/Footer"
import "./styles/app.css"
import "./styles/footer.css"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Home from "./Page/Home";
import Catalog from "./Page/Catalog";
import About from "./Page/About";
import Cart from "./Page/Cart";
import Profile from "./Page/Profile";


function App() {
  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  useEffect(() => {
    callBackendAPI()
      .then(res => setState(res.express))
      .catch(err => console.log(err));
  }, [])
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
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
