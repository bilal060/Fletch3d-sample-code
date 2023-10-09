import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const Heading = (props: TextProps) => {
  return <Text style={[styles.heading, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    color: "#262525",
    fontFamily: "Poppins-SemiBold",
  },
});

export default Heading;
