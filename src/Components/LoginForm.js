import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function LoginForm(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const hash = bcrypt.hashSync("B4c0/\/", bcrypt.genSaltSync(10));
    const handleLogin = () => {
        axios.post('http://localhost:3000/login', { username, password })
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
            <h1 className='text-center'>Авторизация</h1>
            <Row>
                <Col className='col-12 d-flex justify-content-center'>
                    <Col className='col-9 col-sm-9 col-md-8 col-lg-6'>
                        <Form className='d-flex flex-column'>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Ivan" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword1">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required placeholder="********" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" className='mb-2' label="Запомнить меня" />
                                <span className='linkReg' onClick={props.toggleForm}>
                                    Ещё не зарегистрированы?
                                </span>
                            </Form.Group>
                            <Button variant="dark" type="submit" onClick={handleLogin}>
                                Войти
                            </Button>
                        </Form>
                    </Col>
                </Col >
            </Row>
        </>
    )
}
