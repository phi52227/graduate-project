import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
import { ScrollView } from "react-native-gesture-handler";
const isIOS = Platform.OS === "ios";

export default function ServerList({ navigation, haveServerTrue }) {
  const [userJoinedServer, setUserJoinedServer] = useState([]);
  const [serverList, setServerList] = useState([]);
  const [isJoinedServer, setIsJoinedServer] = useState(false);
  const [joinedServerTeam, setJoinedServerTeam] = useState([]);
  useEffect(() => {
    getDevice()
      .then(getUserJoinedServerName)
      .then(getUserJoinedServer)
      .then(setUserJoinedServer);
    getServers().then(setServerList);
    getDevice().then(getUserJoinedServerTeam).then(setJoinedServerTeam);
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

  const getServers = () =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/server/")
          .once("value")
          .then((snapshot) => {
            let serverList = snapshot.val();
            resolve(serverList);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const getUserJoinedServerName = (user) =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/user/" + user)
          .once("value")
          .then((snapshot) => {
            let userData = snapshot.val();
            let userJoinedServer = userData["joinedServer"];
            resolve(userJoinedServer);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const getUserJoinedServerTeam = (user) =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/user/" + user)
          .once("value")
          .then((snapshot) => {
            let userData = snapshot.val();
            let userJoinedServerTeam = userData["joinedServerTeam"];
            resolve(userJoinedServerTeam);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const getUserJoinedServer = (serverName) =>
    new Promise((resolve, reject) => {
      if (serverName?.length > 0) {
        setIsJoinedServer(true);
        haveServerTrue();
        try {
          firebase_db
            .ref("/project_hi/server/" + serverName)
            .once("value")
            .then((snapshot) => {
              let server = snapshot.val();
              resolve(server);
            });
        } catch (err) {
          console.error(err);
        }
      }
    });

  const joinServer = (name, team) => {
    if (team) {
      navigation.reset({
        routes: [{ name: "ServerMain", params: { name: name } }],
      });
    } else {
      // navigation.reset({
      //   routes: [{ name: "TeamChoice", params: { name: name } }],
      // });
      navigation.navigate("TeamChoice", { name: name });
    }
  };

  const showJoinedServer = () => {
    let arr = [];
    if (isJoinedServer) {
      let name = userJoinedServer?.name;
      arr.push(
        <TouchableOpacity
          onPress={() => joinServer(name, joinedServerTeam)}
          key={-1}
        >
          <View
            style={[styles.serverContainer, { backgroundColor: "#E0F8F7" }]}
            key={-1}
          >
            <View style={styles.ServerLeftView}>
              <Text style={styles.ServerText}>{userJoinedServer?.name}</Text>
            </View>
            <View style={styles.ServerRightView}>
              <Text style={styles.ServerText}>
                {userJoinedServer?.producer}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      arr.push(
        <View style={styles.serverContainer} key={-1}>
          <View style={[styles.ServerLeftView, { alignItems: "center" }]}>
            <Text style={styles.ServerText}>참가 중인 서버가 없습니다</Text>
          </View>
        </View>
      );
    }
    return arr;
  };

  const showAllServer = () => {
    let arr = [];
    if (serverList) {
      let list = Object.keys(serverList);

      for (let server in serverList) {
        let number = list.indexOf(server);
        arr.push(
          <TouchableOpacity
            onPress={() => {
              if (isJoinedServer) {
                Alert.alert(
                  "참가 중인 서버가 있으면\n새로운 서버에 참가할 수 없습니다"
                );
              } else {
                navigation.navigate("ServerJoin", {
                  name: serverList[server].name,
                  password: serverList[server].password,
                });
              }
            }}
            key={number}
          >
            <View
              style={[
                styles.serverContainer,
                {
                  // borderBottomWidth: list.length - 1 !== number ? 1 : 0,
                  borderBottomColor: "#1c1c1c",
                },
              ]}
              key={number}
            >
              <View style={styles.ServerLeftView}>
                <Text style={styles.ServerText}>{serverList[server].name}</Text>
              </View>
              <View style={styles.ServerRightView}>
                <Text style={styles.ServerText}>
                  {serverList[server].producer}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      arr.push(
        <View style={styles.serverContainer} key={0}>
          <View style={[styles.ServerLeftView, { alignItems: "center" }]}>
            <Text style={styles.ServerText}>생성된 서버가 없습니다</Text>
          </View>
        </View>
      );
    }
    return arr;
  };

  return (
    <View style={styles.container}>
      <View style={styles.ServerTitleView}>
        <Text style={styles.myServerTitle}>참가 중인 서버</Text>
      </View>
      <View style={styles.myServerContainer}>{showJoinedServer()}</View>
      <View style={styles.ServerTitleView}>
        <Text style={styles.serverListTitle}>서버 목록</Text>
      </View>
      <ScrollView style={styles.serverListContainer}>
        {showAllServer()}
      </ScrollView>
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
  myServerContainer: {
    width: "100%",
    height: 60,
    borderBottomWidth: 2,
  },
  serverListContainer: {
    width: "100%",
    flex: 1,
  },
  serverContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
  },
  ServerLeftView: {
    height: "100%",
    flex: 5,
    justifyContent: "center",
  },
  ServerRightView: {
    height: "100%",
    flex: 3,
    alignItems: "flex-end",
    justifyContent: "center",
    borderLeftWidth: 2,
    borderLeftColor: "#d8d8d8",
  },
  ServerTitleView: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 2,
    backgroundColor: "#BDBDBD",
  },
  myServerTitle: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  serverListTitle: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  ServerText: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 10,
  },
});
