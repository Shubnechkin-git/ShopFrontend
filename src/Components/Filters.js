import React, { useState } from 'react'
import { Row, Col, Form, DropdownButton } from "react-bootstrap"

export default function Filters(props) {
    const [sortValue, setSortValue] = useState('DESC');

    const handleSortChange = (event) => {
        setSortValue(event.target.value);
        props.onSortChange(event.target.value);
    };

    return (
        <Row>
            <Col className='d-flex justify-content-start gap-5'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Сортировка</Form.Label>
                    <Form.Select aria-label="test1" value={sortValue} onChange={handleSortChange}>
                        <option value="ASC">Цена по возрастанию</option>
                        <option value="DESC">Цена по убыванию</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
    )
}
