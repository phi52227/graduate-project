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
import DoubleTapToClose from "../components/DoubleTapToClose";
import { firebase_db } from "../firebaseConfig";

export default function ServerChoice({ navigation, route }) {
  const [serverList, setServerList] = useState([]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: ServerChoice.js:22 ~ ServerChoice ~ serverList:",
      serverList
    );
    refreshServer();
  }, []);

  const refreshServer = () => {
    getServer().then(setServerList);
    console.log(
      "🚀 ~ file: ServerChoice.js:30 ~ ServerChoice ~ serverList:",
      serverList
    );
  };

  const getServer = () =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/server/")
          .once("value")
          .then((snapshot) => {
            let serverList = snapshot.val();
            resolve(serverList);
          });
      } catch (err) {
        console.error(err);
      }
    });

  return (
    <SafeAreaView style={styles.container}>
      <DoubleTapToClose navigation={navigation} />
      <MainTitle text={"서버 선택 화면"} navigation={navigation} />
      <Profile />
      <ScrollView style={styles.scrollview}>
        <TouchableOpacity
          style={styles.test}
          onPress={() => {
            navigation.navigate("ServerJoin", {
              name: "Test1",
              password: "1234",
            });
          }}
        >
          <Text style={styles.buttonText}>테스트 버튼</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.test}
          onPress={() =>
            navigation.navigate("ServerJoin", {
              name: "Test2",
              password: "1234",
            })
          }
        >
          <Text style={styles.buttonText}>테스트 버튼</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginTop: 20,
    borderWidth: 1,
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
  test: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    // alignContent: "center",
    // justifyContent: "center",
  },
});
