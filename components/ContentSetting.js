import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

import ServerCreateStore from "./ServerCreateStore";

export default function ContentSetting(props) {
  const { basicInfo } = ServerCreateStore();
  const cancel = () => {
    props.refreshStage("teamSetting");
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

  const next = () => {
    getDevice().then((userUniqueId) => {
      try {
        firebase_db
          .ref("/project_hi/user/" + userUniqueId + "/joinedServer")
          .set(basicInfo.name, function (error) {
            if (error) console.error(error);
          });
      } catch (err) {
        console.error(err);
      }
    });
    try {
      firebase_db
        .ref("/project_hi/server/" + basicInfo.name)
        .set(basicInfo, function (error) {
          if (error) console.error(error);
          props.navigation.reset({ routes: [{ name: "ServerChoice" }] });
        });
    } catch (err) {
      console.error(err);
    }
    Alert.alert("서버가 생성되었습니다.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>콘텐츠 세부 설정</Text>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.contentText}>추후에 추가될 기능입니다.</Text>
      </ScrollView>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => cancel()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => next()}>
          <Text style={styles.buttonText}>생성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollview: {
    width: "100%",
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 40,
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
  buttonView: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
    alignSelf: "center",
    paddingHorizontal: "7%",
  },
  button: {
    width: "40%",
    aspectRatio: 5 / 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "#E0F8F7",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
  },
});
