import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'
//import {  } from '../actions/actions'

class DisplayCards extends Component{

  state = {
    cardFront: '',
    cardBack: '',
    showAnswer: false
  }

  generatorIterator = this.getNextCard();

  componentDidMount(){
    this.displayNext()
  }

  *getNextCard(){
    const cards = this.props.cardsToDisplay
    for (const card of cards) {
        yield card
    }
  }

  displayNext = () => {
    let result = this.generatorIterator.next();
    console.log('result:', result);
    this.setState({
      cardFront: result.value.front,
      cardBack: result.value.back
    })
  }

  handleClick = (e) => {
    if(e.target.innerText === 'Next Card'){
      this.setState({
        showAnswer: false
      })
      this.displayNext()
    }
    else if (e.target.innerText === 'See Back'){
      this.setState(prevState => {
        return {showAnswer: !prevState.showAnswer}
      })
    }
    else if (e.target.innerText === 'See Front'){
      this.setState(prevState => {
        return {showAnswer: !prevState.showAnswer}
      })
    }
  }

  changeButton = () => {
    if (this.state.showAnswer){
      return <button onClick={this.handleClick}>See Front</button>
    }
    else {
      return <button onClick={this.handleClick}>See Back</button>
    }
  }

  render(){
    return <div className="display-card">
      <div className="card-dimensions">
        <div>{this.state.showAnswer ? this.state.cardBack : this.state.cardFront}</div>
      </div>
        {this.changeButton()}
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
