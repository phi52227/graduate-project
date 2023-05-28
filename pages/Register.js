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
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import data from "../profileImg.json";
import ChoiceImage from "../components/ChoiceImage";

const dev_width = Dimensions.get("window").width;

export default function Register({ navigation, route }) {
  useEffect(() => {
    //setImageState(data.image);
  });

  //const [image, setImageState] = useState([]);
  const [text, onChangeText] = React.useState("사용자명");

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.innerContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.mainTitleText}>사용자 등록</Text>
        <Text style={styles.titleText}>사용자명을 입력해주세요</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={styles.titleText}>프로필 이미지를 선택해주세요</Text>
      </View>
      {/* 여기 for문으로 ChoiceImage 컴포넌트 호출 예정 */}
      <ChoiceImage content={data.image} key={data.image.idx} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    flex: 1,
    justifyContent: "center",
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
    marginTop: 20,
  },
  textInput: {
    width: "100%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
