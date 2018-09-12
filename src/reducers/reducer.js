const defaultState = {
  subject: '', currentDeck: [], displayId: null,
  existingDecks: [], userId: 1, cardToEdit: [],
  deckIndex: null, deckId: null
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
      return {
        ...state,
        cardToEdit: action.payload.card,
        deckIndex: action.payload.deckIndex
      }

    case 'SAVE_CHANGES':
      let idx = action.payload.deckIndex
      let deck = state.existingDecks[idx]
      let editedCards = deck.cards.map(card => {
        if (card.id === action.payload.card.id) {
          return action.payload.card
        }
        return card
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
    case 'DELETE_EXISTING':
      let deckIdx = action.payload.deckIndex
      let cardIdx = action.payload.cardIndex
      let cards = state.existingDecks[deckIdx]['cards']
      let cardToDelete = cards[cardIdx]

      let filteredCards = cards.filter(card => {
        if (card !== cardToDelete) {
          return card
        }
      })
      if (filteredCards.length === 0) {
        let allDecks = state.existingDecks.filter((deck,i) => {
          return i !== parseInt(deckIdx)
        })
        return {
          ...state, existingDecks: allDecks
        }
      } else {
        let allDecks = state.existingDecks.map((deck,i) => {
          if (i === parseInt(deckIdx, 10)) {
            deck.cards = filteredCards
          }
          return deck
        })
        return {
          ...state, existingDecks: allDecks
        }
      }

    case 'SET_DECK_ID':
      return {...state, deckId: action.payload.deckId, deckIndex: action.payload.deckIndex}

    case 'ADD_TO_EXISTING':
    
      let cardToSave = action.payload.card
      let deckIndx = state.deckIndex
      let deckToUpdate = {...state.existingDecks[deckIndx]}
      deckToUpdate.cards.push(cardToSave)

      let updatedDecks = state.existingDecks.map((deck, i) => {
        if (i === deckIndx){
          return deckToUpdate
        }
        return deck
      })

      return {...state, existingDecks: updatedDecks}

    default:
      return state
  }
}

export default rootReducer
