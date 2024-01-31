import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Toast } from "react-bootstrap"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Product(props) {
  const location = useLocation();
  const [productData, setProductData] = useState(null);
  const [show, setShow] = useState(false);

  console.log(location);

  useEffect(() => {
    if (location.state) {
      setProductData(location.state);
    }
  }, [location.state]);
  if (!productData) {
    return <div>Загрузка данных...</div>;
  }

  else if (productData) {
    const { img, price, title, category, pageRu, pageEn, productId, } = location.state;

    const checkSession = async () => {
      try {
        const response = await axios.get('/checkSession');
        if (response.data.success) {
          return true;
        }
        else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const handleCart = async () => {
      try {
        const response = await checkSession(); // Ждем завершения checkSession
        if (!response) {
          setShow(true);
        }
        else if (response) {
          setShow(false);

        }
      }
      catch (error) {
        console.log(error);
        setShow(true);
      }
    };


    return (
      <div className='' product_id={productId} category={category}>
        <div className='d-flex flex-column align-items-start'>
          <div>Product</div>
          <Row className='mt-2 mb-2'>
            <span>
              {pageRu !== '' && (
                <>
                  <Link to={pageEn}>{pageRu}</Link>
                  &gt;
                </>
              )}
              <Link to={pageEn}>{category}</Link> &gt;
              {title}
            </span>
          </Row>
          <Row className='flex-grow-1'>
            <Col className='text-center col-12 col-sm-12 col-lg-6 col-md-12 col-xl-6 col-xxl-6 mb-5'>
              <img className='img-fluid' alt="photo_product" src={img} />
            </Col>
            <Col className=' text-md-center text-sm-start text-lg-start col-12 col-sm-12 col-lg-6 col-md-12 col-xl-6 col-xxl-6'>
              <h2 className='text-uppercase fw-bold'>{title}</h2>
              <h2 className='text-uppercase fw-bold mt-3'>{price} руб.</h2>
              <span className='fs-4'>
                Sunt cillum velit commodo proident cupidatat nisi nulla culpa nisi ullamco nostrud. Labore exercitation pariatur consequat voluptate laborum eiusmod est laboris aute non minim. Eu consequat veniam in aliquip mollit. Deserunt magna dolore anim non ex ipsum nulla.
              </span>
              <Form.Group className="mt-3 mb-3">
                <Form.Label>
                  <span className='fw-bold'>Размер</span>
                </Form.Label>
                <Form.Select>
                  <option>XS</option>
                  <option>S-M</option>
                  <option>L-XL</option>
                  <option>XXl</option>
                </Form.Select>
              </Form.Group>
              <div className='d-flex justify-content-center mt-3 mb-3'>
                <Toast className='w-sm-100 w-auto w-md-auto w-lg-auto w-xl-auto w-xxl-auto' onClose={() => setShow(false)} show={show} delay={3000} autohide>
                  <Toast.Header>
                    <svg width="15" viewBox="0 0 63 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30.1279 21.8721L17.6768 22.918V14.2021L12.6963 14.6006V44.4834L17.6768 44.085V40.3496L15.1865 40.5488V28.0977L30.1279 26.8525V55.4902L0.245117 57.9805V3.19531L30.1279 0.705078V21.8721Z" fill="black" />
                      <path d="M45.0693 44.4834L50.0498 44.085V35.3691L45.0693 35.7676V44.4834ZM50.0498 14.2021L45.0693 14.6006V23.3164L50.0498 22.918V14.2021ZM62.501 31.833V55.4902L32.6182 57.9805V3.19531L62.501 0.705078V24.3623L58.7656 28.0977L62.501 31.833Z" fill="black" />
                    </svg>
                    <strong className="me-auto ms-2">GenaBooker</strong>
                    <small>Только что</small>
                  </Toast.Header>
                  <Toast.Body>Для добавления товара в корзину, необходимо выполнить вход или регистрацию!</Toast.Body>
                </Toast >
              </div>
              <div className="d-flex gap-4">
                <Button className="text-uppercase w-100" variant="success">Купить</Button>
                <Button className="text-uppercase w-100" variant="dark" onClick={handleCart}>В корзину</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
