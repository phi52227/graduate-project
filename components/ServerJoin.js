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

import Appcontext from "./AppContext";
import { TextInput } from "react-native-gesture-handler";

export default function ServerChoice(props, { navigation }) {
  const myContext = useContext(Appcontext);
  const [text, setText] = React.useState("비밀번호");

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
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

        {/* 여기 내용이 들어간다 */}
        <View style={styles.modalContainer}>
          <View style={styles.textView}>
            <Text style={styles.serverText}>{props.name + " 서버"}</Text>
            <Text style={styles.descText}>
              {props.name + " 서버에 참가하려면\n비밀번호를 입력해주세요"}
            </Text>
          </View>
          <View style={styles.passwordView}>
            <TextInput
              style={styles.textInput}
              onChangeText={setText}
              value={text}
              clearTextOnFocus={true}
              onFocus={() => setText("")}
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
                <Text style={styles.buttonText}>서버 참가</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 여기까지 */}

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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  middleContainer: {
    width: "100%",
    flex: 60,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomContainer: {
    width: "100%",
    flex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  middleSideContainer: {
    flex: 5,
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "flex-start",
    flex: 95,
    backgroundColor: "#f2f2f2",
    borderWidth: 2,
  },
  touchOutside: {
    width: "100%",
    height: "100%",
  },
  buttonView: {
    width: "90%",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    width: "45%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  serverText: {
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  descText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    flexWrap: "wrap",
    color: "#424242",

    marginBottom: 20,
  },
  textView: {
    width: "100%",
    alignContent: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  passwordView: {
    width: "100%",
    alignContent: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  textInput: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
  },
});
