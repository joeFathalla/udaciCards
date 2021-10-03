import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  TextInput
} from "react-native";
// import UdaciSlider from "./UdaciSlider";
// import UdaciStepper from "./UdaciStepper";
// import DateHeader from "./DateHeader";
import { submitNewCard } from "../utils/api";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { blue, white } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <Text style={styles.submitBtnTxt}>Submit</Text>
    </TouchableOpacity>
  );
}

class AddCard extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  submit = () => {
    const { question, answer } = this.state;
    const { deckId } = this.props;

    this.props.dispatch(addCard(deckId, question, answer));

    this.setState(() => ({
      question: "",
      answer: ""
    }));

    this.toHome(deckId);

    submitNewCard({ deckId, question, answer });
  };

  toHome = (id) => {
    this.props.navigation.navigate("DeckDetail", { deckId: id });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="enter Question"
            onChangeText={(text) => this.setState({ question: text })}
            defaultValue={this.state.question}
          />
          <TextInput
            style={styles.inputText}
            placeholder="enter Answer"
            onChangeText={(text) => this.setState({ answer: text })}
            defaultValue={this.state.answer}
          />
        </View>
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    marginBottom: 20
  },
  inputText: {
    backgroundColor: white,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    height: 60,
    padding: 5,
    marginTop: 20
  },
  submitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 70,
    marginRight: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnTxt: {
    color: white,
    fontSize: 20,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
});

function mapStateToProps(state, { route }) {
  const { deckId } = route.params;

  return {
    deckId
  };
}

export default connect(mapStateToProps)(AddCard);
