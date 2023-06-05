import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";

import AppContext from "./components/AppContext";

export default function App() {
  // console.disableYellowBox = true;
  console.disableYellowBox = true;
  const [device, setDeviceName] = useState([]);

  const setDevice = (device) => {
    setDeviceName(device);
  };

  const userSettings = {
    userDevice: device,
    setDevice,
  };

  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <StatusBar style="black" />
        <StackNavigator />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
