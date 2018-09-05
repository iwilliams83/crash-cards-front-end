import React, {Component} from 'react'

import { connect } from 'react-redux'

export default class ScoreDisplay extends Component {
  render(){
    return <div>Your score is {this.props.score}</div>
  }
}
