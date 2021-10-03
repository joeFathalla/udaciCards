import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";
import { deleteDeck } from "../actions";
import { removeDeck } from "../utils/api";
import TextButton from "./TextButton";
import DeckTitle from "./DeckTitle";

class DeckDetail extends Component {
  reset = () => {
    const { deckId } = this.props;
    this.props.navigation.navigate("Home");

    removeDeck(deckId);

    this.props.dispatch(deleteDeck(deckId));
  };

  addCard = () => {
    const { deckId } = this.props;
    this.props.navigation.navigate("AddCard", { deckId });
  };

  startQuiz = () => {
    const { deckId } = this.props;
    this.props.navigation.navigate("StartQuiz", { deckId });
  };

  render() {
    const { deck } = this.props;
    if (typeof deck === "undefined") {
      return (
        <View style={styles.container}>
          <Text>No Deck Found</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <DeckTitle deck={deck} />
        </View>
        <View style={styles.btnContainer}>
          <TextButton
            parentStyle={{
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 1,
              padding: 10,
              borderRadius: 7,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              marginTop: 10,
              marginBottom: 10
            }}
            style={{ color: "#000", padding: 10 }}
            onPress={this.addCard}
          >
            Add Card
          </TextButton>
          <TextButton
            parentStyle={{
              backgroundColor: "black",
              borderColor: "black",
              borderWidth: 1,
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
            onPress={this.startQuiz}
          >
            Start Quiz
          </TextButton>
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
            style={{ padding: 10 }}
            onPress={this.reset}
          >
            Delete Deck
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
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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

export default connect(mapStateToProps)(DeckDetail);
