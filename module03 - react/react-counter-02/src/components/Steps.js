import React from 'react'

export default class Steps extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <span className={this.props.className}>({this.props.steps})</span>
  }
}
