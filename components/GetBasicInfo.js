import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import ServerCreateStore from "./ServerCreateStore";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
import { RadioButton } from "react-native-paper";

const isIOS = Platform.OS === "ios";

export default function GetBasicInfo(props) {
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [teamArr, setTeamArr] = useState([]);

  const [userName, setUserName] = useState("");
  const [serverName, setServerName] = useState("서버 이름");
  const [serverPassword, setPassword] = useState("비밀번호를 입력해주세요");
  const [passwordcheck, setPasswordCheck] =
    useState("비밀번호를 다시 입력해주세요");

  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  const [serverNameMessage, setServerNameMessage] = useState([]);
  const [serverPasswordMessage, setServerPasswordMessage] = useState([]);
  const [serverPasswordCheckMessage, setServerPasswordCheckMessage] = useState(
    []
  );

  const { pickedContent, setTeamNumber, setBasicInfo } = ServerCreateStore();

  const patternName = /[가-힣a-zA-Z0-9]/;
  const patternPassword = /(?=.*[a-zA-Z])(?=.*[0-9])/;
  let basicInfo = props.serverSetting;
  let teams = [];

  useEffect(() => {
    getDevice().then(getUserInfo).then(setUserName);
    getContentTeam(pickedContent).then(getTeamArr);
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
          .ref("/project_hi/user/" + userDevice + "/name")
          .once("value")
          .then((snapshot) => {
            let userInfo = snapshot.val();
            resolve(userInfo);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const getContentTeam = (content) =>
    new Promise((resolve, reject) => {
      try {
        firebase_db
          .ref("/project_hi/contents/" + content + "/team")
          .once("value")
          .then((snapshot) => {
            let contentTeam = snapshot.val();
            resolve(contentTeam);
          });
      } catch (err) {
        console.error(err);
      }
    });

  const teamRadio = (teams) => {
    let arr = [];
    if (teams.length > 1) {
      for (let i = 0; i < teams.length; i++) {
        arr.push(
          <RadioButton.Item
            label={teams[i] + "팀"}
            value={teams[i]}
            labelStyle={styles.radioText}
            position={Platform.OS === "android" ? "leading" : "trailing"}
            color="blue"
            style={{ marginHorizontal: "3%", marginVertical: 2 }}
            key={"Radio" + i}
          />
        );
      }
    } else {
      arr.push(
        <Text
          style={[styles.contentText, { fontSize: 20, color: "blue" }]}
          key={"textTeam"}
        >
          이 컨텐츠는 {checked}팀용 입니다
        </Text>
      );
    }
    return arr;
  };

  const getTeamArr = (team) => {
    teams = team.split(" ");
    setLoading(false);
    setRadio(teams);
  };

  const setRadio = (teams) => {
    setChecked(teams[0]);
    setTeamArr(teams);
  };

  const refreshStage = (stage) => {
    props.refreshStage(stage);
  };

  const cancel = () => {
    props.refreshStage("contentPick");
  };

  const next = () => {
    if (isName && isPassword && isPasswordCheck) {
      basicInfo.content = pickedContent;
      basicInfo.name = serverName;
      basicInfo.password = serverPassword;
      basicInfo.producer = userName;
      setBasicInfo(basicInfo);
      setTeamNumber(checked);
      props.refreshStage("teamSetting");
    }
  };

  /**입력된 서버이름이 정규식에 충족한지, 글자 수는 2-8 글자인지  확인하여 오류메세지를 수정
   */
  const changeName = (text) => {
    let arr = text.split("");
    for (let i = 0; i < arr.length; i++) {
      if (patternName.test(arr[i])) {
        setIsName(true);
        setServerNameMessage("");
      } else {
        setIsName(false);
        setServerNameMessage("사용할 수 없는 이름입니다");
        break;
      }
    }
    if (text.length == 0) {
      setIsName(false);
      setServerNameMessage("");
    } else if (text.length < 2) {
      setIsName(false);
      setServerNameMessage("2글자 이상이어야 합니다");
    }
    setServerName(text);
  };

  const changePassword = (password) => {
    if (patternPassword.test(password)) {
      setIsPassword(true);
      setServerPasswordMessage("");
    } else if (password.length == 0) {
      setIsPassword(false);
      setServerPasswordMessage("");
    } else if (password.length < 4 && password.length !== 0) {
      setIsPassword(false);
      setServerPasswordMessage("비밀번호는 최소 4자리 이상입니다");
    } else {
      setIsPassword(false);
      setServerPasswordMessage(
        "비밀번호는 영문자, 숫자 조합을 입력해야 합니다"
      );
    }

    setPassword(password);
  };

  const changePasswordCheck = (password) => {
    if (serverPassword == password) {
      setIsPasswordCheck(true);
      setServerPasswordCheckMessage("비밀번호가 일치합니다");
    } else if (password.length == 0) {
      setIsPasswordCheck(false);
      setServerPasswordCheckMessage("");
    } else {
      setIsPasswordCheck(false);
      setServerPasswordCheckMessage("비밀번호가 일치하지 않습니다");
    }
    setPasswordCheck(password);
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { justifyContent: isLoading ? "center" : "flex-start" },
      ]}
      behavior="padding"
      keyboardVerticalOffset={48}
    >
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.titleText}>서버 정보 입력</Text>
          <ScrollView style={styles.scrollview}>
            <View style={styles.contentView}>
              <Text style={styles.contentText}>서버 이름</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  changeName(text.replace(/\s/g, ""));
                }}
                value={serverName}
                maxLength={8}
                onFocus={() => {
                  setServerName("");
                  changeName("");
                }}
              />
              <Text style={styles.messageText} key={"serverNameMessage"}>
                {serverNameMessage}
              </Text>

              <Text style={styles.contentText}>비밀번호</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  changePassword(text.replace(/\s/g, ""));
                }}
                value={serverPassword}
                maxLength={15}
                onFocus={() => {
                  setPassword("");
                  changePassword("");
                }}
              />
              <Text style={styles.messageText} key={"serverPasswordMessage"}>
                {serverPasswordMessage}
              </Text>

              <Text style={styles.contentText}>비밀번호 확인</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  changePasswordCheck(text.replace(/\s/g, ""));
                }}
                value={passwordcheck}
                maxLength={15}
                onFocus={() => {
                  setPasswordCheck("");
                  changePasswordCheck("");
                }}
              />
              <Text
                style={[
                  styles.messageText,
                  { color: isPasswordCheck ? "green" : "red" },
                ]}
                key={"serverPasswordCheckMessage"}
              >
                {serverPasswordCheckMessage}
              </Text>
              <Text style={[styles.contentText, { marginBottom: 10 }]}>
                팀 개수 선택
              </Text>
              <RadioButton.Group
                onValueChange={(value) => setChecked(value)}
                value={checked}
                key={"radio"}
              >
                {teamRadio(teamArr)}
              </RadioButton.Group>
            </View>
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
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  scrollview: {
    width: "100%",
    flex: 1,
  },
  contentView: {
    width: "100%",
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: "7%",
    marginTop: 20,
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
  textInput: {
    height: 40,
    marginTop: 12,
    marginHorizontal: "7%",
    borderWidth: 1,
    padding: 10,
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
  radioText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
    marginLeft: 10,
  },
});
