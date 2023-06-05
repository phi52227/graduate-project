import React, { useContext, useEffect, useState } from "react";
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
import Appcontext from "../components/AppContext";

const isIOS = Platform.OS === "ios";
const theme = Appearance.getColorScheme();

export default function IntroPage({ navigation, route }) {
  let userUniqueId;
  const myContext = useContext(Appcontext);
  const [isId, setIsId] = useState(false);

  useEffect(() => {
    checkIsID();
  }, []);

  const checkIsID = async () => {
    if (isIOS) {
      let iosId = await Application.getIosIdForVendorAsync();
      userUniqueId = iosId;
    } else {
      userUniqueId = await Application.androidId;
    }

    try {
      firebase_db
        .ref("/project_hi/user/" + userUniqueId)
        .once("value")
        .then((snapshot) => {
          let userInfo = snapshot.val();
          console.log(
            "🚀 ~ file: IntroPage.js:29 ~ .then ~ userInfo:",
            userInfo
          );
          if (userInfo) setIsId(true);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const start = () => {
    try {
      myContext.setDevice(userUniqueId);
      console.log("succes");
    } catch (err) {
      console.log(err);
    }
    if (isId) {
      navigation.reset({ routes: [{ name: "ServerChoice" }] });
    } else {
      navigation.reset({ routes: [{ name: "Register" }] });
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
});
