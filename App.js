import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";

import AppContext from "./components/AppContext";

export default function App() {
  // console.disableYellowBox = true;
  console.disableYellowBox = true;

  const [userName, setUserName] = useState([]);
  const [userImage, setUserImage] = useState([]);
  const [userImageIdx, setUserImageIdx] = useState([]);
  const setUserState = (name, image) => {
    setUserName(name);
    setUserImage(image);
  };
  const setIdx = (idx) => {
    setUserImageIdx(idx);
  };

  const userSettinsg = {
    userSettingName: userName,
    userSettingImage: userImage,
    userSettingImageIdx: userImageIdx,
    setUserState,
    setIdx,
  };

  return (
    <AppContext.Provider value={userSettinsg}>
      <NavigationContainer>
        <StatusBar style="black" />
        <StackNavigator />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
