import React, { Component } from 'react'
import { saveEditedCard } from '../actions/actions'
import { connect } from 'react-redux'

class EditExisting extends Component {
  state = {
    cardIndex: null,
    front: '',
    back: '',
    card: {}
  }

  componentDidMount = () => {
    this.setState({
      card: this.props.card,
      front: this.props.card.front,
      back: this.props.card.back
    });
  }

  handleChange = (e) => {
    if(e.target.name === 'front'){
      this.setState({front: e.target.value})
    }
    else {
      this.setState({back: e.target.value})
    }
  }

  clickHandler = (e) => {
    e.preventDefault()
    if (e.target.value === 'Submit'){
      const cardToSubmit = {
        ...this.state.card,
        front: this.state.front,
        back: this.state.back
      }
      //console.log('--- cardToSubmit', cardToSubmit)
      this.props.saveEditedCard(cardToSubmit, this.props.deckIndex)
      //this.props.editExisting(card, this.state.cardIndex)
      this.props.history.push('/display')
    }
    else if (e.target.value === 'Delete') {
      //this.props.deleteCard(this.state.cardIndex)
      //this.props.history.push('/new')
    }
  }
  render(){
    //console.log('card to edit',this.props.card)
    return <div >
            <h4>Edit or Delete Card:</h4>
            <form>
              <label>
                Card Front:
                <input type="text" name="front"
                          onChange={this.handleChange} value={this.state.front}/>
              </label>

              <label>
                Card Back:
                <input type="text" name="back"
                          onChange={this.handleChange} value={this.state.back}/>
              </label>

              <input type="submit" value="Submit" onClick={this.clickHandler}/>
              <input type="submit" value="Delete" onClick={this.clickHandler}/>
            </form>

          </div>
  }
}

const mapStateToProps = (state) => {
  return {
    deckIndex: state.deckIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveEditedCard: (card, idx) => dispatch(saveEditedCard(card, idx))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExisting)
