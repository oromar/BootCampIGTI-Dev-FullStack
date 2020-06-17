import React from 'react'
import CardData from '../CardData/CardData'
import './CardContainer.css'

export default function CardContainer(props){
    return (
        <div className="card-container">
            <CardData candidate={props.candidate}/>
        </div>
        )
}
