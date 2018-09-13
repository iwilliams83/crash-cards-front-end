import React, { Component } from 'react'
import '../cardTray.css'
import { addCard, saveDeck, saveNewCard } from '../actions/actions'
import { connect } from 'react-redux'
import '../custom.css';
import { Input } from 'semantic-ui-react'

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
    return <React.Fragment>
      <div className="form">
        <h4>Create a new card:</h4>
          <form>
            <div className="edit-inputs">
              <div>
                <label>
                  Card Front:
                  <Input type="text" name="front" onChange={this.handleChange} value={this.state.front}/>
                </label>
              </div>
              <div>
                <label>
                  Card Back:
                  <Input type="text" name="back" onChange={this.handleChange} value={this.state.back}/>
                </label>
              </div>
            </div>

            <div>
              <button className="save-button" type="submit" value="Save to deck" onClick={this.createCard}>
                Save to Deck
              </button>
            </div>

            </form>

          </div>
          <div className="footer"></div>
        </React.Fragment>
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
