import React from 'react'
import './Stars.css'

export default function Stars(props) {
    const {popularity} = props
    return (
        <div className="stars">
            <i className={`star far fa fa-star ${popularity >= 1 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 2 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 3 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 4 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 5 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 6 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 7 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 8 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity >= 9 ? 'checked' : ''}`}></i>
            <i className={`star far fa fa-star ${popularity == 10 ? 'checked' : ''}`}></i>
        </div>
    )
}
