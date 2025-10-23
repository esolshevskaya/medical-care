import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({ onLoginClick, authUser, onLogout }) {
    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/" className="logo">logo</Link>
                <nav className="nav">
                    <Link to="/contacts" className="nav-link">Контакты</Link>
                    <button className="button-outline" onClick={authUser ? onLogout : onLoginClick}>
                        {authUser ? "Выйти" : "Войти"}
                    </button>
                </nav>
            </div>
            <div className="header-line"></div>
        </header>
    )
}