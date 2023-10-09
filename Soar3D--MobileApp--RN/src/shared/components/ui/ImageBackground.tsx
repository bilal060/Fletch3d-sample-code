import React, { ReactNode } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  Image,
} from "react-native";
import LinearGradient, {
  LinearGradientProps,
} from "react-native-linear-gradient";

interface GradientImageProps {
  source: ImageSourcePropType;
  gradientProps: LinearGradientProps;
  style?: ViewStyle;
  children?: ReactNode;
}

const GradientImage: React.FC<GradientImageProps> = ({
  source,
  gradientProps,
  style,
  children,
}) => {
  return (
    <ImageBackground source={source} style={style} imageStyle={styles.image}>
      <LinearGradient
        style={styles.gradient}
        locations={[0.5, 1]}
        {...gradientProps}
      />
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GradientImage;
