import React, {Component} from 'react'
import '../cardTray.css'
import { connect } from 'react-redux'
import { storeCurrentDecks, fetchDecks, setDisplayId } from '../actions/actions'

class ExistingDecks extends Component {

  componentDidMount() {
    let id = this.props.userId
    this.props.fetchDecks(id)
    // fetch(`http://localhost:3000/api/v1/users/${id}`)
    //   .then(res => res.json())
    //     .then(res => this.props.storeCurrentDecks(res))
  }

  clickHandler = (e) => {
    let deckId = e.target.id
    this.props.setDisplayId(deckId)
  }

  render(){
    const { existingDecks } = this.props
    console.log('existingDecks:', existingDecks)
    // console.log('this.props.existingDecks[0].subject', this.props.existingDecks[0].subject)
    return <div className="card-footer">
      {existingDecks.length > 0 && existingDecks.map((card, idx) => {
        return <div key={idx} className="card" id={idx}
          onClick={this.clickHandler}>
          {card.subject}
          </div>
        })
      }
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
