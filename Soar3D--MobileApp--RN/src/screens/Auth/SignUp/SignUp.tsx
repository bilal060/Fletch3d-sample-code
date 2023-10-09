import CheckBox from "@react-native-community/checkbox";
import useThemeImages from "assets/images";
import { Formik } from "formik";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowRight } from "react-native-feather";
import {
  Heading,
  IconButton,
  Text,
  TextButton,
  TextInput,
} from "shared/components/ui";
import useSignUp from "./useSignUp";
import ErrorText from "shared/components/ui/ErrorText";
import { useStatusBar } from "shared/hooks/useStatusBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { normalizeHeight } from "shared/utils/dimension";
import { SocicalGoogle } from "assets/icons/Socials";

const SignUp = () => {
  const { AppIconLight } = useThemeImages();
  const {
    validationSchema,
    handleSubmitForm,
    validationErros,
    doGoogleRegister,
  } = useSignUp();
  useStatusBar("dark-content");

  return (
    // <KeyboardAvoidingView
    //   style={{
    //     flex: 1,
    //     backgroundColor: "#fff",
    //     paddingHorizontal: 20,
    //     paddingBottom: 30,
    //   }}
    // >
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      // style={{ flex: 1 }}
      contentContainerStyle={{
        // flex: 1,
        paddingHorizontal: "5.3%",
        backgroundColor: "#fff",
      }}
      bounces={false}
      // behavior="padding"
      // enabled
      // keyboardVerticalOffset={20}
    >
      <Image source={AppIconLight} style={styles.image} />
      <Heading style={styles.heading}>Set up your profile.</Heading>
      <Text style={styles.subHeading}>
        Create your account to start your journey with XSpada.
      </Text>
      <View style={styles.allIconsContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={doGoogleRegister}
        >
          <SocicalGoogle />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}>
        <View style={styles.separatorLine} />
      </View>
      <Formik
        initialValues={{
          email: "",
          password: "",
          full_name: "",
          confirm: "",
          terms: false,
          invite_code: "",
        }}
        onSubmit={handleSubmitForm}
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
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexGrow: 1,
              paddingBottom: "10%",
            }}
          >
            <View>
              <TextInput
                placeholder="Full Name"
                onChangeText={handleChange("full_name")}
                value={values.full_name}
                keyboardType="default"
                autoCapitalize="none"
                showError={
                  (errors?.full_name !== "" && touched?.full_name) ||
                  !validationErros?.full_name
                }
                error={validationErros?.full_name || errors.full_name}
              />
              <TextInput
                placeholder="Email Address"
                onChangeText={handleChange("email")}
                value={values.email}
                keyboardType="email-address"
                containerProps={{ style: styles.mt16 }}
                autoCapitalize="none"
                showError={
                  (errors?.email !== "" && touched?.email) ||
                  !validationErros?.email
                }
                error={validationErros?.email || errors.email}
              />
              <TextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                textContentType="newPassword"
                containerProps={{ style: styles.mt16 }}
                showError={
                  (errors?.password !== "" && touched?.password) ||
                  !validationErros?.password
                }
                error={validationErros?.password || errors.password}
              />
              <TextInput
                placeholder="Confim Password"
                onChangeText={handleChange("confirm")}
                value={values.confirm}
                containerProps={{ style: styles.mt16 }}
                textContentType="password"
                showError={errors?.confirm !== "" && touched?.confirm}
                error={errors.confirm}
              />
              <TextInput
                placeholder="Invite Code"
                onChangeText={handleChange("invite_code")}
                value={values.invite_code}
                keyboardType="default"
                containerProps={{ style: styles.mt16 }}
                showError={
                  (errors?.invite_code !== "" && touched?.invite_code) ||
                  !validationErros?.invite_code
                }
                error={validationErros?.invite_code || errors.invite_code}
              />
              <View>
                <View style={styles.checkBoxWrapper}>
                  <CheckBox
                    boxType="square"
                    onCheckColor={"#FFF"}
                    onFillColor={"#7680FF"}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                    value={values.terms}
                    onChange={() => setFieldValue("terms", !values.terms)}
                  />
                  <View>
                    <Text>
                      I'm at least 18 years old and agree to the {"\n"}{" "}
                      following terms:
                    </Text>
                    <Text style={{ marginTop: 12 }}>
                      By tapping Next, I've read and agree to the {"\n"}{" "}
                      <TextButton>Terms of Service Agreement</TextButton> to
                      receive all communications electronically.
                    </Text>
                  </View>
                </View>
                {errors.terms && touched.terms && (
                  <ErrorText>{errors.terms}</ErrorText>
                )}
              </View>
            </View>
            <IconButton
              label="Sign Up"
              Icon={<ArrowRight color="#fff" />}
              onPress={() => handleSubmit()}
              style={{ marginTop: 20 }}
            />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
    // </KeyboardAvoidingView>
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
  checkBoxWrapper: {
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 2,
  },
  errorText: {
    marginVertical: 4,
    color: "#EB617A",
  },
  mt16: {
    marginTop: 16,
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
    marginVertical: normalizeHeight(16),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  separatorLine: {
    height: 1,
    backgroundColor: "rgba(223, 223, 223, 0.50)",
    width: "100%",
  },
  separatorText: {
    fontSize: 10,
    marginHorizontal: 8,
  },
});

export default SignUp;
