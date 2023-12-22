import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "react-bootstrap"

function Item(props) {
    return (
        <>
            <div className='card__item mt-4 mb-4 d-flex flex-column'>
                <div className='card__img d-flex'>
                    <img alt='1' className='img-fluid' src={props.img} />
                </div>
                <div className='card__price mt-2'>
                    <span className='fw-bold fs-4'>{props.price} ₽</span>
                </div>
                <div className='card__title mb-3 mt-1'>
                    {props.title}
                </div>
                <div className='card__btn'>
                    <Button className='btn btn-dark'>В КОРЗИНУ</Button>
                </div>
            </div>
        </>
    )
}

Item.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}

export default Item
