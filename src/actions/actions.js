export const updateSubject = (subject) => {
  return {type: 'UPDATE_SUBJECT', payload: subject}
}

export const addCard = (card) => {
  console.log('hitting addCard', card)
  return {
      type: 'ADD_CARD',
      payload: { card }
    }
}
