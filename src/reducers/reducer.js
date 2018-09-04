const defaultState = {
  subject: '', currentDeck: [],
  existingDecks: [], userId: 1
}

const rootReducer = (state = defaultState, action) => {
  switch(action.type){
    case 'UPDATE_SUBJECT':
      return {...state, subject: action.payload}
    case 'ADD_CARD':
      return {...state,
        currentDeck: state.currentDeck.concat(action.payload.card)
      }
    case 'EDIT_CARD':
      let i = action.payload.id //index of card in currentDeck
      let updatedCard = action.payload.card
      const editState = {...state, currentDeck: state.currentDeck.map((card, idx) => {
          return (idx === parseInt(i, 10)) ? {...card, ...updatedCard} : card
      })}
      return editState
    case 'DELETE_CARD':
      let j = action.payload //index of card in currentDeck
      const deleteState = {...state, currentDeck: state.currentDeck.filter((card, idx) => {
        return (idx !== parseInt(j, 10)) ? {card} : null
      })}
      return deleteState
    case 'STORE_DECKS':
      let userDecks = action.payload.data.map((data) => data.attributes)

      return {...state, existingDecks: userDecks}
      // return {...state, existingDecks: state.existingDecks.concat(userDecks)}
    case 'NEW_DECK':
      let newDeck = action.payload
      return {...state, existingDecks: state.existingDecks.concat(newDeck)}
    default:
      return state
  }
}

export default rootReducer
