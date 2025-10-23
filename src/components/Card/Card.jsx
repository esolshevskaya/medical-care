// src/components/Card/Card.jsx
// src/components/Card/Card.jsx
import React from 'react';
import './Card.css';

// Обычная карточка
export default function Card({ title, text, icon }) {
    return (
        <div className="card">
            <div className="card-icon">
                <img src={icon} alt={title} />
            </div>
            <h3 className="card-title">{title}</h3>
            <div className="divider"></div>
            <p className="card-text">{text}</p>
        </div>
    );
}

// Ряд карточек с автоматическим распределением пространства
export function CardRow({ cards }) {
    return (
        <div className="card-row">
            {cards.map((card, index) => (
                <Card key={index} title={card.title} text={card.text} icon={card.icon} />
            ))}
        </div>
    );
}
