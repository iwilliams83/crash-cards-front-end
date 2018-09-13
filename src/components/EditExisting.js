import React, { Component } from 'react'
import { saveEditedCard } from '../actions/actions'
import { connect } from 'react-redux'
import '../custom.css';
import { Input } from 'semantic-ui-react'

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
    if (e.target.value === 'Save Changes'){
      const cardToSubmit = {
        ...this.state.card,
        front: this.state.front,
        back: this.state.back
      }
      this.props.saveEditedCard(cardToSubmit, this.props.deckIndex)
      this.props.history.push('/display')
    }
  }
  render(){
    return <React.Fragment>
      <div className="form">
            <h4>Edit Card:</h4>
            <form>
            <div className="edit-inputs">
                <div >
                  <label>
                    Card Front:
                    <Input type="text" name="front"
                              onChange={this.handleChange} value={this.state.front}/>
                  </label>
                </div>
                <div >
                  <label>
                    Card Back:
                    <Input type="text" name="back"
                           onChange={this.handleChange} value={this.state.back}/>
                  </label>
                </div>

            </div>
              </form>
              <div >
                <button className="save-button" type="submit" value="Save Changes" onClick={this.clickHandler}>
                Save Changes
              </button>
            </div>
          </div>
          <div className="footer"></div>
          </React.Fragment>

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
