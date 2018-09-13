import React, { Component } from 'react'
import '../cardTray.css'
//import '../App.css';
//import '../NewCard.css';
import '../custom.css';
import { addCard, saveDeck } from '../actions/actions'
import { connect } from 'react-redux'
//import { Link } from 'react-router-dom'
import { Input } from 'semantic-ui-react'

class NewCardForm extends Component {

  state = {
    front: '',
    back: ''
  }

  handleChange = (e) => {
    if(e.target.name === 'front'){
      this.setState({front: e.target.value})
    }
    else {
      this.setState({back: e.target.value})
    }
  }

  createCard = (e) => {
    e.preventDefault()
    const card = this.state;
    this.setState({
      front: '',
      back: ''
    });
    this.props.addCard(card);
  }

  createDeck = (e) => {
    e.preventDefault()
    let subject = this.props.subject
    let cards = this.props.currentDeck
    let userId = this.props.userId

    this.props.saveDeck(userId, subject, cards)
    this.props.history.push('/')
  }

  render(){
    return <React.Fragment>
          <div className="form">
            <div><h4>Create a new card for your {this.props.subject} deck:</h4></div>

              <form>
                <div className="edit-inputs">
              <label>
                Card Front:
                <Input type="text" name="front" onChange={this.handleChange} value={this.state.front}/>
              </label>

              <label>
                Card Back:
                <Input type="text" name="back" onChange={this.handleChange} value={this.state.back}/>
              </label>
              </div>
            </form>

            <div className="add-save-buttons" >
              <button className="add-save" type="submit" value="Add Card" onClick={this.createCard}>
                Add Card
              </button>
              <button className="add-save" type="submit" value="Save Deck" onClick={this.createDeck}>
                Save Deck
              </button>
            </div>
          </div>
          <div className="footer"></div>
        </React.Fragment>
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    currentDeck: state.currentDeck,
    subject: state.subject
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => dispatch(addCard(card)),
    saveDeck: (userId, subject, cards) => dispatch(saveDeck(userId, subject, cards))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCardForm)
