import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MainTitle({ text }) {
  return (
    <View style={styles.mainTitleContainer}>
      <Text style={styles.mainTitleText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitleContainer: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  mainTitleText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
