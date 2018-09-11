import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import NavBar from './components/NavBar'
import NewSubject from './components/NewSubject'
import NewCardForm from './components/NewCardForm'
import ExistingDecks from './components/ExistingDecks'
import EditCard from './components/EditCard'
import EditExisting from './components/EditExisting'
import CurrentDeck from './components/CurrentDeck'
import DisplayCards from './components/DisplayCards'
import {resetDisplayId, fetchDecks} from './actions/actions'
import { withRouter } from 'react-router'
import { Route, Switch} from 'react-router-dom'


class App extends Component {

  state = {
    createNew: false,
    editNew: false,
    cardIndex: null
  }

  componentDidMount() {
    let id = this.props.userId
    this.props.fetchDecks(id)
  }

  updateState = (subject) => {
    if (subject.length >= 1){
      this.setState({
        createNew: true
      })
    }
  }

  setEditState = (e) => {
    this.setState( {
      editNew: true,
      cardIndex: e.target.id
    })
  }

  changeDisplay = () => {
    this.setState({
      ...this.state,
      createNew: true,
      editNew: false,
    })
  }


  showHome = (props) => {
    return <div >
      <NewSubject updateState={this.updateState} />
      <ExistingDecks {...props}/>
    </div>
  }

  newSubject = (props) => {
    return <div className="App-intro">
      <NewCardForm {...props} renderHome={this.renderHome}/>
      <CurrentDeck {...props} setEditState={this.setEditState}/>
    </div>
  }

  displayCards = (props) => {
    return <div>
      <div className="card-display"><DisplayCards {...props}/></div>
    </div>
  }

  editNewCard = (props) => {
    return <div>
      <EditCard {...props} cardIndex={this.state.cardIndex}
        changeDisplay={this.changeDisplay}/>
      <CurrentDeck {...props} setEditState={this.setEditState}/>
    </div>
  }

  editExisting = (props) => {
    return <div>
      <EditExisting card={this.props.cardToEdit} deckIndex={this.props.deckIndex} {...props}/>
    </div>
  }

  render() {
    //console.log('===== existingDecks', this.props.existingDecks)
    return (<div className="App">
              <div className="App-header">
                <NavBar />
              </div>
              <Switch>
                <Route exact path="/" render={this.showHome}/>
                <Route path="/new" render={this.newSubject}/>
                <Route path="/display" render={this.displayCards}/>
                <Route path="/edit-new" render={this.editNewCard}/>
                <Route path="/edit-existing" render={this.editExisting}/>
              </Switch>
            </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    displayId: state.displayId,
    currentDeck: state.currentDeck,
    cardToEdit: state.cardToEdit,
    deckIndex: state.deckIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetDisplayId: () => dispatch(resetDisplayId()),
    fetchDecks: (id) => dispatch(fetchDecks(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
