import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { AuthStackNavigatorProps } from "../../../shared/navigators";
import { useAppDispatch } from "shared/hooks/useRedux";
import { setShowOnBoarding } from "store/slices/auth/authSlice";

const useOnBoarding = (width: number) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  const dispatch = useAppDispatch();

  const skipOnBoarding = () => {
    dispatch(setShowOnBoarding(false));
  };

  const handleNextSlide = () => {
    if (activeSlide === 2) {
      skipOnBoarding();
    } else {
      scrollRef?.current?.scrollTo({
        x: (activeSlide + 1) * width,
        y: 0,
        animated: true,
      });
      setActiveSlide(activeSlide + 1);
    }
  };

  const handleSkipSlides = () => {
    skipOnBoarding();
  };

  return {
    activeSlide,
    setActiveSlide,
    scrollRef,
    handleNextSlide,
    handleSkipSlides,
  };
};

export default useOnBoarding;
