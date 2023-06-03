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

import Appcontext from "./AppContext";

export default function ModalsettingIcon(props) {
  const myContext = useContext(Appcontext);

  const [changeImage, setChangeImage] = useState([]);
  const [changeIdx, setChangeIdx] = useState([]);

  function touchFunction(source, idx) {
    setChangeImage(source);
    setChangeIdx(idx);
  }

  function saveFunction() {
    myContext.setUserState(myContext.userSettingName, changeImage);
    myContext.setIdx(changeIdx);
    props.modalVisible();
    if (Platform.OS === "android") {
      ToastAndroid.show("프로필 이미지가 변경되었습니다.", ToastAndroid.SHORT);
    } else {
      Alert.alert("프로필 이미지가 변경되었습니다.");
    }
  }

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
          touchFunction={(value, number) => touchFunction(value, number)}
          myContext={myContext}
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
            onPress={() => saveFunction()}
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
