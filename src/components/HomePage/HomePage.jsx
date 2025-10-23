//src/components/HomePage/HomePage.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import { CardRow } from '../Card/Card'
import './HomePage.css'

import iconHeart from '../../assets/icon-heart.svg'
import iconDoc from '../../assets/icon-doc.svg'
import iconTable from '../../assets/icon-table.svg'

const cardsDesktop = [
    { title: 'Онлайн-прием', text: 'Рыба текст', icon: iconHeart },
    { title: 'Экстренный Случай', text: 'Рыба текст', icon: iconDoc },
    { title: 'Лечение рака', text: 'Рыба текст', icon: iconTable }
]

const cardsMobile = [
    { title: 'Лечение рака', text: 'Рыба текст', icon: iconTable },
    { title: 'Онлайн-прием', text: 'Рыба текст', icon: iconHeart },
    { title: 'Экстренный Случай', text: 'Рыба текст', icon: iconDoc }
]

export default function Home({ openLogin }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 800)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const currentCards = isMobile ? cardsMobile : cardsDesktop

    return (
        <div className="home">
            <div className="home-container">
                <div className="home-header">
                    <h1 className="home-title">
                        Место для получения<br/>медицинской помощи
                    </h1>

                    <div className="home-actions">
                        <button className="button-primary" onClick={openLogin}>Войти</button>
                        <Link to="/contacts" className="button-secondary">Контакты</Link>
                    </div>
                </div>

                <div className="card-row">
                    {currentCards.map((c, i) => (
                        <Card key={i} title={c.title} text={c.text} icon={c.icon}/>
                    ))}
                </div>
            </div>
        </div>
    )
}