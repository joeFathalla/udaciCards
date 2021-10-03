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
import { submitNewDeck } from "../utils/api";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { blue, white } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <Text style={styles.submitBtnTxt}>Create Deck</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends React.Component {
  state = {
    title: ""
  };

  submit = () => {
    const { title } = this.state;

    this.props.dispatch(
      addDeck({
        [title]: {
          title,
          questions: []
        }
      })
    );

    this.setState(() => ({
      title: ""
    }));

    this.toHome();

    submitNewDeck({ title });
  };

  toHome = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What is the title of your new deck ?</Text>
          <TextInput
            style={styles.inputText}
            placeholder="enter Title"
            onChangeText={(text) => this.setState({ title: text })}
            defaultValue={this.state.title}
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

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AddDeck);
