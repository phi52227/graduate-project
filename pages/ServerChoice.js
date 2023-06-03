import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  BackHandler,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Appcontext from "../components/AppContext";
import Profile from "../components/Profile";
import MainTitle from "../components/MainTitle";
import AppContext from "../components/AppContext";

const dev_width = Dimensions.get("window").width;

export default function ServerChoice({ navigation, route }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainTitle text={"서버 선택 화면"} />
      <Profile />
      <ScrollView style={styles.scrollview}>
        <TouchableOpacity
          style={styles.test}
          onPress={() =>
            navigation.navigate("ServerJoin", {
              name: "Test",
              password: "1234",
            })
          }
        >
          <Text style={styles.buttonText}>테스트 버튼</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.test} onPress={() => modalVisible()}>
          <Text style={styles.buttonText}>테스트 버튼</Text>
          <ServerJoin
            isModalVisible={isModalVisible}
            modalVisible={modalVisible}
            name={"1234"}
          />
        </TouchableOpacity> */}
      </ScrollView>
      <View style={styles.unnderScroll}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => {
            navigation.navigate("ServerCreate");
          }}
        >
          <Text style={styles.buttonText}>서버 생성</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollview: {
    width: "90%",
    marginTop: 20,
    borderWidth: 1,
    alignContent: "center",
  },
  unnderScroll: {
    width: "90%",
    aspectRatio: 4 / 1,
    marginBottom: 20,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    borderRadius: 10,
    borderWidth: 2,
    aspectRatio: 3 / 1,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  test: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    // alignContent: "center",
    // justifyContent: "center",
  },
});
