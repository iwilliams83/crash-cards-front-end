export const updateSubject = (subject) => {
  return {type: 'UPDATE_SUBJECT', payload: subject}
}

export const addCard = (card) => {
  return {
      type: 'ADD_CARD',
      payload: { card }
    }
}

// edit a card while you are creating a deck
export const editCard = (card, id) => {
  return {
    type: 'EDIT_CARD',
    payload: { card, id }
  }
}

// delete card while creating deck
export const deleteCard = (id) => {
  return {
    type: 'DELETE_CARD',
    payload: id
  }
}

export const storeCurrentDecks = (deckObjects) => {
  return {
    type: 'STORE_DECKS',
    payload: deckObjects
  }
}

export const newDeck = (subject, cards) => {
  return {
    type: 'NEW_DECK',
    payload: {subject, cards}
  }
}

export const setDisplayId = (deckId) => {
  return {
    type: 'SET_DISPLAY_ID',
    payload: deckId
  }
}

export const resetDisplayId = () => {
  return {
    type: 'RESET_DISPLAY_ID'
  }
}

//edit an existing card
export const editExisting = (card, deckIndex) => {
  return {
    type: 'EDIT_EXISTING',
    payload: {card, deckIndex}
  }
}

export const deleteExisting = (cardId, cardIndex, deckIndex) => {
  return {
    type: 'DELETE_EXISTING',
    payload: {cardId, cardIndex, deckIndex}
  }
}

export const setDeckId = (deckId, deckIndex) => {
  return {
    type: 'SET_DECK_ID',
    payload: {deckId, deckIndex}
  }
}

export const addToExisting = (card, deckId) => {
  console.log('hitting action')
  console.log('=== card ===', card)
  console.log('=== deckId ===', deckId)
  return {
    type: 'ADD_TO_EXISTING',
    payload: {card, deckId}
  }
}

export const saveChanges = (card, deckIndex) => {
  return {
    type: 'SAVE_CHANGES',
    payload: {card, deckIndex}
  }
}

export function fetchDecks(id){
  return function(dispatch) {
    return fetch(`http://localhost:3000/api/v1/users/${id}`)
      .then(res => res.json())
        .then(res => dispatch(storeCurrentDecks(res)))
  }
}

export function saveDeck(userId, subject, cards){
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/decks`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({userId, subject, cards})
    })
    .then(res => res.json())
    .then(res => dispatch(newDeck(res.data.attributes.subject, res.data.attributes.cards)))
  }
}

export function saveEditedCard(card, deckIndex){
  return function(dispatch){
     dispatch(saveChanges(card, deckIndex))
     return fetch(`http://localhost:3000/api/v1/cards/${card.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({card})
    })
  }
}

export function deleteSelected(cardId, cardIndex, deckIndex){
  return function(dispatch){
    dispatch(deleteExisting(cardId, cardIndex, deckIndex))
    return fetch(`http://localhost:3000/api/v1/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({cardId})
    })
  }
}

export function saveNewCard(card, deckId){
  return function(dispatch){
     dispatch(addToExisting(card, deckId))
     return fetch(`http://localhost:3000/api/v1/cards`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({card, deckId})
    })
  }
}
