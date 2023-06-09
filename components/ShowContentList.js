import React, { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export default function ShowContentList({ navigation, contentList }) {
  const showContents = () => {
    let arr = [];

    for (let i = 0; i < contentList.length; i++) {
      arr.push(
        <TouchableOpacity
          onPress={() => console.log(contentList[i])}
          key={i}
          style={styles.contentBtn}
        >
          <Text style={styles.contentText} key={i}>
            {contentList[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return arr;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>콘텐츠 선택</Text>
      <ScrollView style={styles.scrollview}>{showContents()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollview: {
    width: "100%",
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 40,
  },
  contentBtn: {
    width: "70%",
    aspectRatio: 3 / 1,
    borderWidth: 2,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 20,
  },
  contentText: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
});
