import React, { Component } from 'react'
import '../cardTray.css'
import { addCard, saveDeck, saveNewCard } from '../actions/actions'
import { connect } from 'react-redux'

class AddNewCard extends Component {

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
    const deckId = this.props.deckId

    this.props.saveNewCard(card, deckId);
    this.props.history.push('/')
  }

  render(){
    return <div >
            <h4>Create a new card:</h4>
            <form>
              <label>
                Card Front:
                <input type="text" name="front" onChange={this.handleChange} value={this.state.front}/>
              </label>

              <label>
                Card Back:
                <input type="text" name="back" onChange={this.handleChange} value={this.state.back}/>
              </label>

              <input type="submit" value="Save to deck" onClick={this.createCard}/>
            </form>

          </div>
  }
}

const mapStateToProps = (state) => {
  return {
    deckId: state.deckId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewCard: (card, deckId) => dispatch(saveNewCard(card, deckId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCard)
