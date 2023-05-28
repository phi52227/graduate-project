import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const dev_width = Dimensions.get("window").width;

export default function ChoiceImage({ content }) {
  function popImage(data) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      if (i % 2 == 0 && i !== data.length - 1) {
        arr.push(
          <View style={styles.container} key={data[i].idx}>
            <TouchableHighlight
              onPress={() => Alert.alert("touch")}
              style={styles.imageContainerLeft}
            >
              <Image
                source={{ uri: data[i].image }}
                style={styles.profileImage}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => Alert.alert("touch")}
              style={styles.imageContainerRight}
            >
              <Image
                source={{ uri: data[i + 1].image }}
                style={styles.profileImage}
              />
            </TouchableHighlight>
          </View>
        );
      } else if (i % 2 == 0 && i == data.length - 1) {
        arr.push(
          <View style={styles.container} key={data[i].idx}>
            <TouchableHighlight
              onPress={() => Alert.alert("touch")}
              style={styles.imageContainerLeft}
            >
              <Image
                source={{ uri: data[i].image }}
                style={styles.profileImage}
              />
            </TouchableHighlight>
          </View>
        );
      }
    }
    return arr;
  }

  return (
    <ScrollView style={styles.imageChoiceContainer}>
      {popImage(content)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageChoiceContainer: {
    width: "100%",
    marginTop: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "black",
    flex: 1,
  },
  imageContainerLeft: {
    width: dev_width * 0.35 + 6,
    height: dev_width * 0.35 + 6,
    borderRadius: (dev_width * 0.35 + 6) / 2,
    margin: (dev_width * 0.13) / 2,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainerRight: {
    width: dev_width * 0.35 + 6,
    height: dev_width * 0.35 + 6,
    borderRadius: (dev_width * 0.35 + 6) / 2,
    margin: (dev_width * 0.13) / 2,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: dev_width * 0.35,
    height: dev_width * 0.35,
    borderRadius: (dev_width * 0.35) / 2,
  },
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
});
