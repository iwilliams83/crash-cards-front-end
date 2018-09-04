import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'
//import {  } from '../actions/actions'

class DisplayCards extends Component{

  render(){
    console.log('in DisplayCards, existingDecks', this.props.existingDecks)
    console.log('in DisplayCards, displayId', this.props.displayId)
    return <div>I'm a DisplayCards component yo!</div>
  }
}

const mapStateToProps = (state) => {
  return {
    displayId: state.displayId,
    existingDecks: state.existingDecks
  }
}

export default connect(mapStateToProps)(DisplayCards)
