import React from 'react'
import Installment from './Installment'
import './Installments.css'

export default function Installments({ parcels }) {
  return (
    <div className="parcels-container">
      {parcels.map((parcel) => (
        <Installment key={parcel.id} parcel={parcel} />
      ))}
    </div>
  )
}
