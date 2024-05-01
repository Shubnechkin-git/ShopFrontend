// UserProfile.js
import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Button, Accordion } from 'react-bootstrap';
import '../styles/profile.css';

import axios from 'axios'

export default function UserProfile(props) {
    const { userInfo } = props;
    const [delValue, setDelValue] = useState(null);
    const [newPriceValue, setNewPriceValue] = useState(null);
    const [editPriceValue, setEditPriceValue] = useState(null);
    const [editIdValue, setEditIdValue] = useState(null);
    const [editAvilable, setEditAvilable] = useState(null);
    const [newAvilable, setNewAvilable] = useState(null);

    const rgbToHex = (rgb) => {
        const match = rgb.match(/\d+/g);
        if (match.length === 3) {
            const [r, g, b] = match;
            return `#${((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1)}`;
        }
        return '#ffffff';
    }

    const [colorNavbar, setColorNavbar] = useState(rgbToHex(document.getElementsByTagName('header')[0].style.backgroundColor));
    const [colorBackground, setColorBackground] = useState(rgbToHex(document.getElementsByTagName('body')[0].style.backgroundColor));
    const [colorFooter, setColorFooter] = useState(rgbToHex(document.getElementsByClassName('footer')[0].firstChild.style.backgroundColor));
    const [colorText, setColorText] = useState(rgbToHex(document.getElementsByTagName('body')[0].style.color));


    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchData = () => {
        if (userInfo.isAdmin) {
            axios.get('/get_all_products').then(response => {
                console.log(response);
                if (response.data.success)
                    setProducts(response.data.data);
            }).catch(error => { console.log(error); });
            axios.get('/orders').then(response => {
                console.log(response);
                if (response.data.success)
                    setOrders(response.data.data);
            }).catch(error => { console.log(error); });
        }

    }

    useEffect(() => {
        // Загрузка данных при монтировании
        fetchData();

        // // Периодический опрос сервера каждые 5 секунд
        // const intervalId = setInterval(fetchData, 5000);

        // // Очистка интервала при размонтировании компонента
        // return () => clearInterval(intervalId);
    }, []);

    const [selectedForm, setForm] = useState(4);

    if (!userInfo) {
        return null; // или отобразите заглушку
    }

    // if (userInfo.isAdmin) {
    //     axios.get('/getColor').then((response) => {
    //         console.log(response);
    //         setColorText(1);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }


    const inputDelValue = (e) => {
        if (e.target.value > 0) {
            setDelValue(e.target.value);
        }
        else setDelValue(1)
    }

    const handleNewPrice = (e) => {
        if (e.target.value > 0)
            setNewPriceValue(e.target.value);
        else setNewPriceValue(1)
    }

    const handleEditPrice = (e) => {
        if (e.target.value > 0)
            setEditPriceValue(e.target.value);
        else setEditPriceValue(1)
    }

    const handleEditId = (e) => {
        if (e.target.value > 0)
            setEditIdValue(e.target.value);
        else setEditIdValue(1)
    }

    const handleEditAvilable = (e) => {
        if (e.target.value > 0)
            setEditAvilable(e.target.value);
        else setEditAvilable(1)
    }

    const handleNewAvilable = (e) => {
        if (e.target.value > 0)
            setNewAvilable(e.target.value);
        else setNewAvilable(1)
    }

    const handleDelete = () => {
        console.log(delValue);
    }

    const changeColor = (k) => {
        switch (k) {
            case 1:
                axios.post('/updateColor', { section: 'navbar', color: colorNavbar })
                    .then(response => {
                        document.getElementsByTagName('header')[0].style.backgroundColor = colorNavbar;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 2:
                axios.post('/updateColor', { section: 'background', color: colorBackground })
                    .then(response => {
                        document.getElementsByTagName('body')[0].style.backgroundColor = colorBackground;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 3:
                axios.post('/updateColor', { section: 'footer', color: colorFooter })
                    .then(response => {
                        document.getElementsByClassName('footer')[0].firstChild.style.backgroundColor = colorFooter;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 4:
                axios.post('/updateColor', { section: 'text_color', color: colorText })
                    .then(response => {
                        document.getElementsByTagName('body')[0].style.color = colorText;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
        }
    }

    return (
        <>
            <div className="user-profile">
                <Row className="justify-content-center row-gap-3">
                    <Col md={4}>
                        <h2> Профиль пользователя</h2>
                        <Card className="text-center">
                            <Card.Header>
                                <Card.Img variant="top" src="https://yt3.googleusercontent.com/ytc/AOPolaShhy6N3HJYzxeMCeiVGh1smHOlqcWa-PHNKxYT5w=s900-c-k-c0x00ffffff-no-rj" />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{userInfo.username}</Card.Title>
                                <Card.Text className='d-flex flex-column'>
                                    <span>Email: {userInfo.mail}</span>
                                    <span>Номер телефона: {userInfo.number}</span>
                                </Card.Text>
                                <Card.Footer><Button className='w-100 btn-danger' onClick={props.handleLogout}>Выйти</Button></Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    {userInfo.isAdmin ? (
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-8'>
                            <h2>Таблицы</h2>
                            <Accordion alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Все товары
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">id</th>
                                                    <th scope="col">Название</th>
                                                    <th scope="col">Цена</th>
                                                    <th scope="col">Изображение</th>
                                                    <th scope="col">В наличие</th>
                                                    <th scope="col">Таблица</th>
                                                </tr>
                                            </thead>
                                            {Array.isArray(products) && products.length > 0 ? (
                                                <tbody>
                                                    {products.map((item, index) => (
                                                        <>
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td scope="row">{item.id}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.price}</td>
                                                                <td>
                                                                    <input className='form-control' disabled value={item.img}></input>
                                                                </td>
                                                                <td>{item.available}</td>
                                                                <td>{item.table_name}</td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            ) : (
                                                <span>Loading...</span>
                                            )}
                                        </table>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Заказы</Accordion.Header>
                                    <Accordion.Body>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">id</th>
                                                    <th scope="col">user_id</th>
                                                    <th scope="col">product_id</th>
                                                    <th scope="col">Кол-во</th>
                                                    <th scope="col">Сумма</th>
                                                    <th scope="col">Таблица</th>
                                                </tr>
                                            </thead>
                                            {Array.isArray(orders) && orders.length > 0 ? (
                                                <tbody>
                                                    {orders.map((item, index) => (
                                                        <>
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td scope="row">{item.id}</td>
                                                                <td>{item.user_id}</td>
                                                                <td>{item.product_id}</td>
                                                                <td>{item.count}</td>
                                                                <td>{item.total_price}</td>
                                                                <td>{item.table_name}</td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            ) : (
                                                <span>Loading...</span>
                                            )}
                                        </table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Row>
                                <Col className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                                    {selectedForm == 1 ? (
                                        <Col>
                                            <h3>Добавить товар</h3>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect01">Действие</label>
                                                <select className="form-select" onChange={e => setForm(e.target.value)} value={selectedForm} id="inputGroupSelect01">
                                                    <option value="1">Добавить</option>
                                                    <option value="2">Редактировать</option>
                                                    <option value="3">Удалить</option>
                                                </select>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">Название</label>
                                                <input type="text" className="form-control" placeholder="Кроссовки" aria-label="Recipient's username" />
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">Цена за шт.</label>
                                                <input type="number" onChange={(e) => { handleNewPrice(e) }} className="form-control" placeholder="2000" value={newPriceValue} aria-label="Recipient's username" />
                                                <label className="input-group-text">₽</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">В наличие</label>
                                                <input type="number" onChange={(e) => { handleNewAvilable(e) }} className="form-control" placeholder="100" value={newAvilable} aria-label="Recipient's username" />
                                                <label className="input-group-text">шт.</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">Изображение</label>
                                                <input type="text" className="form-control" placeholder="https://mamcupy.com/upload/resize_cache/iblock/b19/600_600_240cd750bba9870f18aada2478b24840a/b1917d53ca3c5981d3daeadb91e1b12d.jpg" />
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect03">Таблица</label>
                                                <select className="form-select" id="inputGroupSelect03">
                                                    <option>discounts</option>
                                                    <option value="1">items</option>
                                                    <option value="2">novelty</option>
                                                    <option value="3">products</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-outline-success w-100" type="button" id="button-add">Добавить</button>
                                        </Col>
                                    ) : selectedForm == 2 ? (
                                        <Col>
                                            <h3>Редактировать товар</h3>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect04">Действие</label>
                                                <select className="form-select" onChange={e => setForm(e.target.value)} value={selectedForm} id="inputGroupSelect04">
                                                    <option value="1">Добавить</option>
                                                    <option value="2">Редактировать</option>
                                                    <option value="3">Удалить</option>
                                                </select>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">ID</label>
                                                <input type="text" className="form-control" onChange={(e) => handleEditId(e)} value={editIdValue} placeholder="1" aria-label="Recipient's username" />
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">Название</label>
                                                <input type="text" className="form-control" placeholder="Кроссовки" aria-label="Recipient's username" />
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">Цена за шт.</label>
                                                <input type="number" className="form-control" onChange={(e) => { handleEditPrice(e) }} value={editPriceValue} placeholder="2000" aria-label="Recipient's username2" />
                                                <label className="input-group-text">₽</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">В наличие</label>
                                                <input type="number" className="form-control" onChange={(e) => { handleEditAvilable(e) }} value={editAvilable} placeholder="100" aria-label="Recipient's username2" />
                                                <label className="input-group-text">шт.</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">Изображение</label>
                                                <input type="text" className="form-control" placeholder="https://mamcupy.com/upload/resize_cache/iblock/b19/600_600_240cd750bba9870f18aada2478b24840a/b1917d53ca3c5981d3daeadb91e1b12d.jpg" />
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect02">Таблица</label>
                                                <select className="form-select" id="inputGroupSelect02">
                                                    <option>discounts</option>
                                                    <option value="1">items</option>
                                                    <option value="2">novelty</option>
                                                    <option value="3">products</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-outline-success w-100" type="button" id="button-add">Изменить</button>
                                        </Col>
                                    ) : selectedForm == 3 ? (
                                        <Col>
                                            <h3>Удалить товар</h3>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect01">Действие</label>
                                                <select className="form-select" onChange={e => setForm(e.target.value)} value={selectedForm} id="inputGroupSelect01">
                                                    <option value="1">Добавить</option>
                                                    <option value="2">Редактировать</option>
                                                    <option value="3">Удалить</option>
                                                </select>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text">ID</label>
                                                <input type="number" className="form-control" onChange={inputDelValue} value={delValue} placeholder="1" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <button className="btn btn-outline-danger" onClick={handleDelete} type="button" id="button-del">Удалить</button>
                                            </div>
                                        </Col>
                                    ) :
                                        (<Col>
                                            <h3>Выбор действия</h3>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect01">Действие</label>
                                                <select className="form-select" onChange={e => setForm(e.target.value)} value={selectedForm} id="inputGroupSelect01">
                                                    <option value="1">Добавить</option>
                                                    <option value="2">Редактировать</option>
                                                    <option value="3">Удалить</option>
                                                    <option value="4">Выбрать...</option>
                                                </select>
                                            </div>
                                        </Col>
                                        )}
                                </Col>
                                <Col className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6  mt-3'>
                                    <h3>Редактор сайта</h3>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="exampleColorInput">Navbar</label>
                                        <input type="color" onChange={e => setColorNavbar(e.target.value)} value={colorNavbar} className="form-control form-control-color" id="exampleColorInput" ></input>
                                        <button className="btn btn-outline-success" onClick={() => changeColor(1)} type="button">Изменить цвет</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="exampleColorInput">Background</label>
                                        <input type="color" onChange={e => setColorBackground(e.target.value)} value={colorBackground} className="form-control form-control-color" id="exampleColorInput" ></input>
                                        <button className="btn btn-outline-success" onClick={() => changeColor(2)} type="button">Изменить цвет</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="exampleColorInput">Footer</label>
                                        <input type="color" onChange={e => setColorFooter(e.target.value)} value={colorFooter} className="form-control form-control-color" id="exampleColorInput" ></input>
                                        <button className="btn btn-outline-success" onClick={() => changeColor(3)} type="button">Изменить цвет</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="exampleColorInput">Text Color</label>
                                        <input type="color" onChange={e => setColorText(e.target.value)} value={colorText} className="form-control form-control-color" id="exampleColorInput" ></input>
                                        <button className="btn btn-outline-success" onClick={() => changeColor(4)} type="button">Изменить цвет</button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    ) : (
                        <>

                        </>
                    )}
                </Row>
            </div >
        </>
    );
};

