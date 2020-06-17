import React from 'react'
import _ from 'lodash'
import Grade from './Grade'

export default function Grades({ grades, onUpdate }) {
  const grouped = _.groupBy(grades, 'student')
  const names = Object.keys(grouped)
  return (
    <>
      {names.map((name) => (
        <div key={name}>
          <Grade onUpdate={onUpdate} grades={grouped[name]} />
        </div>
      ))}
    </>
  )
}
