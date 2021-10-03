import { RECIEVE_DECKS, REMOVE_DECK, ADD_DECK, ADD_CARD } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const newDecks = { ...state };
      newDecks[action.id].questions.push({
        question: action.question,
        answer: action.answer
      });
      return {
        ...newDecks
      };
    case REMOVE_DECK:
      const decks = { ...state };
      decks[action.id] = undefined;
      delete decks[action.id];
      return {
        ...decks
      };
    case RECIEVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    default:
      return state;
  }
}

export default decks;
