import { View, Text, Image, StyleSheet, ImageProps } from "react-native";
import React from "react";
import { fontSize, scalableheight } from "shared/constants/resposnevaraiable";
import useThemeImages from "assets/images";

interface ScanDeatilsitemtype {
  name: string;
  Icon: React.ElementType<SVGElement>;
  onClick?: void;
}

export default function ScanDeatilsOption(props: ScanDeatilsitemtype) {
  const { Icon, name } = props;
  return (
    <View style={style.childContainer}>
      <Icon />
      <Text style={style.text}>{name}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  parentContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: "2%",
  },
  childContainer: {
    width: "23%",
    height: scalableheight.eleven,
    backgroundColor: "#F0F0F0",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "400",
    color: "#5E5D5D",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
    fontSize: fontSize.fifteen,
    marginTop: 7,
  },
});
