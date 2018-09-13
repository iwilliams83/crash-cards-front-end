import React, { Component } from 'react'
import { updateSubject } from '../actions/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css';
import { Input } from 'semantic-ui-react'

class NewSubject extends Component {

  handleChange = (e) => {
    this.props.updateSubject(e.target.value)
  }

  clickHandler = (e) => {
    e.preventDefault()
    this.props.updateState(this.props.subject)
  }

  render(){
    return <div className="home-page">
            <div>
              <h3>Create a new deck or view an existing deck!</h3>
              <p>To create a new deck, type in a subject and click submit to add cards...</p>
              <form>
                <label>
                  Enter Subject:
                  <Input type="text" name="subject" onChange={this.handleChange}/>
                </label>
                <Link to="/new" >
                  <button className="create-button">Create Cards</button>
                </Link>
              </form>
            </div>
          <div><p>To view an existing deck, click on a title below:</p></div>
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
