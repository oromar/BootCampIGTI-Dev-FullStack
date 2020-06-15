import React from 'react'

export default class Value extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <span>{this.props.content}</span>
  }
}
