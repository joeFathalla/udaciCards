import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECKS_STORAGE_KEY, formatDeckResults } from "./_decks";

export function fetchDeckResults() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatDeckResults);
}

export function submitNewDeck({ title }) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}
export function submitNewCard({ deckId, question, answer }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const data = { ...JSON.parse(results) };
    data[deckId].questions.push({ question, answer });
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}

export function removeDeck(key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
