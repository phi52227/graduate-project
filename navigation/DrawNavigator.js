import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import ServerMain from "../pages/ServerMain";
import ServerChat from "../pages/ServerChat";
import ServerStore from "../pages/ServerStore";
import ServerInventory from "../pages/ServerInventory";
import { StatusBar } from "expo-status-bar";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ServerMain"
      screenOptions={{
        swipeEnabled: true,
        headerStyle: {
          //   backgroundColor: "#E6E6E6",
          borderBottomWidth: 2,
          borderBottomColor: "black",
        },
      }}
    >
      <Drawer.Screen
        name="ServerMain"
        component={ServerMain}
        options={{ drawerLabel: "ServerMain" }}
        swip
      />
      <Drawer.Screen
        name="ServerChat"
        component={ServerChat}
        options={{ drawerLabel: "ServerChat" }}
      />
      <Drawer.Screen
        name="ServerStore"
        component={ServerStore}
        options={{ drawerLabel: "ServerStore" }}
      />
      <Drawer.Screen
        name="ServerInventory"
        component={ServerInventory}
        options={{ drawerLabel: "ServerInventory" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
