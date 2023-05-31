import { useNavigationState } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function MainTitle({ text, navigation }) {
  //내비게이션 스택의 수
  const routesLength = useNavigationState((state) => state.routes.length);

  const backBtn = () => {
    // 네비게이션 스택이 있다면 뒤로 가기 버튼을 출력
    const backtext = "< Back";
    if (routesLength > 1) {
      return (
        <TouchableOpacity
          style={styles.touchBack}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>{backtext}</Text>
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
