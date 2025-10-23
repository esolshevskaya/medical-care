import React from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

export default function Profile({ authUser, onLogout }) {
    if (!authUser) {
        return (
            <section className="profile-unauthorized-container">
                <div className="profile-unauthorized-header">
                    <div className="profile-unauthorized-content">
                        <h1 className="profile-unauthorized-title">Пользователь не авторизован</h1>
                        <p className="profile-unauthorized-text">
                            Нужно войти, чтобы попасть в личный кабинет.
                        </p>
                        <div className="profile-unauthorized-actions">
                            <Link className="profile-unauthorized-link" to="/">
                                На главную
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="profile-container">
            <div className="profile-header">
                <div className="profile-content">
                    <h1 className="profile-title">Привет, {authUser.name}</h1>
                    <div className="profile-actions">
                        <div className="profile-buttons">
                            <button className="profile-button-primary" onClick={onLogout}>
                                Выйти из аккаунта
                            </button>
                            <Link className="profile-button-secondary" to="/contacts">
                                Перейти в контакты
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}