import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom';

function Item(props) {
    const { img, title, price, category, pageRu, pageEn } = props;
    return (
        <>
            <div className='card__item mt-4 mb-4 d-flex flex-column'>
                <Link
                    className="text-decoration-none fs-2 fw-bold text-black nav-link"
                    to={{
                        pathname: `/product`,
                    }}
                    state={{
                        img: img,
                        price: price,
                        title: title,
                        pageRu: pageRu,
                        pageEn: pageEn,
                        category: category
                    }
                    }
                >
                    <div className='card__img d-flex'>
                        <img alt='1' className='img-fluid' src={img} />
                    </div>
                    <div className='card__price mt-2'>
                        <span className='fw-bold fs-4'>{price} ₽</span>
                    </div>
                    <div className='card__title mb-3 mt-1'>{title}</div>
                </Link>
                <div className='card__btn'>
                    <Button className='btn btn-dark'>В КОРЗИНУ</Button>
                </div>
            </div>
        </>
    );
}

Item.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Item
