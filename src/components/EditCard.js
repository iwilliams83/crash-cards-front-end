import React, { Component } from 'react'
import '../newCardForm.css'
import { editCard } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class EditCard extends Component {
  // state = {
  //   front: '',
  //   back: ''
  // }

  handleChange = (e) => {
    // if(e.target.name === 'front'){
    //   this.setState({front: e.target.value})
    // }
    // else {
    //   this.setState({back: e.target.value})
    // }
  }

  clickHandler = (e) => {
    e.preventDefault()
    // const card = this.state;
    // this.setState({
    //   front: '',
    //   back: ''
    // });
    // this.props.editCard(card);
  }
  render(){
    console.log('EditCard props =', this.props)
    return <div >
            <h4>Edit Card:</h4>
            <form>
              <label>
                Card Front:
                <input type="text" name="front" onChange={this.handleChange} />
              </label>

              <label>
                Card Back:
                <input type="text" name="back" onChange={this.handleChange} />
              </label>

              <input type="submit" value="Submit" onClick={this.clickHandler}/>
            </form>

          </div>
  }
}

const mapStateToProps = (state) => {
  console.log('EditCard, state =', state)
  return {}
}

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch =',dispatch)
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCard)
