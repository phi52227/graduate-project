import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
  Keyboard,
  BackHandler,
} from "react-native";
import data from "../profileImg.json";
import ChoiceImage from "../components/ChoiceImage";
import Appcontext from "../components/AppContext";
import MainTitle from "../components/MainTitle";
import DoubleTapToClose from "../components/DoubleTapToClose";

export default function Register({ navigation, route }) {
  const [text, setText] = useState("사용자명을 입력해주세요");
  const [isImage, setISImageState] = useState(false);
  const [imageUri, setUri] = useState([]);
  const [image_idx, setImage_idx] = useState(-1);
  //context 사용하기
  const myContext = useContext(Appcontext);
  /** ChoiceImage 컴포넌트에서 이미지를 터치했을 때 실행되는 함수
   * 여기에 이미지가 선택되었는지 확인하는 기능을 추가하면 될 듯.
   */
  function touchFunction(source, idx) {
    setISImageState(true);
    setUri(source);
    setImage_idx(idx);
  }

  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }
  /** 사용자 등록 버튼을 눌렀을 때 작동하는 함수
   * 여기에는 사용자명을 입력하고 이미지를 선택했는지에 대한 여부를 확인하여
   * 데이터베이스에 사용자 정보를 저장하는 역할을 하는 함수 넣기
   * 동시에 서버 선택화면으로 이동, navigation stack reset.
   */
  function register(text, uri) {
    //인수를 데이터베이스에 저장하고 페이지 전환하기
    console.log(text, uri);
    myContext.setUserState(text, uri);
    myContext.setIdx(image_idx);
    navigation.reset({ routes: [{ name: "ServerChoice" }] });
  }

  function okFunction() {
    // 함수 구현
    if (text == "사용자명을 입력해주세요" || text == "") {
      notifyMessage("사용자명을 입력해주세요");
    } else if (isImage == false) {
      notifyMessage("프로필 이미지를 선택해주세요");
    } else {
      register(text, imageUri);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <DoubleTapToClose navigation={navigation} />
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.test}>
        <MainTitle text={"사용자 등록"} navigation={navigation} />
        <View
          style={styles.innerContainer}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text style={styles.titleText}>사용자명</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setText(text.replace(/\s/g, ""))}
            value={text}
            clearTextOnFocus={true}
            onFocus={() => setText("")}
          />
          <Text style={styles.titleText}>프로필 이미지</Text>
        </View>
        <ChoiceImage
          content={data.image}
          key={data.image.idx}
          touchFunction={(value, number) => touchFunction(value, number)}
        />
        <TouchableOpacity
          style={styles.okButton}
          activeOpacity={0.5}
          onPress={() => okFunction()}
        >
          <Text style={styles.okText}>사용자 등록</Text>
        </TouchableOpacity>
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
    height: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    alignItems: "center",
  },
  imageChoiceContainer: {
    backgroundColor: "green",
    width: "100%",
    marginTop: 20,
  },
  mainTitleContainer: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  mainTitleText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  titleText: {
    width: "100%",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "left",
    marginTop: 15,
  },
  textInput: {
    width: "100%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  okButton: {
    width: "90%",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderWidth: 1,
    backgroundColor: "#BDBDBD",
  },
});
