import React from 'react'
import CardImage from '../CardImage/CardImage'
import CardId from '../CardId/CardId'
import Stars from '../Stars/Stars'
import './CardData.css'

export default function CardData(props) {
    const {id, name, votes, popularity, percentage} = props.candidate
    const formatter = new Intl.NumberFormat('pt-BR')
    return (
        <>
        <div className="card-data-container">
            <CardId id={props.position} />
            <CardImage id={id} />
            <div className="card-data"> 
                <p className="candidate-name">{name}</p>
                <p>{formatter.format(votes)}</p>
                <p>{formatter.format(percentage.toFixed(2))}%</p>
                <p><Stars popularity={popularity} /></p>
            </div>
        </div>
        </>
    )
}