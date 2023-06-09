import React, { useEffect, useState, useContext, useCallback } from "react";
import { Platform, ToastAndroid, BackHandler } from "react-native";

export const ExcuteOnlyOnAndroid = (props) => {
  const navigation = props.navigation;
  const [backPressCount, setBackPressCount] = useState(0);

  const handleBackPress = useCallback(() => {
    if (backPressCount === 0) {
      setBackPressCount((prevCount) => prevCount + 1);
      setTimeout(() => setBackPressCount(0), 2000);
      ToastAndroid.show(
        "'뒤로' 버튼을 한 번 더 누르시면 종료됩니다",
        ToastAndroid.SHORT
      );
    } else if (backPressCount === 1) {
      BackHandler.exitApp();
    }
    return true;
  }, [backPressCount]);

  useEffect(() => {
    if (Platform.OS === "android" && !navigation.canGoBack()) {
      const backListener = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return backListener.remove;
    }
  }, [handleBackPress]);
  return <></>;
};

export default function DoubleTapToClose({ navigation }) {
  return <ExcuteOnlyOnAndroid navigation={navigation} />;
}
