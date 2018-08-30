import React, { Component } from 'react'
import '../newCardForm.css'
import { editCard } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class EditCard extends Component {
  state = {
    cardIndex: null,
    front: '',
    back: ''
  }

  componentDidMount = () => {
    let i = this.props.cardIndex
    let card = this.props.currentDeck[i]
    this.setState({
      cardIndex: i,
      front: card.front,
      back: card.back
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
    const card = {
      front: this.state.front,
      back: this.state.back
    }
    this.props.editCard(card, this.state.cardIndex)
    this.props.changeDisplay()
  }

  render(){

    return <div >
            <h4>Edit Card:</h4>
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
            </form>

          </div>
  }
}

const mapStateToProps = (state) => {
  return {
    currentDeck: state.currentDeck
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editCard: (card, id) => dispatch(editCard(card, id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCard)
