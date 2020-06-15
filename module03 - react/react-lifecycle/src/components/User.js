import React, { Component } from 'react'
import css from './user.module.css'

export default class User extends Component {
  render() {
    const { id, name, picture } = this.props.user
    return (
      <div key={id.value} className={css.flexRow}>
        <img src={picture.medium} alt="" /> {name.title} {name.first}{' '}
        {name.last}
      </div>
    )
  }
}
