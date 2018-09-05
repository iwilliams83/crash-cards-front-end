import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'
import checkmark from '../images/check-mark.png'
import ScoreDisplay from './ScoreDisplay'
//import {  } from '../actions/actions'

class DisplayCards extends Component{

  state = {
    cardFront: '',
    cardBack: '',
    showAnswer: false,
    done: false,
    score: 0,
    displayScore: false
  }

  generatorIterator = this.getNextCard();

  componentDidMount(){
    this.displayNext()
  }

  *getNextCard(){
    const cards = this.props.cardsToDisplay
    for (const index in cards) {
        yield {card: cards[index], index: index}
    }
  }

  displayNext = () => {
    let result = this.generatorIterator.next();
    let id = parseInt(result.value.index)
    let arrLength = this.props.cardsToDisplay.length - 1
    if (!result.done && id <= arrLength){
      this.setState({
        cardFront: result.value.card.front,
        cardBack: result.value.card.back
      })
      if (id === arrLength) {
        this.setState({
          done: true
        })
      }
    }
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
    else if (e.target.innerText === 'My Score'){
      this.setState({
        displayScore: true
      })
    }
  }

  toggleCard = () => {
    if (this.state.showAnswer){
      return <button className="display-buttons" onClick={this.handleClick}>See Front</button>
    }
    else {
      return <button className="display-buttons" onClick={this.handleClick}>See Back</button>
    }
  }

  toggleNext = () => {
    if (this.state.done){
      return <button className="display-buttons" onClick={this.handleClick}>My Score</button>
    }
    else {
      return <button className="display-buttons" onClick={this.handleClick}>Next Card</button>
    }
  }

  updateScore = () => {
    this.setState(prevState => {
      return {score: prevState.score + 1}
    })
  }

  showScore = () => {
    if (this.state.displayScore){
      let arrLength = this.props.cardsToDisplay.length
      return <div><ScoreDisplay score={this.state.score} length={arrLength}/></div>
    }
    else {
      return <div className="checkmark" onClick={this.updateScore}>
              <img src={checkmark} alt="check mark"/>
            </div>
    }
  }

  render(){
    return <div className="display-card">

        {this.showScore()}

      <div className="card-dimensions">
        <div>{this.state.showAnswer ? this.state.cardBack : this.state.cardFront}</div>
      </div>
      <div>
        {this.toggleCard()}
        <br />
        <br />
          {this.toggleNext()}
      </div>
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
