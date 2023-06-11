import { useEffect, useState } from "react";
import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
export default function MainTitle({ navigation, text, goTo }) {
  const [goToWhere, setGoToWhere] = useState([]);

  useEffect(() => {
    if (goTo) {
      setGoToWhere(goTo);
    }
  }, []);

  const backBtn = () => {
    // 네비게이션 스택이 있다면 뒤로 가기 버튼을 출력
    const backText = "< Back";
    if (navigation.canGoBack() && goToWhere?.length == 0) {
      return (
        <TouchableOpacity
          style={styles.touchBack}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>{backText}</Text>
        </TouchableOpacity>
      );
    } else if (goToWhere?.length > 0) {
      return (
        <TouchableOpacity
          style={styles.touchBack}
          onPress={() =>
            Alert.alert(
              "주의",
              "서버 선택 화면으로 돌아가시겠습니까?",
              [
                // 버튼 배열
                {
                  text: "아니요", // 버튼 제목

                  style: "cancel",
                },
                {
                  text: "네",
                  onPress: () =>
                    navigation.reset({ routes: [{ name: goToWhere }] }),
                }, //버튼 제목
                // 이벤트 발생시 로그를 찍는다
              ],
              { cancelable: false }
            )
          }
        >
          <Text style={styles.backText}>{backText}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.mainTitleContainer}>
      <View style={styles.leftView}>{backBtn()}</View>
      <View style={styles.textView}>
        <Text style={styles.mainTitleText}>{text}</Text>
      </View>
      <View style={styles.rightView}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitleContainer: {
    width: "100%",
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    flexDirection: "row",
  },
  leftView: {
    height: "100%",
    flex: 2,
  },
  textView: {
    height: "100%",
    flex: 6,
    justifyContent: "center",
  },
  rightView: {
    height: "100%",
    flex: 2,
  },
  mainTitleText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  touchBack: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    marginLeft: 15,
    color: "#6e6e6e",
  },
});
