import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function LoginForm(props) {
    return (
        <>
            <h1 className='text-center'>Авторизация</h1>
            <Row>
                <Col className='col-12 d-flex justify-content-center'>
                    <Col className='col-9 col-sm-9 col-md-8 col-lg-6'>
                        <Form className='d-flex flex-column'>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control type="text" required placeholder="Ivan" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" required placeholder="********" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" className='mb-2' label="Запомнить меня" />
                                <span className='linkReg' onClick={props.toggleForm}>
                                    Ещё не зарегистрированы?
                                </span>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Войти
                            </Button>
                        </Form>
                    </Col>
                </Col >
            </Row>
        </>
    )
}
