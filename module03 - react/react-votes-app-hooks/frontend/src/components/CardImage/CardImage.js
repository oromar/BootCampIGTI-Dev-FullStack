import React from 'react'
import './CardImage.css'

export default function CardImage(props) {
    return (
        <div className="image-container">
            <img src={`${props.id}.jpg`} />
        </div>
    )
}
