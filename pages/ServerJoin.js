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

const dev_width = Dimensions.get("window").width;

export default function ServerChoice({ navigation, route }) {
  useEffect(() => {
    // console.log(myContext.userSettingImageIdx);
  }, []);
  const myContext = useContext(Appcontext);

  return (
    <SafeAreaView style={styles.container}>
      <MainTitle text={"서버 참가 화면"} navigation={navigation} />
      <Profile />
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
});
