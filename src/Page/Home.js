import React from 'react'
import Items from '../Components/Items'
import "../styles/home.css"
import axios from 'axios'

export default function Home() {

    return (
        <div id='home'>
            <title>Главная</title>
            <Items />
        </div>
    )
}
