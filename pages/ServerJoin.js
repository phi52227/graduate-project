import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import MainTitle from "../components/MainTitle";
import Profile from "../components/Profile";
import DoubleTapToClose from "../components/DoubleTapToClose";

export default function ServerJoin({ navigation, route }) {
  const [text, setText] = useState("비밀번호");
  const [passwordWrong, setWrong] = useState("");

  const name = route.params.name;
  const password = route.params.password;

  const checkPW = (pw) => {
    password == pw ? console.log("확인") : setWrong("비밀번호가 틀렸습니다");
  };

  return (
    <SafeAreaView style={styles.container}>
      <DoubleTapToClose navigation={navigation} />
      <MainTitle text={"서버 참가"} navigation={navigation} />
      <Profile />
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.test}>
        <View style={styles.modalContainer}>
          <View style={styles.textView}>
            <Text style={styles.serverText}>{name + " 서버"}</Text>
            <Text style={styles.descText}>
              {name + " 서버에 참가하려면\n비밀번호를 입력해주세요"}
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
                onPress={() => {
                  navigation.goBack();
                }}
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
      </Pressable>
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
  test: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    justifyContent: "flex-start",
    borderWidth: 2,
    width: "80%",
    aspectRatio: 1 / 1.5,
    marginHorizontal: "10%",
    marginVertical: "10%",
    alignItems: "center",
  },
  buttonView: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    width: "35%",
    aspectRatio: 4 / 2,
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
  view: {
    flex: 1,
  },
});
