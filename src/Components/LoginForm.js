// import React, { useState } from 'react'
// import axios from 'axios'
// import { Form, Button, Row, Col } from 'react-bootstrap';

// export default function LoginForm(props) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [enterAllInputError, setEnterAllInputError] = useState('');
//     const [usernameError, setUsernameError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     const handleLogin = () => {
//         setError('');
//         setEnterAllInputError('');
//         setUsernameError('');
//         setPasswordError('');

//         if (!username || !password) {
//             setEnterAllInputError('Заполните все поля!');
//             return;
//         }


//         axios.post('http://localhost:3000/login', { username, password })
//             .then(response => {
//                 console.log(response);
//                 // Дополнительная логика при успешной авторизации
//             })
//             .catch(error => {
//                 console.error(error.response);
//                 if (error.response && error.response.data && error.response.data.error) {
//                     setError(error.response.data.error);
//                 } else {
//                     setError('Произошла ошибка при авторизации');
//                 }
//             });

//     };


//     return (
//         <>
//             <h1 className='text-center'>Авторизация</h1>
//             <Row>
//                 <Col className='col-12 d-flex justify-content-center'>
//                     <Col className='col-9 col-sm-9 col-md-8 col-lg-6'>
//                         <div className='text-center'>
//                             {enterAllInputError && <span className="fs-1 text-danger">{enterAllInputError}</span>}
//                             {error && <span className="fs-1 text-danger">{error}</span>}
//                         </div>
//                         <Form className='d-flex flex-column'>
//                             <Form.Group className="mb-3" controlId="formBasicUsername">
//                                 <Form.Label>Имя пользователя</Form.Label>
//                                 <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Ivan" />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicPassword1">
//                                 <Form.Label>Пароль</Form.Label>
//                                 <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required placeholder="********" />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" className='mb-2' label="Запомнить меня" />
//                                 <span className='linkReg' onClick={props.toggleForm}>
//                                     Ещё не зарегистрированы?
//                                 </span>
//                             </Form.Group>
//                             <Button variant="dark" type="button" onClick={handleLogin}>
//                                 Войти
//                             </Button>
//                         </Form>
//                     </Col>
//                 </Col >
//             </Row>
//         </>
//     )
// }

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [enterAllInputError, setEnterAllInputError] = useState('');

    const handleLogin = async () => {
        setError('');
        setEnterAllInputError('');

        if (!username || !password) {
            setEnterAllInputError('Заполните все поля!');
            return;
        }

        try {
            // Отправляем запрос на сервер для авторизации
            const response = await axios.post('/login', { username, password });

            if (response.data.success) {
                // Успешная авторизация, устанавливаем isLoggedIn в true
                props.setLoggedIn(true);

                // Скрываем форму входа
                props.toggleForm();
            }
        } catch (error) {
            // Обработка ошибок при авторизации
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Произошла ошибка при авторизации');
            }
        }
        props.checkSession();
    };

    return (
        <>
            <h1 className='text-center'>Авторизация</h1>
            <Row>
                <Col className='col-12 d-flex justify-content-center'>
                    <Col className='col-9 col-sm-9 col-md-8 col-lg-6'>
                        <div className='text-center'>
                            {enterAllInputError && <span className="fs-1 text-danger">{enterAllInputError}</span>}
                            {error && <span className="fs-1 text-danger">{error}</span>}
                        </div>
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
                            <Button variant="dark" type="button" onClick={handleLogin}>
                                Войти
                            </Button>
                        </Form>
                    </Col>
                </Col >
            </Row>
        </>
    );
}
