import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ServerCreateStore from "../components/ServerCreateStore";
import Profile from "../components/Profile";
import MainTitle from "../components/MainTitle";
import DoubleTapToClose from "../components/DoubleTapToClose";
import ShowContentList from "../components/ShowContentList";
import GetBasicInfo from "../components/GetBasicInfo";

import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

export default function ServerChoice({ navigation, route }) {
  const [serverSetting, setServerSetting] = useState([]);
  const [teamSetting, setTeamSetting] = useState([]);
  const [teamNum, setTeamNum] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [createStage, setCreateStage] = useState(["contentPick"]);

  const { pickedContent } = ServerCreateStore();

  useEffect(() => {
    getJsonUrl().then(getJson);
  }, []);

  const refreshStage = (stage) => {
    setCreateStage(stage);
  };

  const getJsonUrl = () =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/json/")
          .once("value")
          .then((snapshot) => {
            let obj = snapshot.val();
            resolve(obj);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const getJson = async (obj) => {
    try {
      const url = obj.serversettings;
      const contents = obj.contents;
      const response = await fetch(url);
      const json = await response.json();
      setServerSetting(json.server);
      setTeamSetting(json.team);
      setContentList(contents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showWhat = () => {
    let arr = [];
    if (createStage == "contentPick") {
      arr.push(
        <ShowContentList
          contentList={contentList}
          key={createStage}
          refreshStage={(value) => refreshStage(value)}
        />
      );
    } else if (createStage == "basicInfoInput") {
      arr.push(
        <GetBasicInfo
          serverSetting={serverSetting}
          key={createStage}
          refreshStage={(value) => refreshStage(value)}
        />
      );
    } else if (createStage == "teamSetting") {
      //sss
    } else {
      //asdasd
    }
    return arr;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        // { justifyContent: isLoading ? "center" : "flex-start" },
      ]}
    >
      <MainTitle text={"서버 생성 화면"} navigation={navigation} />
      <DoubleTapToClose navigation={navigation} />
      <Profile />
      <View style={styles.contentView}>
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <View style={styles.view}>{showWhat()}</View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  view: {
    width: "100%",
    flex: 1,
  },
});
