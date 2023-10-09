import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  StyleSheetProperties,
  Image,
} from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import { fontSize, scalableheight } from "shared/constants/resposnevaraiable";

interface DetailPopupItem {
  label: string;
  inputText?: string;
  Icon?: JSX.Element;
  propStyle?: StyleSheetProperties;
  propTextStyle?: StyleSheetProperties;
}

export default function DetailPopupItem(props: DetailPopupItem) {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.childContainer}>
        <CheckBox
          //value={isSelected}
          //onValueChange={setSelection}
          style={{
            alignSelf: "center",
            backgroundColor: "#F4F6F6",
            borderColor: "#F4F6F6",
            borderWidth: 0,
            borderRadius: 0,
          }}
        />
        <Text style={styles.postDeatilTypeText}>{props?.label}</Text>
      </View>

      <View
        style={{
          width: "40%",
          alignItems: "center",
          height: "100%",
          // justifyContent: "space-between",
          flexDirection: "row",
          //backgroundColor: "red",
        }}
      >
        <Text style={styles.postText}>{props.inputText}</Text>
        {props.Icon && (
          <Image
            //   style={{ marginLeft: scalableheight.three }}
            source={props.Icon}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    height: scalableheight.six,
    //backgroundColor: "red",
    borderTopColor: "#F4F6F6",
    borderBottomColor: "#F4F6F6",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  childContainer: {
    width: "60%",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  postDeatilTypeText: {
    fontWeight: "600",
    color: "#0E100F",
    fontFamily: "Poppins-Regular",
    lineHeight: 16,
    fontSize: fontSize.twelve,
    marginLeft: 6,
  },
  postText: {
    fontWeight: "500",
    color: "#7E8491",
    fontFamily: "Poppins-Regular",
    lineHeight: 16,
    fontSize: fontSize.twelve,
  },
});
