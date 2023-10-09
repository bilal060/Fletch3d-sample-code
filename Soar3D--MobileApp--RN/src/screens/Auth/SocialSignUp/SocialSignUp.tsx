import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import { SocialSignUpRouteProp } from "shared/navigators";
import useSocialSignUp from "./useSocialSignUp";
import {
  ErrorText,
  Heading,
  IconButton,
  Text,
  TextButton,
  TextInput,
} from "shared/components/ui";
import useThemeImages from "assets/images";
import CheckBox from "@react-native-community/checkbox";
import { ArrowRight } from "react-native-feather";
import AnimatedButton from "shared/components/ui/AnimatedButton";
import { normalizeHeight } from "shared/utils/dimension";

const SocialSignUp = (): JSX.Element => {
  const {
    params: { code },
  } = useRoute<SocialSignUpRouteProp>();
  const {
    doGoogleRegister,
    formData,
    handleInviteCodeChange,
    handleTermsCheck,
    errorMessage,
  } = useSocialSignUp(code);
  const { AppIconLight } = useThemeImages();

  return (
    <View style={styles.root}>
      <View>
        <Image source={AppIconLight} style={styles.image} />
        <Heading style={styles.heading}>Set up your profile.</Heading>
        <Text style={styles.subHeading}>
          Create your account to start your journey with XSpada.
        </Text>
        <TextInput
          placeholder="Invite Code"
          onChangeText={handleInviteCodeChange}
          value={formData.invite_code}
          keyboardType="default"
        />
        <View>
          <View style={styles.checkBoxWrapper}>
            <CheckBox
              boxType="square"
              onCheckColor={"#FFF"}
              onFillColor={"#7680FF"}
              style={{ width: 20, height: 20, marginRight: 8, marginTop: 4 }}
              value={formData.terms}
              onChange={handleTermsCheck}
            />
            <View>
              <Text>
                I'm at least 18 years old and agree to the {"\n"} following
                terms:
              </Text>
              <Text style={{ marginTop: 12 }}>
                By tapping Next, I've read and agree to the {"\n"}{" "}
                <TextButton>Terms of Service Agreement</TextButton> to receive
                all communications electronically.
              </Text>
            </View>
          </View>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </View>
      </View>
      <AnimatedButton fullHeight={false}>
        <IconButton
          label="Continue"
          Icon={<ArrowRight color="#fff" />}
          onPress={doGoogleRegister}
        />
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "5.3%",
    justifyContent: "space-between",
    paddingBottom: "10%",
  },
  image: {
    marginTop: 20,
    maxWidth: 70,
    maxHeight: 60,
  },
  heading: {
    marginTop: 16,
    marginBottom: 8,
    color: "#262525",
  },
  subHeading: {
    color: "#262525",
    fontSize: 14,
    marginBottom: normalizeHeight(24),
  },
  checkBoxWrapper: {
    flexDirection: "row",
    marginTop: normalizeHeight(20),
    marginLeft: 2,
    alignItems: "flex-start",
  },
});

export default SocialSignUp;
