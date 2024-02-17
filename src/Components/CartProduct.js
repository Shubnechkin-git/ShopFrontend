import React from 'react'
import axios from 'axios';
import { Button, Card, Image } from 'react-bootstrap';

export default function CartProduct(props) {
    return (
        <Card key={props.id} className="mb-3">
            <Card.Header className='d-flex flex-column'>
                <Card.Title className='text-center'>{props.title}</Card.Title>
                <Image src={props.img} className="mb-2 me-2 mt-2 img-fluid" thumbnail />
            </Card.Header>
            <Card.Body>
                <Card.Text>Цена: {props.price} руб.</Card.Text>
                <Card.Text>Количество: {props.count} шт</Card.Text>
                <Card.Text>Сумма: {props.total_price} руб.</Card.Text>
                <Button variant="success">+</Button>{' '}
                <Button variant="secondary">-</Button>{' '}
                <Button variant="danger">Удалить</Button>
            </Card.Body>
        </Card>
    )
}
