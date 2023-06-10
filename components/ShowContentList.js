import React, { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { firebase_db } from "../firebaseConfig";
import ModalContentDesc from "./ModalContentDesc";
import ServerCreateStore from "./ServerCreateStore";

export default function ShowContentList(props) {
  const contentList = props.contentList;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentDesc, setContentDesc] = useState([]);

  const { setPickedContent, setTeamNumber } = ServerCreateStore();

  useEffect(() => {
    getContentDesc().then(setContentDesc);
  }, []);

  const getContentDesc = () =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/contents/")
          .once("value")
          .then((snapshot) => {
            let obj = snapshot.val();
            resolve(obj);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const modalVisible = (stage) => {
    setIsModalVisible(!isModalVisible);
    if (stage?.length > 0) {
      props.refreshStage(stage);
    }
  };

  const showContents = () => {
    let arr = [];

    for (let i = 0; i < contentList.length; i++) {
      arr.push(
        <TouchableOpacity
          onPress={() => {
            setPickedContent(contentList[i]);
            modalVisible();
          }}
          key={i}
          style={styles.contentBtn}
        >
          <Text style={styles.contentText} key={i}>
            {contentList[i]}
          </Text>
          <ModalContentDesc
            isModalVisible={isModalVisible}
            modalVisible={modalVisible}
            contentState={contentDesc}
          />
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
