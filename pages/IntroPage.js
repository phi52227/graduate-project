import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform,
  Appearance,
} from "react-native";
import DoubleTapToClose from "../components/DoubleTapToClose";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

const isIOS = Platform.OS === "ios";
const theme = Appearance.getColorScheme();

export default function IntroPage({ navigation, route }) {
  const [isId, setIsId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDevice().then(checkIsInfo).then(check);
  }, []);

  const check = (bool) => {
    checkIsID(bool);
    setIsLoading(true);
  };

  const getDevice = () =>
    new Promise((resolve, reject) => {
      if (isIOS) {
        let iosId = Application.getIosIdForVendorAsync();
        userUniqueId = iosId;
      } else {
        userUniqueId = Application.androidId;
      }
      resolve(userUniqueId);
    });

  const checkIsInfo = (userDevice) =>
    new Promise((resolve, reject) => {
      console.log(
        "🚀 ~ file: IntroPage.js:72 ~ newPromise ~ userDevice:",
        userDevice
      );
      try {
        firebase_db
          .ref("/project_hi/user/" + userDevice)
          .once("value")
          .then((snapshot) => {
            let userInfo = snapshot.val();
            resolve(userInfo);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const checkIsID = (userInfo) => {
    console.log("🚀 ~ file: IntroPage.js:30 ~ checkIsID ~ userInfo:", userInfo);
    if (userInfo) setIsId(true);
  };

  const start = () => {
    if (isLoading) {
      if (isId) {
        navigation.reset({ routes: [{ name: "ServerChoice" }] });
      } else {
        navigation.reset({ routes: [{ name: "Register" }] });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DoubleTapToClose navigation={navigation} />
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
          activeOpacity={1}
          onPress={() => start()}
        >
          <View style={styles.titleview}>
            <Text style={styles.title}>졸업{"\n"}프로젝트</Text>
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
    fontSize: 90,
    fontWeight: "700",
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "700",
  },
  touchToStart: {
    backgroundColor: "(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
});
