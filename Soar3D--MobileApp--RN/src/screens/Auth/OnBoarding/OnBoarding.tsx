import useThemeImages from "assets/images";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  useWindowDimensions,
} from "react-native";
import { ArrowRight, ArrowUp } from "react-native-feather";
import useOnBoarding from "./useOnBoarding";
import { Text, Heading } from "shared/components/ui";
import { fontSize } from "shared/constants/resposnevaraiable";

interface SliderScreenProps extends ViewProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  width: number;
  height: number;
  isLastSlide: boolean;
  isSecondSlide: boolean;
  handleNextSlide: () => void;
}

const SliderScreen = (props: SliderScreenProps): JSX.Element => {
  const {
    style,
    image,
    description,
    title,
    width,
    height,
    isLastSlide,
    isSecondSlide,
    handleNextSlide,
  } = props;
  return (
    <View style={[styles.sliderContainer, style]}>
      <View
        style={{
          width: "100%",
          height: "100%",
          marginTop: 80,
          justifyContent: "flex-end",
        }}
      >
        <Image
          source={image}
          resizeMode="contain"
          style={{ width: "100%", height: isSecondSlide ? "75%" : "75%" }}
        />
      </View>
      <View style={styles.textContainer}>
        <Heading style={{ textAlign: "center", fontSize: fontSize.twentyfour }}>
          {title}
        </Heading>
        <Text
          style={{
            marginTop: 8,
            textAlign: "center",
            fontSize: fontSize.fourteen,
          }}
        >
          {description}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#7680FF",
            padding: 10,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
          onPress={handleNextSlide}
        >
          <ArrowRight color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const slides = [
  {
    image: require("assets/images/OnBoarding/OnBoardingFirst.png"),
    title: "Immerse Yourself In Any Space",
    description:
      "With our cutting-edge AI technology, create models from your videos to get immersed in your videos and memories.",
  },
  {
    image: require("assets/images/OnBoarding/OnBoardingSecond.png"),
    title: "Fly Through Videos",
    description:
      "Record videos anytime from the comfort of your phone and upload it to our servers for quick processing and conversion into 3D models.",
  },
  {
    image: require("assets/images/OnBoarding/OnBoardingThird.png"),
    title: "Walkthrough Ready",
    description:
      "Have your videos converted to 3D models and make them walk through ready to visit anytime anywhere from your phone.",
  },
];

const OnBoarding = (): JSX.Element => {
  const { Ellipses } = useThemeImages();
  const { width, height } = useWindowDimensions();
  const { handleNextSlide, activeSlide, scrollRef, handleSkipSlides } =
    useOnBoarding(width);

  return (
    <View style={{ backgroundColor: "#7680FF", height, paddingBottom: 10 }}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkipSlides}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          width,
          height,
          justifyContent: "center",
        }}
      >
        <Image source={Ellipses} style={{ resizeMode: "contain", width }} />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        {slides.map((item, index) => (
          <SliderScreen
            {...item}
            key={index}
            style={{ width, height }}
            width={width}
            height={height}
            isLastSlide={index === slides.length - 1}
            isSecondSlide={index === 1}
            handleNextSlide={handleNextSlide}
          />
        ))}
      </ScrollView>
      <View style={[styles.sliderDotContainer, { bottom: 110 }]}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={
              activeSlide === index ? styles.sliderDotActive : styles.sliderDot
            }
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: "20%",
  },
  textContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  sliderDotContainer: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#E2E3E4",
    marginHorizontal: 8,
  },
  sliderDotActive: {
    width: 16,
    height: 8,
    borderRadius: 30,
    backgroundColor: "#7680FF",
    marginHorizontal: 8,
  },
  skipButton: {
    position: "absolute",
    paddingHorizontal: 14,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
    top: "5%",
    right: "5%",
    zIndex: 100,
  },
  skipButtonText: {
    fontSize: fontSize.ten,
  },
});

export default OnBoarding;
