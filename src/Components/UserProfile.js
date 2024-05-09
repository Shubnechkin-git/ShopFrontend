// UserProfile.js
import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Card, Button, Accordion, ToastContainer, Toast, ButtonGroup, Spinner } from 'react-bootstrap';
import '../styles/profile.css';

import axios from 'axios'

export default function UserProfile(props) {
    const { userInfo } = props;
    const [delValue, setDelValue] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newPriceValue, setNewPriceValue] = useState(null);
    const [newAvilable, setNewAvilable] = useState(null);

    const [delError, setDelError] = useState(null);

    const [editPriceValue, setEditPriceValue] = useState(null);
    const [editIdValue, setEditIdValue] = useState(null);
    const [editAvilable, setEditAvilable] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editImage, setEditImage] = useState(null);

    const [editIdValueError, setEditIdValueError] = useState('');
    const [editAvilableError, setEditAvilableError] = useState('');
    const [editPriceError, setEditPriceError] = useState('');
    const [editTitleError, setEditTitleError] = useState('');
    const [editImageError, setEditImageError] = useState('');
    const [editImageBase64, setEditImageBase64] = useState(null);
    const fileEditInputRef = useRef(null);


    const [table, setTable] = useState('discounts');
    const [editTable, setEditTable] = useState('discounts');
    const [delTable, setDelTable] = useState('discounts');

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const [imageError, setImageError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [newAvilableError, setNewAvilableError] = useState('');
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    const fileInputRef = useRef(null);
    const userIamge = useRef(null);

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

    const handleImageChange = (event, k) => {
        const file = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (file !== undefined) {
            if (!allowedTypes.includes(file.type)) {
                if (k === 1) {
                    setImageError('Пожалуйста, выберите изображение');
                } else if (k === 2) {
                    setEditImageError('Пожалуйста, выберите изображение');
                }
                return;
            }
            if (k === 1) {
                setImageError('');
                setImage(file);
            } else if (k === 2) {
                setEditImage(file);
                setEditImageError('');
            }

            console.log(file);

            // Дальнейшая обработка файла
            const reader = new FileReader();
            reader.onload = () => {
                if (k === 1) {
                    setImageBase64(reader.result);
                } else if (k === 2) {
                    setEditImageBase64(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
        else return;
    }

    const handleCreate = () => {
        // Сброс значения поля ввода файла

        let error = false;

        if (newTitle.length < 6) {
            setTitleError(true);
            error = true;
        } else setTitleError(false);

        if (newPriceValue == null) {
            setPriceError(true);
            error = true;
        } else setPriceError(false);

        if (newAvilable == null) {
            setNewAvilableError(true);
            error = true;
        } else setNewAvilableError(false);

        if (image == null) {
            setImageError(true);
            setImageBase64(null);
            error = true;
        }

        if (!error) {
            axios.post('/add_product', { newTitle, newPriceValue, newAvilable, imageBase64, table }).then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setShow(true);
                    fetchData();
                    setMessage(response.data.message);
                }
            }).catch(error => {
                console.log(error.response.data);
                setShow(true);
                setMessage(error.response.data.message);
            });
        }
    }

    const handleChange = () => {
        let error = false;

        if (editIdValue == null) {
            setEditIdValueError(true);
            error = true;
        } else setEditIdValueError(false);

        if (editTitle.length < 6) {
            setEditTitleError(true);
            error = true;
        } else setEditTitleError(false);

        if (editPriceValue == null) {
            setEditPriceError(true);
            error = true;
        } else setEditPriceError(false);

        if (editAvilable == null) {
            setEditAvilableError(true);
            error = true;
        } else setEditAvilableError(false);

        if (editImage == null) {
            setEditImageError(true);
            setEditImageBase64(null);
            error = true;
        } else setEditImageError(false);

        if (!error) {
            axios.put('/edit_product', { id: editIdValue, title: editTitle, price: editPriceValue, available: editAvilable, img: editImageBase64, table: editTable }).then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setShow(true);
                    fetchData();
                    setMessage(response.data.message);
                }
            }).catch(error => {
                console.log(error.response.data);
                setShow(true);
                setMessage(error.response.data.message);
            });
        }

    }

    const handleDelete = (e) => {
        if (delValue == null) {
            setDelError(true);
        } else {
            setDelError(false);
            axios.delete('/del_product', { params: { id: delValue, table: delTable } }).then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setShow(true);
                    fetchData();
                    setMessage(response.data.message);
                }
            }).catch(error => {
                console.log(error.response.data);
                setShow(true);
                setMessage(error.response.data.message);
            });
        }
    }

    const handleApprove = (e) => {
        axios.put('change_status', { cart_id: e.target.id, status: 'completed', product_id: e.target.getAttribute('product_id'), table: e.target.getAttribute('table-name'), count: e.target.getAttribute('count') }).then(response => {
            console.log(response);
            if (response.data.success === true) {
                setShow(true);
                axios.post('send_email', { email: e.target.getAttribute('data-mail'), type: 'completed' })
                fetchData();
                setMessage(response.data.message);
            }
        }).catch(error => {
            setShow(true);
            setMessage(error.response.data.message);
            console.log(error);
        });
    }

    const handleRejected = (e) => {
        axios.put('change_status', { cart_id: e.target.id, status: 'rejected' }).then(response => {
            console.log(response);
            if (response.data.success === true) {
                setShow(true);
                fetchData();
                axios.post('send_email', { email: e.target.getAttribute('data-mail'), type: 'rejected' })
                setMessage(response.data.message);
            }
        }).catch(error => {
            setShow(true);
            setMessage(error.response.data.message);
            console.log(error);
        });
    }

    return (
        <>
            <div className="user-profile">
                <Row className="justify-content-center row-gap-3">
                    <Col md={4}>
                        <h2> Профиль пользователя</h2>
                        <Card className="text-center">
                            <Card.Header>
                                <Card.Img variant="top" ref={userIamge} src="https://yt3.googleusercontent.com/ytc/AOPolaShhy6N3HJYzxeMCeiVGh1smHOlqcWa-PHNKxYT5w=s900-c-k-c0x00ffffff-no-rj" />
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
                                                                    <img className='img-fluid' style={{ height: 100, width: 100 }} src={item.img}></img>
                                                                </td>
                                                                <td>{item.available}</td>
                                                                <td>{item.table_name}</td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            ) : (Array.isArray(products) && products.length == 0 ? (
                                                <span>Нет заказов</span>
                                            ) : (
                                                <span>Loading...</span>
                                            )
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
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Number</th>
                                                    <th scope="col">ID Товара</th>
                                                    <th scope="col">Таблица</th>
                                                    <th scope="col">Кол-во</th>
                                                    <th scope="col">Сумма</th>
                                                    <th scope="col">Действие</th>
                                                </tr>
                                            </thead>
                                            {Array.isArray(orders) && orders.length > 0 ? (
                                                <tbody>
                                                    {orders.map((item, index) => (
                                                        <>
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{item.mail}</td>
                                                                <td>{item.number}</td>
                                                                <td>{item.product_id}</td>
                                                                <td>{item.table_name}</td>
                                                                <td>{item.count}</td>
                                                                <td>{item.total_price}</td>
                                                                <td><ButtonGroup><Button className='btn btn-success' count={item.count} product_id={item.product_id} id={item.id} table-name={item.table_name} data-mail={item.mail} onClick={e => handleApprove(e)}>Подтвердить</Button><Button className='btn btn-danger' id={item.id} data-mail={item.mail} onClick={e => handleRejected(e)}>Отклонить</Button></ButtonGroup></td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            ) : (Array.isArray(orders) && orders.length == 0 ? (
                                                <span>Заказов нет</span>
                                            ) : (
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            )
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
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">Название</label>
                                                    <input type="text" onChange={e => setNewTitle(e.target.value)} value={newTitle} className="form-control" placeholder="Кроссовки" aria-label="Recipient's username" />
                                                </div>
                                                <small className="text-danger mt-2">{titleError && 'Пожалуйста, введите название не менее 6-ти символов'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">Цена за шт.</label>
                                                    <input type="number" onChange={(e) => { handleNewPrice(e) }} className="form-control" placeholder="2000" value={newPriceValue} aria-label="Recipient's username" />
                                                    <label className="input-group-text">₽</label>
                                                </div>
                                                <small className="text-danger mt-2">{priceError && 'Пожалуйста, введите цену'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">В наличие</label>
                                                    <input type="number" onChange={(e) => { handleNewAvilable(e) }} className="form-control" placeholder="100" value={newAvilable} aria-label="Recipient's username" />
                                                    <label className="input-group-text">шт.</label>
                                                </div>
                                                <small className="text-danger mt-2">{newAvilableError && 'Пожалуйста, введите количесвто товара'}</small>
                                            </div>
                                            <div className="input-group mb-3 d-flex flex-column">
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">Изображение</label>
                                                    <input type="file" className="form-control" ref={fileInputRef} accept="image/*" placeholder="" onChange={e => handleImageChange(e, 1)} />
                                                </div>
                                                <small className="text-danger mt-2">{imageError && 'Пожалуйста, выберите изображение'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect03">Таблица</label>
                                                <select className="form-select" onChange={e => { setTable(e.target.value) }} value={table} id="inputGroupSelect03">
                                                    <option value="discounts">discounts</option>
                                                    <option value="items">items</option>
                                                    <option value="novelty">novelty</option>
                                                    <option value="products">products</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-outline-success w-100" type="button" onClick={handleCreate} id="button-add">Добавить</button>
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
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">ID</label>
                                                    <input type="text" className="form-control" onChange={(e) => handleEditId(e)} value={editIdValue} placeholder="1" aria-label="Recipient's username" />
                                                </div>
                                                <small className="text-danger mt-2">{editIdValueError && 'Пожалуйста, введите ID товара больше 0'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">Название</label>
                                                    <input type="text" className="form-control" placeholder="Кроссовки" onChange={e => setEditTitle(e.target.value)} value={editTitle} aria-label="Recipient's username" />
                                                </div>
                                                <small className="text-danger mt-2">{editTitleError && 'Пожалуйста, введите название не менее 6-ти символов'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">Цена за шт.</label>
                                                    <input type="number" className="form-control" onChange={(e) => { handleEditPrice(e) }} value={editPriceValue} placeholder="2000" aria-label="Recipient's username2" />
                                                    <label className="input-group-text">₽</label>
                                                </div>
                                                <small className="text-danger mt-2">{editPriceError && 'Пожалуйста, введите цену'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">В наличие</label>
                                                    <input type="number" className="form-control" onChange={(e) => { handleEditAvilable(e) }} value={editAvilable} placeholder="100" aria-label="Recipient's username2" />
                                                    <label className="input-group-text">шт.</label>
                                                </div>
                                                <small className="text-danger mt-2">{editAvilableError && 'Пожалуйста, введите количесвто товара'}</small>
                                            </div>
                                            <div className="input-group mb-3 d-flex flex-column">
                                                <div className='d-flex'>
                                                    <label className="input-group-text">Изображение</label>
                                                    <input type="file" className="form-control" ref={fileEditInputRef} accept="image/*" placeholder="" onChange={(e) => handleImageChange(e, 2)} />
                                                </div>
                                                <small className="text-danger mt-2">{editImageError && 'Пожалуйста, выберите изображение'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect02">Таблица</label>
                                                <select className="form-select" onChange={e => { setEditTable(e.target.value) }} value={editTable} id="inputGroupSelect03">
                                                    <option value="discounts">discounts</option>
                                                    <option value="items">items</option>
                                                    <option value="novelty">novelty</option>
                                                    <option value="products">products</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-outline-success w-100" type="button" onClick={handleChange} id="button-add">Изменить</button>
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
                                                <div className='d-flex w-100'>
                                                    <label className="input-group-text">ID</label>
                                                    <input type="number" className="form-control" onChange={inputDelValue} value={delValue} placeholder="1" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                    <button className="btn btn-outline-danger" onClick={handleDelete} type="button" id="button-del">Удалить</button>
                                                </div>
                                                <small className="text-danger mt-2">{delError && 'Пожалуйста, введите ID товара больше 0'}</small>
                                            </div>
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" htmlFor="inputGroupSelect03">Таблица</label>
                                                <select className="form-select" onChange={e => { setDelTable(e.target.value) }} value={delTable} id="inputGroupSelect03">
                                                    <option value="discounts">discounts</option>
                                                    <option value="items">items</option>
                                                    <option value="novelty">novelty</option>
                                                    <option value="products">products</option>
                                                </select>
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
                <ToastContainer className='position-fixed mb-2 me-2' position="bottom-end">
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} bg={message === 'Продукт успешно обновлен!' || message === 'Продукт успешно добавлен!' || message === 'Заказ подтвержден!' ? 'success' : 'danger'} autohide>
                        <Toast.Header>
                            <div className="header__logo me-2"><svg width="15" height="15" viewBox="0 0 63 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.1279 21.8721L17.6768 22.918V14.2021L12.6963 14.6006V44.4834L17.6768 44.085V40.3496L15.1865 40.5488V28.0977L30.1279 26.8525V55.4902L0.245117 57.9805V3.19531L30.1279 0.705078V21.8721Z" fill="black"></path><path d="M45.0693 44.4834L50.0498 44.085V35.3691L45.0693 35.7676V44.4834ZM50.0498 14.2021L45.0693 14.6006V23.3164L50.0498 22.918V14.2021ZM62.501 31.833V55.4902L32.6182 57.9805V3.19531L62.501 0.705078V24.3623L58.7656 28.0977L62.501 31.833Z" fill="black"></path></svg></div>
                            <strong className="me-auto ">GenaBooker</strong>
                            <small>Только что</small>
                        </Toast.Header>
                        <Toast.Body className='text-white'>{message}</Toast.Body>
                    </Toast>
                </ToastContainer >
            </div >
        </>
    );
};

