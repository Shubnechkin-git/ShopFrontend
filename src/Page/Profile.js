import React, { useState, useEffect } from 'react';
import RegistrationForm from '../Components/RegistrationForm';
import LoginForm from '../Components/LoginForm';
import UserProfile from '../Components/UserProfile';
import axios from 'axios';

export default function Profile(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isCheckingSession, setCheckingSession] = useState(true);
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const handleLogout = async (props) => {
        try {
            // Отправка запроса на выход
            const response = await axios.post('/logout');

            if (response.data.success) {
                // Успешный выход, перезагрузка страницы
                // window.location.reload();
                checkSession();
                setLoggedIn(false);
                setUserInfo(null);
                setLoginFormVisible(true);
            } else {
                console.error('Ошибка при выходе');
            }
        } catch (error) {
            console.error('Ошибка при выходе', error);
        }
    };

    const checkSession = async () => {
        try {
            const response = await axios.get('/checkSession');
            if (response.data.success) {
                const userResponse = await axios.post('/user');
                setUserInfo(userResponse.data.user);
                setLoggedIn(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCheckingSession(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const toggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <>
            <title>Профиль</title>
            <div>
                {isCheckingSession ? (
                    // Пока выполняется проверка сессии, ничего не отображаем
                    null
                ) : isLoggedIn ? (
                    userInfo ? (
                        <UserProfile
                            setLoggedIn={setLoggedIn}
                            colors={props.colors}
                            userInfo={userInfo}
                            handleLogout={handleLogout}
                        />
                    ) : (
                        // Если userInfo === null, можно отобразить заглушку или что-то еще
                        <div>Loading...</div>
                    )
                ) : isLoginFormVisible ? (
                    <LoginForm
                        setLoggedIn={setLoggedIn}
                        toggleForm={toggleForm}
                        checkSession={checkSession}
                    />
                ) : (
                    <RegistrationForm
                        setLoggedIn={setLoggedIn}
                        checkSession={checkSession}
                        toggleForm={toggleForm}
                    />
                )}
            </div>
        </>
    );
}
