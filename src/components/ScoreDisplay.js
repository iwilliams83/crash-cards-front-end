import React, {Component} from 'react'

export default class ScoreDisplay extends Component {
  render(){
    let total = this.props.length
    return <div>Your score is {this.props.score} / {total}!</div>
  }
}
