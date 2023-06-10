import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { firebase_db } from "../firebaseConfig";
import ServerCreateStore from "./ServerCreateStore";
import { ScrollView } from "react-native-gesture-handler";

export default function ModalContentDesc(props) {
  const { pickedContent } = ServerCreateStore();
  const contents = props.contentState;
  const desc = contents[pickedContent];

  const saveFunction = () => {
    props.modalVisible("basicInfoInput");
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={props.isModalVisible}
    >
      <TouchableOpacity
        onPress={() => props.modalVisible()}
        activeOpacity={1}
        style={styles.modalOverlay}
      />
      <View style={styles.modalContainer}>
        <ScrollView>
          <View style={styles.contentView}>
            <Text style={styles.titleText}>{desc?.name}</Text>
            <Image
              source={{ uri: desc?.image }}
              style={styles.imageContainer}
            />
            <Text style={styles.descText}>{desc?.desc}</Text>
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.modalVisible()}
          >
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => saveFunction()}
          >
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: Platform.OS === "android" ? "-10%" : 0,
    bottom: "-10%",
    left: "-10%",
    right: "-10%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    borderWidth: 2,
    marginHorizontal: "5%",
    marginVertical: "20%",
  },
  contentView: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  buttonView: {
    width: "90%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
    alignSelf: "center",
  },
  button: {
    width: "45%",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
  },
  descText: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "70%",
    aspectRatio: 1 / 1,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 20,
  },
});
