import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Appcontext from "../components/AppContext";
import Profile from "../components/Profile";
import MainTitle from "../components/MainTitle";
import ServerCreate from "./ServerCreate";
import ServerJoin from "./ServerJoin";

const dev_width = Dimensions.get("window").width;

export default function ServerChoice({ navigation, route }) {
  useEffect(() => {
    // console.log(myContext.userSettingImageIdx);
  }, []);
  const myContext = useContext(Appcontext);

  return (
    <SafeAreaView style={styles.container}>
      <MainTitle text={"서버 선택 화면"} />
      <Profile />
      <ScrollView style={styles.scrollview}></ScrollView>
      <View style={styles.unnderScroll}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => {
            navigation.navigate("ServerCreate");
          }}
        >
          <Text style={styles.buttonText}>서버 생성</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => {
            navigation.navigate("ServerJoin");
          }}
        >
          <Text style={styles.buttonText}>서버 참가</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollview: {
    width: "90%",
    marginTop: 20,
    borderWidth: 1,
  },
  unnderScroll: {
    width: "90%",
    aspectRatio: 4 / 1,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    borderWidth: 2,
    aspectRatio: 3 / 1,
    // margin: 20,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
