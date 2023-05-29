import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import data from "../profileImg.json";
import ChoiceImage from "../components/ChoiceImage";

export default function Register({ navigation, route }) {
  useEffect(() => {}, []);

  const [text, setText] = React.useState("사용자명을 입력해주세요");
  const [isImage, setISImageState] = useState(false);
  const [imageUri, setUri] = useState([]);

  /** ChoiceImage 컴포넌트에서 이미지를 터치했을 때 실행되는 함수
   * 여기에 이미지가 선택되었는지 확인하는 기능을 추가하면 될 듯.
   */
  function touchFunction(source) {
    setISImageState(true);
    setUri(source);
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
   * 동시에 서버 선택화면으로 이동, navigation stack reset
   */
  function register(text, uri) {
    //인수를 데이터베이스에 저장하고 페이지 전환하기
    console.log(text, uri);
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
      <View
        style={styles.innerContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.mainTitleText}>사용자 등록</Text>
        <Text style={styles.titleText}>사용자명</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          value={text}
          clearTextOnFocus={true}
          onFocus={() => setText("")}
        />
        <Text style={styles.titleText}>프로필 이미지</Text>
      </View>
      <ChoiceImage
        content={data.image}
        key={data.image.idx}
        touchFunction={(value) => touchFunction(value)}
      />
      <TouchableOpacity
        style={styles.okButton}
        activeOpacity={0.5}
        onPress={() => okFunction()}
      >
        <Text style={styles.okText}>사용자 등록</Text>
      </TouchableOpacity>
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
  innerContainer: {
    width: "90%",
    alignItems: "center",
  },
  imageChoiceContainer: {
    backgroundColor: "green",
    width: "100%",
    marginTop: 20,
  },
  mainTitleText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
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
