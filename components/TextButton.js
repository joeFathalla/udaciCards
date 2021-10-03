import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue } from "../utils/colors";

export default function TextButton({
  children,
  onPress,
  style = {},
  parentStyle = {}
}) {
  return (
    <TouchableOpacity onPress={onPress} style={parentStyle}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: "center",
    color: blue
  }
});
