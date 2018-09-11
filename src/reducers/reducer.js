const defaultState = {
  subject: '', currentDeck: [], displayId: null,
  existingDecks: [], userId: 1, cardToEdit: [],
  deckIndex: null
}

const rootReducer = (state = defaultState, action) => {
  switch(action.type){
    case 'UPDATE_SUBJECT':
      return {...state, subject: action.payload}

    case 'ADD_CARD':
      return {...state, currentDeck: state.currentDeck.concat(action.payload.card)}

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

    case 'NEW_DECK':
      let newDeck = action.payload
      return {...state, existingDecks: state.existingDecks.concat(newDeck)}

    case 'SET_DISPLAY_ID':
      return {...state, displayId: action.payload}

    case 'RESET_DISPLAY_ID':
      return {...state, displayId: null}

    case 'EDIT_EXISTING':
    console.log('in reducer, payload', action.payload )
      return {
        ...state,
        cardToEdit: action.payload.card,
        deckIndex: action.payload.deckIndex
      }

    case 'SAVE_CHANGES':
      let idx = action.payload.deckIndex
      let deck = state.existingDecks[idx]
      //console.log('in reducer, SAVE_CHANGES:', deck.cards)
      let editedCards = deck.cards.map(card => {
        if (card.id === action.payload.card.id) {
          console.log('** card.id **:', card.id)
          return action.payload.card
        }
        else {
          return card
        }
      })

      let existingDecks = state.existingDecks.map((deck,i) => {
        if (i === parseInt(idx, 10)) {
          deck.cards = editedCards
        }
        return deck
      })

      return {
        ...state,
        existingDecks: existingDecks
      }

    default:
      return state
  }
}

export default rootReducer
