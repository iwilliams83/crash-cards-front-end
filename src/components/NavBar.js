import React, { Component } from 'react'
import logo from '../images/crash-cards-logo.png'
import '../App.css';

export default class NavBar extends Component {
  render(){
    return <div className="App-logo">
      <img src={logo} alt="crash cards logo"/>
    </div>
  }
}
