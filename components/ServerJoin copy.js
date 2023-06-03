import React, { useContext, useState } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";

import Appcontext from "./AppContext";
import { TextInput } from "react-native-gesture-handler";

export default function ServerChoice(props, { navigation }) {
  const myContext = useContext(Appcontext);
  const [text, setText] = React.useState("비밀번호");
  const [passwordWrong, setWrong] = React.useState("");

  const checkPW = (pw) => {
    props.password == pw
      ? console.log("확인")
      : setWrong("비밀번호가 틀렸습니다");
  };

  return (
    <SafeAreaView>
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
          <View style={styles.textView}>
            <Text style={styles.serverText}>{props.name + " 서버"}</Text>
            <Text style={styles.descText}>
              {props.name + " 서버에 참가하려면\n비밀번호를 입력해주세요"}
            </Text>
          </View>
          <View style={styles.passwordView}>
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={setText}
                value={text}
                clearTextOnFocus={true}
                onFocus={() => {
                  setText("");
                  setWrong("");
                }}
              />
              <Text style={styles.worngText}>{passwordWrong}</Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.modalVisible()}
              >
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => checkPW(text)}
              >
                <Text style={styles.buttonText}>서버 참가</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    backgroundColor: "#f2f2f2",
    borderWidth: 2,
    flex: 1,
    marginHorizontal: "10%",
    marginVertical: "30%",
  },
  buttonView: {
    width: "90%",
    height: 55,
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
  worngText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    flexWrap: "wrap",
    color: "red",
  },
  modalOverlay: {
    position: "absolute",
    top: Platform.OS === "android" ? "-10%" : 0,
    bottom: "-10%",
    left: "-10%",
    right: "-10%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
});
