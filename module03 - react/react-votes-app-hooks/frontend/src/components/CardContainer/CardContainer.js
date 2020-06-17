import React from 'react'
import CardData from '../CardData/CardData'
import './CardContainer.css'

export default function CardContainer(props){
    return (
        <div className="card-container">
            <CardData position={props.position} candidate={props.candidate}/>
        </div>
        )
}
