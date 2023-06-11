import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import MainTitle from "../components/MainTitle";
import Profile from "../components/Profile";
import DoubleTapToClose from "../components/DoubleTapToClose";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
import ModalTeamChoice from "../components/ModalTeamChoice";
const isIOS = Platform.OS === "ios";

export default function TeamChoice({ navigation, route }) {
  const servername = route.params.name;

  const [teamList, setTeamList] = useState([]);
  const [pickedTeam, setPickedTeam] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allFalse, SetAllFalse] = useState([]);

  useEffect(() => {
    getServerTeams().then(first);
  }, []);

  const okFunction = () => {
    modalVisible();
    getDevice().then(setTeam);
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

  const setTeam = (device) => {
    firebase_db
      .ref("/project_hi/user/" + device + "/joinedServerTeam")
      .set(pickedTeam, function (error) {
        if (error) console.error(error);
        navigation.reset({
          routes: [{ name: "ServerMain" }],
        });
      });
  };

  const first = (teams) => {
    setTeamList(Object.keys(teams));
    firstSetting(Object.keys(teams));
  };
  const firstSetting = (teamList) => {
    let list = teamList.map(() => {
      return false;
    });
    setIsModalVisible(list);
    SetAllFalse(list);
  };

  const modalSetting = () => {
    setIsModalVisible(
      teamList.map(() => {
        return false;
      })
    );
  };

  const getServerTeams = () =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/server/" + servername + "/team")
          .once("value")
          .then((snapshot) => {
            let teams = snapshot.val();
            resolve(teams);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const modalVisible = () => {
    modalSetting();
  };

  const choiceTeam = () => {
    // pickedTeam
  };

  const thisModalVisible = (num) => {
    let modalVisibleList = allFalse.map(() => {
      return false;
    });
    modalVisibleList[num] = true;
    setIsModalVisible(modalVisibleList);
  };

  const showTeams = () => {
    let arr = [];
    for (let i = 0; i < teamList.length; i++) {
      arr.push(
        <TouchableOpacity
          onPress={() => {
            setPickedTeam(teamList[i]);
            thisModalVisible(i);
          }}
          key={"touch" + i}
          style={styles.contentBtn}
        >
          <Text style={styles.contentText} key={"text" + i}>
            {teamList[i]}
          </Text>
          <ModalTeamChoice
            isModalVisible={isModalVisible}
            modalVisible={modalVisible}
            navigation={navigation}
            teamName={pickedTeam}
            okFunction={okFunction}
            num={i}
          />
        </TouchableOpacity>
      );
    }
    return arr;
  };

  return (
    <SafeAreaView style={styles.container}>
      <DoubleTapToClose navigation={navigation} />
      <MainTitle text={"팀 선택"} navigation={navigation} />
      <Profile />
      <View style={styles.scrollview}>
        <ScrollView>{showTeams()}</ScrollView>
      </View>
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
    justifyContent: "center",
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
