import React, { useState } from 'react';
import RegistrationForm from '../Components/RegistrationForm'
import LoginForm from '../Components/LoginForm'
import '../styles/profile.css'

export default function Profile() {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const toggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };
    return (
        <>
            <div>Profile</div>
            <div>
                {isLoginFormVisible ? <LoginForm toggleForm={toggleForm} /> : <RegistrationForm toggleForm={toggleForm} />}
            </div>
        </>
    )
}
