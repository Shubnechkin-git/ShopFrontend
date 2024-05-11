import React from 'react'
import { Col } from "react-bootstrap"
import { Link } from 'react-router-dom';

export default function CatalogItems(props) {
    return (
        <Col className="card_item col-sm-12 col-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mb-4">
            <Link
                className="text-decoration-none h-100 fs-2 fw-bold text-black nav-link"
                to={{
                    pathname: `/product`,
                }}
                state={{
                    img: props.img,
                    price: props.price,
                    title: props.title,
                    pageEn: '/catalog',
                    pageRu: '',
                    category: 'Каталог',
                    productId: props.productId,
                    available: props.available,
                    description: props.description
                }}
            >
                <div className='thumbs h-100'>
                    <img src={props.img} className='img-fluid h-100'
                        alt='product_photo'>
                    </img>
                    <div className="caption__photo">
                        <span className="caprion__title fs-5 fw-bold text-uppercase">{props.title}</span>
                        <span className="caption__info"><button className='btn btn-dark'>ПОДРОБНЕЕ</button></span>
                    </div>
                    <div className='caption_price'>
                        <span id='price'>{props.price}руб.</span>
                    </div>
                </div>
            </Link>
        </Col >
    )
}
