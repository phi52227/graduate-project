import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import Profile from "../components/Profile";
import MainTitle from "../components/MainTitle";
import ServerList from "../components/ServerList";
import DoubleTapToClose from "../components/DoubleTapToClose";

export default function ServerChoice({ navigation, route }) {
  const [haveServer, setHaveServer] = useState(false);

  useEffect(() => {}, []);

  const haveServerTrue = () => {
    setHaveServer(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DoubleTapToClose navigation={navigation} />
      <MainTitle text={"서버 선택 화면"} navigation={navigation} />
      <Profile />
      <View style={styles.scrollview}>
        <ServerList navigation={navigation} haveServerTrue={haveServerTrue} />
      </View>
      <View style={styles.unnderScroll}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => {
            if (!haveServer) {
              navigation.navigate("ServerCreate");
            } else {
              Alert.alert("참가 중인 서버가 있으면\n서버를 생성할 수 없습니다");
            }
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
    flex: 1,
    marginTop: 20,
    borderWidth: 2,
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
});
