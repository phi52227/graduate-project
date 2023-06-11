import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";

import MainTitle from "../components/MainTitle";
import Profile from "../components/Profile";
import DoubleTapToClose from "../components/DoubleTapToClose";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

export default function ServerMain({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [serverName, setServerName] = useState([]);
  const [teamName, setTeamName] = useState([]);

  useEffect(() => {
    getDevice().then(getUserInfo).then(getUserServerInfo);
  }, []);

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

  const getUserInfo = (userDevice) =>
    new Promise((resolve, reject) => {
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

  const getUserServerInfo = (userInfo) => {
    setServerName(userInfo.joinedServer);
    setTeamName(userInfo.joinedServerTeam);

    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { justifyContent: isLoading ? "center" : "flex-start" },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <DoubleTapToClose navigation={navigation} />
          <MainTitle
            text={serverName + " - " + teamName}
            navigation={navigation}
          />
          <Profile />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollview: {
    width: "90%",
    flex: 1,
    marginVertical: 20,
    borderWidth: 2,
    alignContent: "center",
  },
  contentBtn: {
    width: "70%",
    aspectRatio: 3 / 1,
    borderWidth: 2,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 20,
  },
  contentText: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
});
