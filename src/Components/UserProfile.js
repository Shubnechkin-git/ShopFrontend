// UserProfile.js
import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';
import '../styles/profile.css';

const UserProfile = (props) => {
    const { userInfo } = props;

    if (!userInfo) {
        return null; // или отобразите заглушку
    }

    return (
        <>
            <div className="user-profile">
                <h2>Профиль пользователя</h2>
                <Row className="justify-content-center align-items-center">
                    <Col md={4} className="text-center">
                        <Card>
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
                </Row>
            </div>
        </>
    );
};

export default UserProfile;
