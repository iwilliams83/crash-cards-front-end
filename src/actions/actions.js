export const updateSubject = (subject) => {
  return {type: 'UPDATE_SUBJECT', payload: subject}
}

export const addCard = (card) => {
  return {
      type: 'ADD_CARD',
      payload: { card }
    }
}

export const editCard = (card, id) => {
  return {
    type: 'EDIT_CARD',
    payload: { card, id }
  }
}

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

export const newDeck = (userId, subject, cards) => {
  return {
    type: 'NEW_DECK',
    payload: {['user-id']: userId, subject, cards}
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
  return function(dispatch){
    dispatch(newDeck(userId, subject, cards))
    return fetch(`http://localhost:3000/api/v1/decks`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({userId, subject, cards})
    })
  }
}

//
// export const fetchDecks = (id) => (dispatch) =>
//      fetch(`http://localhost:3000/api/v1/users/${id}`)
//       .then(res => res.json())
//         .then(res => dispatch(storeCurrentDecks(res)))
