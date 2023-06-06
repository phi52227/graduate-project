import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Profile from "../components/Profile";
import MainTitle from "../components/MainTitle";
import ServerList from "../components/ServerList";
import DoubleTapToClose from "../components/DoubleTapToClose";
import { firebase_db } from "../firebaseConfig";

export default function ServerChoice({ navigation, route }) {
  const [serverList, setServerList] = useState([]);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <DoubleTapToClose navigation={navigation} />
      <MainTitle text={"서버 선택 화면"} navigation={navigation} />
      <Profile />
      <View style={styles.scrollview}>
        <ServerList navigation={navigation} />
      </View>
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
    flex: 1,
    marginTop: 20,
    borderWidth: 2,
    alignContent: "center",
  },
  unnderScroll: {
    width: "90%",
    aspectRatio: 4 / 1,
    marginBottom: 20,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    borderRadius: 10,
    borderWidth: 2,
    aspectRatio: 3 / 1,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
