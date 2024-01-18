import React from 'react'
import { Row, Col, Form, DropdownButton } from "react-bootstrap"

export default function Filters() {
    return (
        <Row>
            <Col className='d-flex justify-content-center gap-5'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Сортировка</Form.Label>
                    <Form.Select aria-label="test1">
                        <option value="1">Цена по возрастанию</option>
                        <option value="2">Цена по убыванию</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Категория</Form.Label>
                    <Form.Select aria-label="test2">
                        <option value="1">Цена по возрастанию</option>
                        <option value="2">Цена по убыванию</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Цена</Form.Label>
                    <DropdownButton>
                        <div className='ps-3 pe-3'>
                            <div className="d-flex justify-content-between">
                                <span>100 р.</span>
                                <span>6000 р.</span>
                            </div>
                            <Form.Range min="100" max="6000" step={100} />
                        </div>
                    </DropdownButton>
                </Form.Group>
            </Col>
        </Row>
    )
}
