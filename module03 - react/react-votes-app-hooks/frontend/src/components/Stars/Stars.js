import React from 'react'
import './Stars.css'

const STARS = {
  full: '★',
  empty: '☆',
}
const MAX_STARS = 10

export default function Stars(props) {
  const { popularity } = props
  const full = STARS.full.repeat(popularity)
  const empty = STARS.empty.repeat(MAX_STARS - popularity)

  return (
    <div className="stars">
      {full}
      {empty}
    </div>
  )
}
