import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";

const dev_width = Dimensions.get("window").width;
const dev_width_90 = dev_width * 0.9 - 4;

export default function ChoiceImage(props) {
  useEffect(() => {}, []);
  const [imageName, setImageState] = useState("");
  const [selectedImageidx, setImageIdx] = useState(-1);
  const [choiceImageText, setText] = useState("프로필 이미지를 선택해주세요");
  const content = props.content;
  /** 이미지 클릭했을 때 동작하는 함수
   * 지금음 선택된 이미지 Text를 변경하고 있음
   */
  function touchImage(name, idx) {
    if (choiceImageText == "프로필 이미지를 선택해주세요")
      setText("선택된 이미지 : ");
    setImageIdx(idx);
    setImageState(name);
    props.touchFunction();
  }

  function popImage(data) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      if (i % 2 == 0 && i !== data.length - 1) {
        arr.push(
          <View style={styles.imageContainer} key={data[i].idx}>
            <TouchableOpacity
              onPress={() => touchImage(data[i].name, data[i].idx)}
              style={[
                styles.imageContainerLeft,
                {
                  borderColor:
                    selectedImageidx == data[i].idx ? "red" : "black",
                },
              ]}
              activeOpacity={1}
            >
              <Image
                source={{ uri: data[i].image }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => touchImage(data[i + 1].name, data[i + 1].idx)}
              style={[
                styles.imageContainerRight,
                {
                  borderColor:
                    selectedImageidx == data[i + 1].idx ? "red" : "black",
                },
              ]}
              activeOpacity={1}
            >
              <Image
                source={{ uri: data[i + 1].image }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        );
      } else if (i % 2 == 0 && i == data.length - 1) {
        arr.push(
          <View style={styles.imageContainer} key={data[i].idx}>
            <TouchableOpacity
              onPress={() => touchImage(data[i].name, data[i].idx)}
              style={[
                styles.imageContainerLeft,
                {
                  borderColor:
                    selectedImageidx == data[i].idx ? "red" : "black",
                },
              ]}
              activeOpacity={1}
            >
              <Image
                source={{ uri: data[i].image }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        );
      }
    }
    return arr;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.choiceText}>{choiceImageText}</Text>
        <Text style={styles.imageText}>{imageName}</Text>
      </View>
      <ScrollView style={styles.imageChoiceContainer}>
        {popImage(content)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  imageChoiceContainer: {
    width: "90%",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
    backfaceVisibility: "hidden",
    flex: 1,
  },
  imageContainerLeft: {
    width: dev_width_90 * 0.35 + 6,
    height: dev_width_90 * 0.35 + 6,
    borderRadius: (dev_width_90 * 0.35 + 6) / 2,
    margin: (dev_width_90 * 0.13) / 2,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainerRight: {
    width: dev_width_90 * 0.35 + 6,
    height: dev_width_90 * 0.35 + 6,
    borderRadius: (dev_width_90 * 0.35 + 6) / 2,
    margin: (dev_width_90 * 0.13) / 2,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: dev_width_90 * 0.35,
    height: dev_width_90 * 0.35,
    borderRadius: (dev_width_90 * 0.35) / 2,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  textBox: {
    width: "90%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  choiceText: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "left",
    marginBottom: 10,
    color: "#6e6e6e",
  },
  imageText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
    marginBottom: 10,
    color: "red",
  },
});

// border가 image에 가려져서 보이지 않는 거 해결해야 됨.
