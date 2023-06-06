import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import data from "../profileImg.json";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

const dev_width = Dimensions.get("window").width * 0.8;
const dev_width_90 = dev_width * 0.9 - 4;

export default function ChangeImage(props) {
  const content = data.image;

  const [userName, setUserName] = useState([]);
  const [imageName, setImageName] = useState([]);
  const [selectedImageidx, setImageIdx] = useState(-1);

  useEffect(() => {
    getDevice()
      .then(getUserInfo)
      .then((userInfo) => {
        setImageName(content[userInfo.imageIdx].name);
        setImageIdx(userInfo.imageIdx);
        setUserName(userInfo.name);
      });
  }, []);

  const getDevice = () =>
    new Promise((resolve, reject) => {
      if (isIOS) {
        let iosId = Application.getIosIdForVendorAsync();
        userUniqueId = iosId;
      } else {
        userUniqueId = Application.androidId;
      }
      resolve(userUniqueId);
    });

  const getUserInfo = (userDevice) =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/user/" + userDevice)
          .once("value")
          .then((snapshot) => {
            let userInfo = snapshot.val();
            resolve(userInfo);
          });
      } catch (err) {
        console.error(err);
      }
    });

  /** 이미지 클릭했을 때 동작하는 함수
   * 지금음 선택된 이미지 Text를 변경하고 있음..
   */
  function touchImage(data) {
    props.touchFunction(userName, data.image, data.idx);
    setImageIdx(data.idx);
    setImageName(data.name);
  }

  function popImage(data) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      if (i % 2 == 0 && i !== data.length - 1) {
        arr.push(
          <View style={styles.imageContainer} key={data[i].idx}>
            <TouchableOpacity
              onPress={() => touchImage(data[i])}
              style={[
                styles.circleImage,
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
              onPress={() => touchImage(data[i + 1])}
              style={[
                styles.circleImage,
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
              onPress={() => touchImage(data[i])}
              style={[
                styles.circleImage,
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
      <Text style={styles.descText}>
        변경할 프로필 이미지를{"\n"}선택해주세요
      </Text>
      <View style={styles.textBox}>
        <Text style={styles.choiceText}>선택된 이미지 : </Text>
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
    paddingBottom: 10,
  },
  imageChoiceContainer: {
    width: "90%",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
    backfaceVisibility: "hidden",
    flex: 1,
  },
  circleImage: {
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
    backgroundColor: "white",
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
  descText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
});

// border가 image에 가려져서 보이지 않는 거 해결해야 됨.
