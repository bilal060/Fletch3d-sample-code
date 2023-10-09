import useThemeImages from "assets/images";
import {
  Animated,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import {
  ErrorText,
  Heading,
  Text,
  TextButton,
  TextInput,
} from "shared/components/ui";
import useSignIn from "./useSignIn";
import { Formik } from "formik";
import CheckBox from "@react-native-community/checkbox";
import IconButton from "shared/components/ui/IconButton";
import { ArrowRight } from "react-native-feather";
import { useStatusBar } from "shared/hooks/useStatusBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AnimatedButton from "shared/components/ui/AnimatedButton";
import { SocicalGoogle } from "assets/icons/Socials";
import { normalizeHeight } from "shared/utils/dimension";

const SignIn = () => {
  const { AppIconLight } = useThemeImages();
  const {
    validationSchema,
    handleSubmitForm,
    handleForgotPassword,
    handleRememberMe,
    emailError,
    passwordError,
    scrollRef,
    doGoogleLogin,
  } = useSignIn();
  useStatusBar("dark-content");

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1, position: "relative" }}
      ref={scrollRef}
    >
      <Image source={AppIconLight} style={styles.image} />
      <Heading style={styles.heading}>Sign into your profile.</Heading>
      <Text style={styles.subHeading}>
        Continue your awesome journey with XSpada.
      </Text>
      <View style={styles.allIconsContainer}>
        <TouchableOpacity onPress={doGoogleLogin} style={styles.iconContainer}>
          <SocicalGoogle />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separatorLine} />
      </View>
      <Formik
        initialValues={{ email: "", password: "", remember_me: false }}
        onSubmit={(values) => handleSubmitForm(values)}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <TextInput
                placeholder="Email Address"
                onChangeText={handleChange("email")}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
                showError={
                  (errors?.email !== "" && touched?.email) || !emailError
                }
                error={emailError || errors.email}
              />
              <TextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                textContentType="password"
                containerProps={{
                  style: {
                    marginTop: 16,
                  },
                }}
                showError={
                  (errors?.password !== "" && touched?.password) ||
                  !passwordError
                }
                error={passwordError || errors.password}
                onSubmitEditing={() => handleSubmit()}
              />
              <View style={styles.forgetPasswordContainer}>
                <View style={styles.checkBoxWrapper}>
                  <CheckBox
                    boxType="square"
                    onCheckColor={"#FFF"}
                    onFillColor={"#7680FF"}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 8,
                      marginLeft: 2,
                    }}
                    value={values.remember_me}
                    onChange={() => {
                      setFieldValue("remember_me", !values.remember_me);
                      handleRememberMe(!values.remember_me);
                    }}
                    tintColor="#000"
                  />
                  <Text>Remember me</Text>
                </View>
                <TextButton onPress={handleForgotPassword}>
                  Forgot Password
                </TextButton>
              </View>
            </View>
            <AnimatedButton>
              <IconButton
                label="Sign In"
                Icon={<ArrowRight color="#fff" />}
                onPress={() => handleSubmit()}
              />
            </AnimatedButton>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  mt16: {
    marginTop: 15,
  },
  checkBoxWrapper: {
    flexDirection: "row",
    marginTop: 16,
  },
  forgetPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  allIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: normalizeHeight(29),
  },
  iconContainer: {
    padding: 14,
    borderColor: "#DFDFDF",
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    flex: 1,
  },
  separator: {
    marginVertical: normalizeHeight(22.5),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  separatorLine: {
    height: 1,
    backgroundColor: "rgba(223, 223, 223, 0.50)",
    width: "45%",
  },
  separatorText: {
    fontSize: 10,
    marginHorizontal: 8,
  },
});

export default SignIn;
