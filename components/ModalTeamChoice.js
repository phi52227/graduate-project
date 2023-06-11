import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";

export default function ModalTeamChoice(props) {
  const modalVisible = props.isModalVisible[props.num];

  return (
    <Modal animationType={"fade"} transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPress={() => props.modalVisible()}
        activeOpacity={1}
        style={styles.modalOverlay}
      />
      <View style={styles.modalContainer}>
        <View style={styles.contentView}>
          <Text style={styles.titleText}>{"팀 : " + props.teamName}</Text>
          <Text style={styles.descText}>
            {props.teamName +
              "을(를) 선택하셨습니다\n" +
              props.teamName +
              "에 참여하시겠습니까?"}
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.modalVisible();
            }}
          >
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.okFunction()}
          >
            <Text style={styles.buttonText}>확인</Text>
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
    marginVertical: "40%",
  },
  contentView: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 40,
    fontWeight: "700",
    marginTop: 10,
  },
  descText: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 50,
    flexWrap: "wrap",
  },
});
