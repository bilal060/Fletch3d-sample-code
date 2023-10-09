import { useEffect, useRef } from "react";
import { Animated, Keyboard } from "react-native";

type AnimatedButtonProps = {
  children: JSX.Element;
  onKeyboardShow?: () => void;
  onKeyboardHide?: () => void;
  fullHeight?: boolean;
};

const AnimatedButton = ({
  children,
  onKeyboardHide,
  onKeyboardShow,
  fullHeight,
}: AnimatedButtonProps): JSX.Element => {
  const bottomHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardWillShow",
      _keyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardWillHide",
      _keyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function _keyboardHide() {
    Animated.timing(bottomHeight, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    if (onKeyboardHide) onKeyboardHide();
  }

  function _keyboardShow(e: any) {
    Animated.timing(bottomHeight, {
      toValue: fullHeight
        ? e.endCoordinates.height
        : e.endCoordinates.height - 120,
      useNativeDriver: false,
    }).start();
    if (onKeyboardShow) onKeyboardShow();
  }

  return (
    <Animated.View style={{ bottom: bottomHeight }}>{children}</Animated.View>
  );
};

export default AnimatedButton;
