import React, { Component } from 'react'
import { updateSubject } from '../actions/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NewSubject extends Component {

  handleChange = (e) => {
    this.props.updateSubject(e.target.value)
  }

  clickHandler = (e) => {
    e.preventDefault()
    this.props.updateState(this.props.subject)
  }

  render(){
    return <div className="App-intro">
      <h3>Create a new deck, or view an existing deck!</h3>
      <p>To create a new deck, type in a subject and click submit.</p>
      <form>
        <label>
          Enter Subject:
          <input type="text" name="subject" onChange={this.handleChange}/>
        </label>
        <Link to="/new" >
          <button>Create Cards</button>
          {/* <input type="submit" value="Submit" onClick={this.clickHandler}/> */}
        </Link>
      </form>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {subject: state.subject}
}

const mapDispatchToProps = (dispatch) => {
  return { updateSubject: (subj) => dispatch(updateSubject(subj)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSubject)
