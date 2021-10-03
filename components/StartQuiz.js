import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";
import TextButton from "./TextButton";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

class StartQuiz extends Component {
  state = {
    questionId: 0,
    correct: 0,
    isDone: false,
    showAnswer: false
  };

  showHandler = () => {
    this.setState((prev) => ({ ...prev, showAnswer: !prev.showAnswer }));
  };

  back = (id) => {
    this.props.navigation.navigate("DeckDetail", { deckId: id });
  };

  startOverHandler = () => {
    this.setState({
      questionId: 0,
      correct: 0,
      isDone: false,
      showAnswer: false
    });
  };

  answerHandler = (answer) => {
    const { deck } = this.props;
    const { questionId } = this.state;
    if (deck.questions.length === questionId + 1) {
      clearLocalNotification().then(setLocalNotification());
    }

    this.setState((prev) => ({
      correct:
        deck.questions[questionId].answer === answer
          ? prev.correct + 1
          : prev.correct,
      isDone: deck.questions.length === questionId + 1,
      questionId: questionId + 1,
      showAnswer: false
    }));
  };

  render() {
    const { deck, deckId } = this.props;
    const { questionId, correct, isDone, showAnswer } = this.state;

    if (typeof deck === "undefined") {
      return (
        <View style={styles.noCardContainer}>
          <Text>No Deck Found</Text>
        </View>
      );
    }
    if (deck.questions.length === 0) {
      return (
        <View style={styles.noCardContainer}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24
            }}
          >
            Sorry, you cannot take a quiz because there are no cards in the deck
          </Text>
        </View>
      );
    }

    if (isDone) {
      return (
        <View style={styles.container}>
          <View style={styles.noCardContainer}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 24
              }}
            >
              Well Done !!
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 24
              }}
            >
              {`your score is ${Math.floor(
                (correct * 100) / deck.questions.length
              )} %`}
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TextButton
              parentStyle={{
                backgroundColor: "black",
                padding: 10,
                borderRadius: 7,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                marginTop: 10,
                marginBottom: 10
              }}
              style={{ color: "#fff", padding: 10 }}
              onPress={this.startOverHandler}
            >
              Restart Quiz
            </TextButton>
            <TextButton
              parentStyle={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 7,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                marginTop: 10,
                marginBottom: 10
              }}
              style={{ color: "#fff", padding: 10 }}
              onPress={() => this.back(deckId)}
            >
              Back to Deck
            </TextButton>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.counterContainer}>
          <Text>{`${questionId + 1}/${deck.questions.length}`}</Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {showAnswer
              ? deck.questions[questionId].answer
              : deck.questions[questionId].question}
          </Text>
          <TextButton
            parentStyle={{
              padding: 10,
              borderRadius: 7,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              marginTop: 10,
              marginBottom: 10
            }}
            style={{ color: "red", padding: 10, fontWeight: "bold" }}
            onPress={this.showHandler}
          >
            Show Answer
          </TextButton>
        </View>
        <View style={styles.btnContainer}>
          <TextButton
            parentStyle={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 7,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              marginTop: 10,
              marginBottom: 10
            }}
            style={{ color: "#fff", padding: 10 }}
            onPress={() => this.answerHandler("yes")}
          >
            Correct
          </TextButton>
          <TextButton
            parentStyle={{
              backgroundColor: "red",
              padding: 10,
              borderRadius: 7,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              marginTop: 10,
              marginBottom: 10
            }}
            style={{ color: "#fff", padding: 10 }}
            onPress={() => this.answerHandler("no")}
          >
            Correct
          </TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  noCardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white,
    padding: 15
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  question: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold"
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state, { route }) {
  const { deckId } = route.params;

  return {
    deckId,
    deck: state[deckId]
  };
}

export default connect(mapStateToProps)(StartQuiz);
