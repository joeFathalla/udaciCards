import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import AddDeck from "./components/AddDeck";
import StartQuiz from "./components/StartQuiz";
import DecksList from "./components/DecksList";
import DeckDetail from "./components/DeckDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { orange, blue, white } from "./utils/colors";
import AddCard from "./components/AddCard";
import { setLocalNotification } from "./utils/helpers";

const UdaciStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NavTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Platform.OS === "ios" ? blue : white,
      tabBarInactiveTintColor: "black",
      tabBarStyle: {
        backgroundColor: Platform.OS === "ios" ? white : blue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
    <Tab.Screen
      name="Decks"
      component={DecksList}
      options={{
        headerShown: false,
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }}
    />
    <Tab.Screen
      name="Add Deck"
      component={AddDeck}
      options={{
        headerShown: false,
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }}
    />
  </Tab.Navigator>
);

const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={NavTab} />
    <Stack.Screen
      name="DeckDetail"
      component={DeckDetail}
      options={({ route }) => {
        const { deckId } = route.params;
        return {
          title: `${deckId}`,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: blue
          }
        };
      }}
    />
    <Stack.Screen
      name="AddCard"
      component={AddCard}
      options={{
        title: "Add Card",
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        }
      }}
    />
    <Stack.Screen
      name="StartQuiz"
      component={StartQuiz}
      options={{
        title: "Start Quiz",
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        }
      }}
    />
  </Stack.Navigator>
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider
        store={createStore(
          reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={blue} barStyle="light-content" />
          <NavigationContainer>
            <NavStack />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
