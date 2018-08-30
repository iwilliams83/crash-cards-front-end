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
      let index = action.payload.id
      let updatedCard = action.payload.card

      const newState = {...state, currentDeck: state.currentDeck.map((card, idx) => {
          if(idx == index) {
            return {...card, ...updatedCard}
          }
          return card
      })}
      return newState
    default:
      return state
  }
}

export default rootReducer
