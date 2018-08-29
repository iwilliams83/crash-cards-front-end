import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import NewSubject from './components/NewSubject'
import NewCardForm from './components/NewCardForm'
import ExistingDecks from './components/ExistingDecks'
import EditCard from './components/EditCard'

class App extends Component {

  state = {
    createNew: false,
    editNew: false,
    cardIndex: null
  }

  updateState = (subject) => {
    if (subject.length >= 1){
      this.setState({
        createNew: true
      })
    }
  }

  // editCard = () => {
  //
  // }

  clickHandler = (e) => {
    this.setState( {
      editNew: true,
      cardIndex: e.target.id
    })

  }

  showComponent = () => {
    if (!this.state.createNew){

      return <div>
        <div className="App-intro"><NewSubject updateState={this.updateState} /></div>
        <div className="App-footer"><ExistingDecks /></div>
      </div>
    }
    else if (this.state.createNew && !this.state.editNew){
        console.log('App state:', this.state)
      return <div>
        <NewCardForm />
        <div className="card-footer">{this.props.currentDeck.map((card, idx) => {
          return <div key={idx} className="card" id={idx} onClick={this.clickHandler}>
              {card.front}
            </div>
        })}</div>
      </div>
    }
    else if (this.state.createNew && this.state.editNew){

      return <div>
        <EditCard cardIndex={this.state.cardIndex}/>
        <div className="card-footer">{this.props.currentDeck.map((card, idx) => {
          return <div key={idx} className="card" id={idx} onClick={this.clickHandler}>
              {card.front}
            </div>
        })}</div>
      </div>
    }
  }

  render() {
    console.log('App state', this.state)
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        {this.showComponent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {currentDeck: state.currentDeck}
}

export default connect(mapStateToProps)(App)

// <div className="App-intro">
//  {this.state.createNew ? <NewCardForm /> : <NewSubject updateState={this.updateState}/>}
//</div>
//{this.state.createNew ? null : <footer className="App-footer"><ExistingDecks /></footer>} */}
