import React from 'react'
import Search from '../Components/Search'
import Items from '../Components/Items'
import "../styles/home.css"

export default function Home() {
    return (
        <>
            <title>Главная</title>
            <div>Home</div>
            <Search />
            <Items />
        </>
    )
}
