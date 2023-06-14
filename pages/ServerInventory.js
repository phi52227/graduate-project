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

import Profile from "../components/Profile";
import DoubleTapToClose from "../components/DoubleTapToClose";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

export default function Inventory({ navigation }) {
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
        <View style={{ width: "100%", flex: 1 }}>
          <DoubleTapToClose navigation={navigation} />
          <Profile text={serverName + " - " + teamName} />
          <View style={styles.contentview}>
            <Text style={styles.contentText}>서버 인벤토리 화면</Text>
          </View>
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
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentview: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    fontSize: 40,
    fontWeight: "500",
    textAlign: "center",
  },
});
