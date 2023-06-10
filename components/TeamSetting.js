import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

import ServerCreateStore from "./ServerCreateStore";

export default function TeamSetting(props) {
  const [isTrue, setIsTrue] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [teamNamesMessage, setTeamNamesMessage] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const { teamNumber, basicInfo, setBasicInfo } = ServerCreateStore();
  useEffect(() => {
    firstSetting(teamNumber);
  }, []);

  const patternName = /[가-힣a-zA-Z0-9]/;

  const firstSetting = (num) => {
    let nameArr = [];
    let messageArr = [];
    let trueArr = [];
    for (let i = 0; i < num; i++) {
      nameArr.push("팀 이름");
      messageArr.push("");
      trueArr.push(false);
    }
    setTeamNames(nameArr);
    setTeamNamesMessage(messageArr);
    setIsTrue(trueArr);
  };

  const nameIsTrue = (num, bool) => {
    let isTrueArr = isTrue;
    isTrueArr[num] = bool;
    setIsTrue(isTrueArr);
    setRefresh(!refresh);
  };

  const setMessage = (num, message) => {
    let teamMessage = teamNamesMessage;
    teamMessage[num] = message;
    setTeamNamesMessage(teamMessage);
    setRefresh(!refresh);
  };

  const setName = (num, name) => {
    let names = teamNames;
    names[num] = name;
    setTeamNames(names);
    setRefresh(!refresh);
  };

  const changeName = (num, text) => {
    let arr = text.split("");
    for (let i = 0; i < arr.length; i++) {
      if (patternName.test(arr[i])) {
        nameIsTrue(num, true);
        setMessage(num, "");
      } else {
        nameIsTrue(num, false);
        setMessage(num, "사용할 수 없는 이름입니다");
      }
    }
    if (text.length == 0) {
      nameIsTrue(num, false);
      setMessage(num, "");
    } else if (text.length < 2) {
      nameIsTrue(num, false);
      setMessage(num, "2글자 이상이어야 합니다");
    }
    setName(num, text);
  };

  const getTeamsName = (teamNum) => {
    let arr = [];
    for (let i = 0; i < teamNum; i++) {
      arr.push(
        <View key={"View" + i}>
          <Text style={styles.contentText} key={"Text" + i}>
            {"팀" + (i + 1) + " 이름"}
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              changeName(i, text.replace(/\s/g, ""));
            }}
            value={teamNames[i]}
            maxLength={15}
            onFocus={() => {
              setName(i, "");
              changeName(i, "");
            }}
            key={"TextInput" + i}
          />
          <Text style={styles.messageText} key={"TextMessage" + i}>
            {teamNamesMessage[i]}
          </Text>
        </View>
      );
    }
    return arr;
  };

  const cancel = () => {
    props.refreshStage("basicInfoInput");
  };

  const next = () => {
    let canNext;
    for (let check in isTrue) {
      if (isTrue[check]) {
        canNext = true;
      } else {
        canNext = false;
        break;
      }
    }

    if (canNext) {
      let dupCheck = false;
      for (let i = 0; i < teamNames.length; i++) {
        const currElem = teamNames[i];

        for (let j = i + 1; j < teamNames.length; j++) {
          if (currElem === teamNames[j]) {
            dupCheck = true;
            Alert.alert("팀 이름은 같을 수 없습니다");
            break;
          }
        }
      }
      if (!dupCheck) {
        props.refreshStage("contentSetting");
        console.log("next");
        let info = basicInfo;
        info.team = teamNames;
        setBasicInfo(info);
        console.log("🚀 ~ file: TeamSetting.js:149 ~ next ~ info:", info);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={48}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>팀 이름 설정</Text>
        <ScrollView style={styles.scrollview}>
          {getTeamsName(teamNumber)}
        </ScrollView>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={() => cancel()}>
            <Text style={styles.buttonText}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => next()}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    fontWeight: "600",
    textAlign: "left",
    marginLeft: "7%",
    marginTop: 20,
  },
  buttonView: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
    alignSelf: "center",
    paddingHorizontal: "7%",
  },
  button: {
    width: "40%",
    aspectRatio: 5 / 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "#E0F8F7",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
  },
  textInput: {
    height: 40,
    marginVertical: 15,
    marginHorizontal: "7%",
    borderWidth: 1,
    padding: 10,
  },
  messageText: {
    height: 20,
    fontSize: 13,
    fontWeight: "400",
    textAlign: "left",
    marginLeft: "7%",
    marginTop: 7,
    color: "red",
  },
});
