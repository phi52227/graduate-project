import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";

import AppContext from "./components/AppContext";

//문제 생기면 이거 주석 해제해보기

export default function App() {
  // console.disableYellowBox = true;
  console.disableYellowBox = true;

  useEffect(() => {}, []);

  const userSettings = {};

  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <StatusBar style="black" />
        <StackNavigator />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
