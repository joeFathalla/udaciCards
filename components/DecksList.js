import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { recieveDecks } from "../actions";
// import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchDeckResults } from "../utils/api";
// import { Agenda as UdaciFitnessCalendar } from "react-native-calendars";
import { white } from "../utils/colors";
// import DateHeader from "./DateHeader";
// import MetricCard from "./MetricCard";
import AppLoading from "expo-app-loading";
import DeckTitle from "./DeckTitle";

class DecksList extends Component {
  state = {
    ready: false
    // selectedDate: new Date().toISOString().slice(0, 10)
  };
  componentDidMount() {
    const { dispatch } = this.props;

    fetchDeckResults()
      .then((decks) => dispatch(recieveDecks(decks)))
      .then(() => {
        this.setState(() => ({
          ready: true
        }));
      });
  }

  // shouldComponentUpdate(nextProps) {
  //   if (Object.keys(this.props.decks).length === 0) {
  //     return true;
  //   } else if (
  //     nextProps.decks !== this.props.decks &&
  //     Object.keys(nextProps.decks).length !== 0
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  renderItem = (item, deck) => (
    <View key={item} style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("DeckDetail", { deckId: item })
        }
      >
        <DeckTitle deck={deck} />
      </TouchableOpacity>
    </View>
  );

  renderEmptyDate() {
    return (
      <View style={styles.item}>
        {/* <DateHeader date={formattedDate} /> */}
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    );
  }
  render() {
    const { decks } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View>
        <FlatList
          data={Object.keys(decks)}
          renderItem={({ item }) => this.renderItem(item, decks[item])}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DecksList);
