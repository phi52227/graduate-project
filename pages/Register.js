import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StackActions } from "@react-navigation/native";

export default function Loading({ navigation, route }) {
  useEffect(() => {});

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>준비중입니다...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdc453",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
