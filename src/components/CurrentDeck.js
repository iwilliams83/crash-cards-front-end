import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'
//import { Link } from 'react-router-dom'

class CurrentDeck extends Component {

  render(){
    return <div >
            <div className="card-footer" >{this.props.currentDeck.map((card, idx) => {
              return <div key={idx} className="card" id={idx}
                onClick={(e) => {
                  this.props.setEditState(e)
                  this.props.history.push('/edit-new')
                }}>
                {card.front}
            </div>
          })}</div>
        </div>
  }
}

const mapStateToProps = (state) => {
  return {
    currentDeck: state.currentDeck
  }
}

export default connect(mapStateToProps)(CurrentDeck)
