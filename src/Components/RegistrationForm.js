import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import MaskedInput from 'react-input-mask';

export default function RegistrationForm(props) {
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [enterAllInputError, setEnterAllInputError] = useState('');
    const [userExistError, setUserExistError] = useState('');
    const [privacyPolicyError, setPrivacyPolicyError] = useState('');

    const handleRegister = () => {
        // Ваша логика валидации
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setPhoneError('');
        setEmailError('');
        setEnterAllInputError('');
        setUserExistError('');
        setPrivacyPolicyError('');

        // Пример простой проверки, замените на вашу логику
        if (!username || !mail || !password || !number) {
            setEnterAllInputError('Заполните все поля');
            return;
        }
        if (username.length < 4) {
            setUsernameError('Имя пользователя должно содержать как минимум 4 символа.');
            return;
        }

        // Проверка, что пароль совпадает с подтверждением пароля
        if (password !== confirmPassword) {
            setConfirmPasswordError('Пароль и подтверждение пароля не совпадают.');
            return;
        }

        // Проверка, что номер телефона соответствует ожидаемому формату
        const phoneRegex = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/;
        if (!phoneRegex.test(number)) {
            setPhoneError('Некорректный формат номера телефона.');
            return;
        }

        // Пример валидации пароля
        if (password.length < 8) {
            setPasswordError('Пароль должен содержать как минимум 8 символов.');
            return;
        }

        // Пример валидации электронной почты
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            setEmailError('Некорректный адрес электронной почты.');
            return;
        }

        if (!privacyPolicyChecked) {
            setPrivacyPolicyError('Подтвердите согласие с политикой конфиденциальности');
            return;
        }

        // Проверка наличия пользователя в базе данных
        axios.post('/checkUser', { username, mail, number })
            .then(response => {
                if (response.data.exists) {
                    setUserExistError('Такой пользователь уже существует');
                    console.log(response.data);

                } else {
                    // Если пользователя нет, отправляем данные на сервер для регистрации
                    axios.post('/register', { username, mail, number, password })
                        .then(response => {
                            console.log(response);
                            // Дополнительная логика при успешной регистрации
                            props.checkSession();
                            props.setLoggedIn(true);
                        })
                        .catch(error => {
                            console.error(error.response);
                            // Обработка ошибок
                        });
                }
            })
            .catch(error => {
                console.error(error.response);
                // Обработка ошибок при проверке наличия пользователя
            });
    };

    return (
        <>
            <h1 className='text-center'>Регистрация</h1>
            <Row>
                <Col className='col-12 d-flex justify-content-center'>
                    <Col className='col-9 col-sm-9 col-md-8 col-lg-6'>
                        <div className='text-center'>
                            {enterAllInputError && <span className="fs-1 text-danger">{enterAllInputError}</span>}
                            {userExistError && <span className="fs-1 text-danger">{userExistError}</span>}
                        </div>
                        <Form className='d-flex flex-column'>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setUsernameError('')}
                                    required
                                    placeholder="Ivan"
                                />
                                {usernameError && <span className="text-danger">{usernameError}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={(e) => setMail(e.target.value)}
                                    onFocus={() => setEmailError('')}
                                    required
                                    placeholder="example@mail.com"
                                />
                                {emailError && <span className="text-danger">{emailError}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Номер телефона</Form.Label>
                                <MaskedInput
                                    mask="+7 (999) 999-9999"
                                    autocomplete="tel"
                                    placeholder="+7 (XXX) XXX-XXXX"
                                    onChange={(e) => setNumber(e.target.value)}
                                    onFocus={() => setPhoneError('')}
                                    className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                                />
                                {phoneError && <span className="text-danger">{phoneError}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordError('')}
                                    required
                                    autoComplete="new-password"
                                    placeholder="********"
                                />
                                {passwordError && <span className="text-danger">{passwordError}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Подтвердите пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setConfirmPasswordError('')}
                                    autoComplete='new-password'
                                    required
                                    placeholder="********"
                                />
                                {confirmPasswordError && <span className="text-danger">{confirmPasswordError}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    className='mb-2'
                                    required
                                    label="Соглашаюсь с политикой конфиденциальности"
                                    onChange={() => {
                                        setPrivacyPolicyChecked(!privacyPolicyChecked);
                                        setPrivacyPolicyError('');
                                    }}
                                />
                                {privacyPolicyError && <p className="text-danger">{privacyPolicyError}</p>}
                                <span className='linkReg' onClick={props.toggleForm}>
                                    Уже зарегистрированы?
                                </span>
                            </Form.Group>
                            <Button variant="dark" onClick={handleRegister} type="button">
                                Зарегистрироваться
                            </Button>
                        </Form>
                    </Col>
                </Col >
            </Row >
        </>
    );
}
