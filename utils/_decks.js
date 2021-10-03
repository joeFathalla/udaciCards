// utils/_descks.js
import AsyncStorage from "@react-native-async-storage/async-storage";
export const DECKS_STORAGE_KEY = "UdaciCards:decks";

const dummyData = {
  React: {
    title: "React",
    questions: [
      {
        question: "Is React a library for managing user interfaces?",
        answer: "yes"
      },
      {
        question:
          "do you make Ajax requests in React in the componentDidMount lifecycle event?",
        answer: "yes"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer: "no"
      }
    ]
  }
};

function setDummyData() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

export function formatDeckResults(results) {
  return results === null ? setDummyData() : JSON.parse(results);
}
