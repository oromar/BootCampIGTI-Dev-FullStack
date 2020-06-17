import React from 'react'
import css from './user.module.css'

export default function User(props) {
  const { id, name, picture } = props.user
  return (
    <div key={id.value} className={css.flexRow}>
      <img src={picture.medium} alt="" /> {name.title} {name.first} {name.last}
    </div>
  )
}
