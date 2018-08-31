const defaultState = {
  subject: '', currentDeck: []
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
          if(idx === parseInt(i)) {
            return {...card, ...updatedCard}
          }
          return card
      })}
      return editState
    case 'DELETE_CARD':
      let j = action.payload //index of card in currentDeck
      const deleteState = {...state, currentDeck: state.currentDeck.filter((card, idx) => {
        if (idx !== parseInt(j)) {
          return {card}
        }
      })}
      return deleteState
    default:
      return state
  }
}

export default rootReducer
