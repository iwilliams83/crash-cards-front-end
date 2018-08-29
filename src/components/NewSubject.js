import React, { Component } from 'react'
import { updateSubject } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class NewSubject extends Component {

  handleChange = (e) => {
    this.props.updateSubject(e.target.value)
  }

  clickHandler = (e) => {
    e.preventDefault()
    this.props.updateState(this.props.subject)
  }

  render(){
    //console.log('NewSubject component props:', this.props.subject)
    return <div>
      <h3>Create a new deck, or view an existing deck!</h3>
      <h4>Create a new deck of cards:</h4>
      <form>
        <label>
          Enter Subject:
          <input type="text" name="subject" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" onClick={this.clickHandler}/>
      </form>
    </div>
  }
}

const mapStateToProps = (state) => {
//console.log('state', state)
  return {subject: state.subject}
}

const mapDispatchToProps = (dispatch) => {
  return { updateSubject: (subj) => dispatch(updateSubject(subj)) }
}



export default connect(mapStateToProps, mapDispatchToProps)(NewSubject)
