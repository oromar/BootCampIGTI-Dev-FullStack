import React from 'react'
import _ from 'lodash'
import Grade from './Grade'

export default function Grades({ grades, onDelete, onUpdate }) {
  const grouped = _.groupBy(grades, 'student')
  const names = Object.keys(grouped)
  return (
    <>
      {names.map((name) => (
        <div key={name}>
          <Grade
            onDelete={onDelete}
            onUpdate={onUpdate}
            grades={grouped[name]}
          />
        </div>
      ))}
    </>
  )
}
