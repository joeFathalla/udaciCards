import React from "react";
import { View, Text } from "react-native";

export default function DeckTitle({ deck }) {
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}>
        {deck.title}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 16 }}>
        {deck.questions.length} cards
      </Text>
    </View>
  );
}
