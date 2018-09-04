import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'
//import {  } from '../actions/actions'

class DisplayCards extends Component{

  state = {
    cardFront: ''
  }

  generatorIterator = this.getNextCard();

  componentDidMount(){
    this.displayNext()
  }

  *getNextCard(){
    const cards = this.props.cardsToDisplay
    for (const card of cards) {
        yield card.front;
    }
  }

  displayNext = () => {
    let result = this.generatorIterator.next();
    console.log('result:', result);
    this.setState({
      cardFront: result.value
    })
  }

  handleClick = () => {
    this.displayNext()
  }

  render(){
    return <div>
      <div className="display-card">{this.state.cardFront}</div>
      <button onClick={this.handleClick}>Next Card</button>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    displayId: state.displayId,
    existingDecks: state.existingDecks,
    cardsToDisplay: state.existingDecks[state.displayId]['cards']
  }
}

export default connect(mapStateToProps)(DisplayCards)
