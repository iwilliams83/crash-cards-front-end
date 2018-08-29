import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import NewSubject from './components/NewSubject'
import NewCardForm from './components/NewCardForm'

export default class App extends Component {

  state = {
    createNew: false
  }

  updateState = (subject) => {
    if (subject.length >= 1){
      this.setState({
        createNew: true
      })
    }
  }

  render() {
    console.log('App props', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className="App-intro">
          {this.state.createNew ? <NewCardForm /> : <NewSubject updateState={this.updateState}/>}
        </div>
      </div>
    );
  }
}
