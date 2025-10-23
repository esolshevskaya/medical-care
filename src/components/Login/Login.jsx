import React, { useState } from 'react'
import './Login.css'

export default function LoginModal({ isOpen, onClose, onSubmit }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        if (!isOpen) {
            setLogin('')
            setPassword('')
            setError('')
            setLoading(false)
        }
    }, [isOpen])

    if (!isOpen) return null

    async function handleSubmit() {
        setError('')
        setLoading(true)

        if (!login.trim()) {
            setError('Введите логин')
            setLoading(false)
            return
        }

        if (!password) {
            setError('Введите пароль')
            setLoading(false)
            return
        }

        if (password.length < 8) {
            setError('Пароль должен быть минимум 8 символов')
            setLoading(false)
            return
        }

        try {
            const result = await onSubmit({
                login: login.trim(),
                password
            })

            if (!result.ok) {
                setError(result.error || 'Ошибка входа')
            }

        } catch (err) {
            setError('Ошибка соединения. Попробуйте позже.')
        } finally {
            setLoading(false)
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    function handleClose() {
        onClose()
    }

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h3>Войти в систему</h3>

                <div className="field">
                    <label className="label">Логин</label>
                    <input
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Введите ваш логин"
                        disabled={loading}
                    />
                </div>

                <div className="field">
                    <label className="label">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Введите ваш пароль"
                        disabled={loading}
                    />
                </div>

                {error && <div className="error">{error}</div>}

                <div className="modal-actions">
                    <button
                        className="button-primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                    <button
                        className="button-secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Отмена
                    </button>
                </div>

                <div className="test-credentials">
                    <h4>Тестовые аккаунты:</h4>
                    <p><strong>Логин:</strong> sergey <strong>Пароль:</strong> password123</p>
                    <p><strong>Логин:</strong> alena <strong>Пароль:</strong> password456</p>
                </div>
            </div>
        </div>
    )
}