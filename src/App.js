import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import NavBar from './components/NavBar'
import NewSubject from './components/NewSubject'
import NewCardForm from './components/NewCardForm'
import ExistingDecks from './components/ExistingDecks'
import EditCard from './components/EditCard'
import CurrentDeck from './components/CurrentDeck'
import DisplayCards from './components/DisplayCards'
import {resetDisplayId, fetchDecks} from './actions/actions'
import { withRouter } from 'react-router'
import { Route, Switch, Link } from 'react-router-dom'


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
    return <div className="App-intro">
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

  displayCards = () => {
    return <div><DisplayCards /></div>
  }

  editNewCard = (props) => {
    return <div>
      <EditCard {...props} cardIndex={this.state.cardIndex}
        changeDisplay={this.changeDisplay}/>
      <CurrentDeck {...props} setEditState={this.setEditState}/>
    </div>
  }


  render() {

    return (<div className="App">
              <header className="App-header">
                <NavBar />
              </header>
              <Link to="/">
                <button className="home-button">
                  Home
                </button>
              </Link>
              {/* {this.showComponent()} */}
              <Switch>
                <Route exact path="/" render={this.showHome}/>
                <Route path="/new" render={this.newSubject}/>
                <Route path="/display" render={this.displayCards}/>
                <Route path="/edit-new" render={this.editNewCard}/>
                
              </Switch>
            </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    displayId: state.displayId,
    currentDeck: state.currentDeck
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetDisplayId: () => dispatch(resetDisplayId()),
    fetchDecks: (id) => dispatch(fetchDecks(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
