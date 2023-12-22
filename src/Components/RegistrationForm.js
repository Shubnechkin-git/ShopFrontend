import React, { useState } from 'react';
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function RegistrationForm(props) {

    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');

    const handleRegister = () => {
        axios.post('http://localhost:3000/register', { username, mail, password, number })
            .then(response => {
                console.log(response);
                // Дополнительная логика при успешной регистрации
            })
            .catch(error => {
                console.error(error.response);
                // Обработка ошибок
            });
    };
    return (
        <>
            <h1 className='text-center'>Регистрация</h1>
            <Row>
                <Col className='col-12 d-flex justify-content-center'>
                    <Col className='col-9 col-sm-9 col-md-8 col-lg-6'>
                        <Form className='d-flex flex-column'>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Ivan" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control type="email" onChange={(e) => setMail(e.target.value)} required placeholder="example@mail.com" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                                <Form.Group className="mb-3" controlId="formBasicNumber">
                                    <Form.Label>Номер телефона</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setNumber(e.target.value)} required placeholder="+7 (XXX) XXX-XXXX" />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required placeholder="********" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Повторите пароль</Form.Label>
                                <Form.Control type="password" required placeholder="********" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" className='mb-2' required label="Соглашаюсь с политикой конфиденциальности" />
                                <span className='linkReg' onClick={props.toggleForm}>
                                    Уже зарегистрированы?
                                </span>
                            </Form.Group>
                            <Button variant="dark" onClick={handleRegister} type="submit">
                                Зарегестрироваться
                            </Button>
                        </Form>
                    </Col>
                </Col >
            </Row>
        </>
    )
}
