import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'

class ExistingDecks extends Component {

  //fetch data on componentDidMount
  //dispatch an action to update store

  render(){
    return <div className="card-footer">
      Existing Decks will show up here
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    existingDecks: []
  }
}

export default connect(mapStateToProps)(ExistingDecks)
