import React, { Component } from 'react'
import logo from '../images/crash-cards-logo.png'
import '../App.css';
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  render(){
    return <div className="App-logo">
            <div></div>
            <div> <img src={logo} alt="crash cards logo"/> </div>
            <div><Link to="/">
              <button className="buttons">
                Home
              </button>
            </Link></div>
    </div>
  }
}
