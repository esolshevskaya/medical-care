import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Home from './components/HomePage/HomePage.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import Profile from './components/Profile/Profile.jsx'
import LoginModal from './components/Login/Login.jsx'
import users from './users.json'

export default function App() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [authUser, setAuthUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const raw = localStorage.getItem('authUser')
        if (raw) {
            try {
                setAuthUser(JSON.parse(raw))
            } catch (error) {
                localStorage.removeItem('authUser')
            }
        }
    }, [])

    function openLogin() {
        setModalOpen(true)
    }

    function closeLogin() {
        setModalOpen(false)
    }

    function logout() {
        localStorage.removeItem('authUser')
        setAuthUser(null)
        navigate('/')
    }

    async function handleLogin(credentials) {
        try {
            console.log('Login attempt:', credentials)

            const { login, password } = credentials;

            if (!login || !login.trim()) {
                return { ok: false, error: 'Логин не может быть пустым' }
            }

            if (!password) {
                return { ok: false, error: 'Пароль не может быть пустым' }
            }

            if (password.length < 8) {
                return { ok: false, error: 'Пароль должен содержать минимум 8 символов' }
            }

            await new Promise(resolve => setTimeout(resolve, 800));

            const user = users.find(u => u.login === login && u.password === password);

            if (!user) {
                return { ok: false, error: 'Неверный логин или пароль' }
            }

            const { password: _, ...userWithoutPassword } = user;

            const userData = {
                ...userWithoutPassword,
                token: `mock-jwt-token-${Date.now()}`
            }

            localStorage.setItem('authUser', JSON.stringify(userData))
            setAuthUser(userData)
            setModalOpen(false)
            navigate('/profile')
            return { ok: true }

        } catch (error) {
            console.error('Login error:', error)
            return { ok: false, error: 'Ошибка соединения. Попробуйте позже.' }
        }
    }

    return (
        <div className="app-root">
            <Header onLoginClick={openLogin} authUser={authUser} onLogout={logout} />

            <main className="container">
                <Routes>
                    <Route path="/" element={<Home openLogin={openLogin} />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/profile" element={<Profile authUser={authUser} onLogout={logout} />} />
                </Routes>
            </main>

            <LoginModal
                isOpen={isModalOpen}
                onClose={closeLogin}
                onSubmit={handleLogin}
            />
        </div>
    )
}