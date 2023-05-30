import React, { useContext, useState } from "react";
import {
  Alert,
  Pressable,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
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
  }

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={props.isModalVisible}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.touchOutside}
          onPress={() => {
            props.modalVisible();
          }}
          activeOpacity={1}
        />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.middleSideContainer}>
          <TouchableOpacity
            style={styles.touchOutside}
            onPress={() => props.modalVisible()}
          />
        </View>
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
              activeOpacity={1}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => saveFunction()}
              activeOpacity={1}
            >
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleSideContainer}>
          <TouchableOpacity
            style={styles.touchOutside}
            onPress={() => props.modalVisible()}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.touchOutside}
          onPress={() => props.modalVisible()}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    width: "100%",
    flex: 10,
  },
  middleContainer: {
    width: "100%",
    flex: 80,
    flexDirection: "row",
  },
  bottomContainer: {
    width: "100%",
    flex: 10,
  },
  middleSideContainer: {
    flex: 5,
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    flex: 95,
    backgroundColor: "#e6e6e6",
    borderWidth: 2,
  },
  touchOutside: {
    width: "100%",
    height: "100%",
    backgroundColor: "(0, 0, 0, 0.5)",
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
