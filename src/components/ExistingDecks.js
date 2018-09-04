import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'
import { storeCurrentDecks, fetchDecks, setDisplayId } from '../actions/actions'

class ExistingDecks extends Component {

  componentDidMount() {
    let id = this.props.userId
    this.props.fetchDecks(id)
  }

  clickHandler = (e) => {
    let deckId = e.target.id
    this.props.setDisplayId(deckId)
  }

  render(){
    const { existingDecks } = this.props

    return <div className="card-footer">
      {existingDecks.length > 0 && existingDecks.map((card, idx) => {
        return <div key={idx} className="card" id={idx}
          onClick={this.clickHandler}>
          {card.subject}
          </div>
        })}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    existingDecks: state.existingDecks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeCurrentDecks: (deckObjects) => dispatch(storeCurrentDecks(deckObjects)),
    fetchDecks: (id) => dispatch(fetchDecks(id)),
    setDisplayId: (id) => dispatch(setDisplayId(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExistingDecks)
