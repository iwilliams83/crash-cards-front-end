const defaultState = {
  subject: '', currentDeck: [], //array of 'card' objects
  newData: {front: '', back: ''}
}

const rootReducer = (state = defaultState, action) => {
  switch(action.type){
    case 'UPDATE_SUBJECT':
      return {...state, subject: action.payload}
    case 'ADD_CARD':
      return {...state,
        currentDeck: state.currentDeck.concat(action.payload.card)
      }
    // case: 'EDIT_CARD':
    //   return {
    //     ...state,
    //     newData: action.payload
    //   }
    default:
      return state
  }
}

export default rootReducer
