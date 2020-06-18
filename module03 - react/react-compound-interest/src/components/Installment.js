import React from 'react'
import './Installment.css'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
const formatter = new Intl.NumberFormat('pt-BR')

export default function Installment({ parcel }) {
  const styleColor = parcel.diff < 0 ? 'red' : 'green'
  return (
    <>
      <div className="parcel-container">
        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
          {parcel.id}
        </div>
        <div className="parcel-data-container">
          <p style={{ color: styleColor }}>
            <strong>
              {' '}
              {currencyFormatter.format(parcel.newValue.toFixed(2))}
            </strong>
          </p>
          <p style={{ color: styleColor }}>
            <strong>{currencyFormatter.format(parcel.diff.toFixed(2))}</strong>
          </p>
          <p style={{ color: styleColor }}>{`${formatter.format(
            parcel.percent.toFixed(2)
          )}%`}</p>
        </div>
      </div>
    </>
  )
}
