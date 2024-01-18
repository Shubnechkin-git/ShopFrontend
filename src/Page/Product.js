import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form } from "react-bootstrap"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Product(props) {
  const location = useLocation();
  const [productData, setProductData] = useState(null);
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
    const { img, price, title, category, pageRu, pageEn } = location.state;
    return (
      <div className=''>
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
              <div className="d-flex gap-4">
                <Button className="text-uppercase w-100" variant="success">Купить</Button>
                <Button className="text-uppercase w-100" variant="dark">В корзину</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
