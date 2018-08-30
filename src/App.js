import React, { Component } from 'react';
import { connect } from 'react-redux'
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


  clickHandler = (e) => {
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

  showComponent = () => {
    if (!this.state.createNew){

      return <div>
        <div className="App-intro"><NewSubject updateState={this.updateState} /></div>
        <div className="App-footer"><ExistingDecks /></div>
      </div>
    }
    else if (this.state.createNew && !this.state.editNew){
      console.log('currentDeck after edit:', this.props.currentDeck)
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
        <EditCard cardIndex={this.state.cardIndex} changeDisplay={this.changeDisplay}/>
        <div className="card-footer">{this.props.currentDeck.map((card, idx) => {
          return <div key={idx} className="card" id={idx} onClick={this.clickHandler}>
              {card.front}
            </div>
        })}</div>
      </div>
    }
  }

  render() {
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
  return {
    currentDeck: state.currentDeck
  }
}

export default connect(mapStateToProps)(App)
