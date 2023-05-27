import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform,
  Appearance,
} from "react-native";

const width = Dimensions.get("window").width;
const theme = Appearance.getColorScheme();

export default function Loading({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme === "light" ? "#fff" : "#000"}
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <ImageBackground
        source={{
          uri: "https://cdn.pixabay.com/photo/2023/05/04/14/22/mountain-7970232_1280.jpg",
        }}
        style={styles.bgImage}
      >
        <TouchableOpacity
          style={styles.touchToStart}
          onPress={() => navigation.navigate("Register")}
        >
          <View style={styles.titleview}>
            <Text style={styles.title}>TITLE</Text>
          </View>
          <View style={styles.textview}>
            <Text style={styles.text}>Touch to START</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleview: {
    flex: 2,
    justifyContent: "center",
  },
  textview: {
    flex: 1,
    // justifyContent: "center",
  },
  title: {
    fontSize: 100,
    fontWeight: "700",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
  touchToStart: {
    backgroundColor: "(0,0,0,0.5)",
    height: "100%",
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
});
