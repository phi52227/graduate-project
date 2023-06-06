import React, { useContext, useState } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import ChangeImage from "./ChangeImage";
import data from "../profileImg.json";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

export default function ModalsettingIcon(props) {
  const [changeImage, setChangeImage] = useState([]);
  const [changeImageIdx, setChangeImageIdx] = useState([]);
  const [userName, setUserName] = useState([]);

  function touchFunction(name, source, idx) {
    setUserName(name);
    setChangeImage(source);
    setChangeImageIdx(idx);
  }

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

  const saveFunction = (name, image, idx) => {
    //인수를 데이터베이스에 저장하고 페이지 전환하기
    getDevice().then((userUniqueId) => {
      const user = { name: name, profileImg: image, imageIdx: idx };
      firebase_db
        .ref("/project_hi/user/" + userUniqueId)
        .set(user, function (error) {
          if (error)
            console.log("🚀 ~ file: ModalSettingIcon.js:54 ~ error:", error);
        });
      props.modalVisible();
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "프로필 이미지가 변경되었습니다.",
          ToastAndroid.SHORT
        );
      } else {
        Alert.alert("프로필 이미지가 변경되었습니다.");
      }
      props.refresh(changeImage);
    });
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={props.isModalVisible}
    >
      <TouchableOpacity
        onPress={() => props.modalVisible()}
        activeOpacity={1}
        style={styles.modalOverlay}
      />
      <View style={styles.modalContainer}>
        <ChangeImage
          content={data.image}
          touchFunction={(name, value, idx) => touchFunction(name, value, idx)}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.modalVisible()}
          >
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => saveFunction(userName, changeImage, changeImageIdx)}
          >
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: Platform.OS === "android" ? "-10%" : 0,
    bottom: "-10%",
    left: "-10%",
    right: "-10%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    borderWidth: 2,
    marginHorizontal: "5%",
    marginVertical: "20%",
  },
  buttonView: {
    width: "90%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "center",
  },
  button: {
    width: "45%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
  },
});
