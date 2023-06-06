import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Appcontext from "./AppContext";
import ModalsettingIcon from "./ModalSettingIcon";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

const isIOS = Platform.OS === "ios";
//myContext로 불러오는 부분 다 firebase에서 가져오도록 수정 예정

export default function Profile({ navigation, route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userImg, setUserImg] = useState(
    "https://firebasestorage.googleapis.com/v0/b/project-hi-60da4.appspot.com/o/images%2Fwhite.png?alt=media&token=7d8db406-30d2-4332-9db6-c01bd65c1a32&_gl=1*1cbag1p*_ga*MTMxODcyMjYyNC4xNjgyNjY0NzY4*_ga_CW55HF8NVT*MTY4NjA4MjAyMy4xNy4xLjE2ODYwODIwNzguMC4wLjA."
  );
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    getDevice()
      .then(getUserInfo)
      .then((userInfo) => {
        setUserImg(userInfo.profileImg);
        setUserName(userInfo.name);
      });
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

  const modalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const refresh = (image) => {
    setUserImg(image);
  };

  return (
    <View style={styles.profileView}>
      <View style={styles.profileViewLeft}>
        <Image style={styles.profileImg} source={{ uri: userImg }} />
        <Text style={styles.profileName}>{userName}</Text>
      </View>
      <View style={styles.profileViewRight}>
        <TouchableOpacity
          style={styles.settingContainer}
          onPress={() => modalVisible()}
        >
          <Image
            style={styles.settingImage}
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/12/04/22/23/gear-1077563_1280.png",
            }}
          />
          <ModalsettingIcon
            isModalVisible={isModalVisible}
            modalVisible={modalVisible}
            refresh={(image) => refresh(image)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileView: {
    width: "100%",
    height: 40,
    // paddingHorizontal: dev_width * 0.05,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    flexDirection: "row",
  },
  profileViewLeft: {
    height: "100%",
    flex: 7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileViewRight: {
    height: "100%",
    flex: 3,
    justifyContent: "center",
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-start",
  },
  settingImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    margin: 5,
    alignSelf: "flex-end",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    marginLeft: 5,
  },
});
