export const updateSubject = (subject) => {
  return {type: 'UPDATE_SUBJECT', payload: subject}
}

export const addCard = (card) => {
  return {
      type: 'ADD_CARD',
      payload: { card }
    }
}

export const editCard = (card) => {
  return {
    type: 'EDIT_CARD',
    payload: { card }
  }
}
