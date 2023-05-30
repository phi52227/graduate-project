import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Appcontext from "./AppContext";
import ModalsettingIcon from "./ModalSettingIcon";

export default function Profile({ navigation, route }) {
  const myContext = useContext(Appcontext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.profileView}>
      <View style={styles.profileViewLeft}>
        <Image
          style={styles.profileImage}
          source={{ uri: myContext.userSettingImage }}
        />
        <Text style={styles.profileName}>{myContext.userSettingName}</Text>
      </View>
      <View style={styles.profileViewRight}>
        <TouchableOpacity
          style={styles.settingContainer}
          onPress={() => modalVisible()}
        >
          <Image
            style={styles.settingImage}
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/12/04/22/23/gear-1077563_1280.png",
            }}
          />
          <ModalsettingIcon
            isModalVisible={isModalVisible}
            modalVisible={modalVisible}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileView: {
    width: "100%",
    height: 40,
    // paddingHorizontal: dev_width * 0.05,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    flexDirection: "row",
  },
  profileViewLeft: {
    height: "100%",
    flex: 7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileViewRight: {
    height: "100%",
    flex: 3,
    justifyContent: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-start",
  },
  settingImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    margin: 5,
    alignSelf: "flex-end",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    marginLeft: 5,
  },
});
