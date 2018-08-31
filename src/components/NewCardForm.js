import React, { Component } from 'react'
import '../cardTray.css'
import { addCard } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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

  clickHandler = (e) => {
    e.preventDefault()
    const card = this.state;
    this.setState({
      front: '',
      back: ''
    });
    this.props.addCard(card);
  }

  render(){

    return <div >
            <h4>Create a new deck of {this.props.subject} cards:</h4>
            <form>
              <label>
                Card Front:
                <input type="text" name="front" onChange={this.handleChange} value={this.state.front}/>
              </label>

              <label>
                Card Back:
                <input type="text" name="back" onChange={this.handleChange} value={this.state.back}/>
              </label>

              <input type="submit" value="Submit" onClick={this.clickHandler}/>
            </form>

          </div>
  }
}

const mapStateToProps = (state) => {
  return {
    currentDeck: state.currentDeck,
    subject: state.subject
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => dispatch(addCard(card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCardForm)
