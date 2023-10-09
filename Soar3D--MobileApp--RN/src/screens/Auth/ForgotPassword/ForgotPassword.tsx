import { Formik } from "formik";
import { Animated, View } from "react-native";
import { ArrowRight } from "react-native-feather";
import {
  Heading,
  IconButton,
  Text,
  TextButton,
  TextInput,
} from "shared/components/ui";
import useForgotPassword from "./useForgotPassword";
import AnimatedButton from "shared/components/ui/AnimatedButton";

type MockUpForgotPasswordProps = {
  toggleSecondaryEmail: () => void;
  handleSubmitForm: (values: { email: string }) => void;
  heading: string;
  subHeading: string;
  placeholder: string;
  buttonLabel: string;
  validationSchema: object;
  emailError: string | undefined;
};

const MockUpForgotPassword = ({
  toggleSecondaryEmail,
  handleSubmitForm,
  heading,
  subHeading,
  placeholder,
  buttonLabel,
  validationSchema,
  emailError,
}: MockUpForgotPasswordProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingBottom: 30,
      }}
    >
      <Heading>{heading}</Heading>
      <Text style={{ marginTop: 8, color: "#7E7D7D", marginBottom: 29 }}>
        {subHeading}
      </Text>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={handleSubmitForm}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, errors, touched, values }) => (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <TextInput
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder={placeholder}
                keyboardType="email-address"
                showError={
                  (errors?.email !== "" && touched?.email) || !emailError
                }
                error={emailError || errors.email}
              />
              {/* <TextButton
                style={{ marginTop: 16, alignSelf: "flex-end" }}
                onPress={toggleSecondaryEmail}
              >
                {buttonLabel}
              </TextButton> */}
            </View>
            <AnimatedButton fullHeight={true}>
              <IconButton
                label="Reset Password"
                Icon={<ArrowRight color="#fff" />}
                onPress={() => handleSubmit()}
              />
            </AnimatedButton>
          </View>
        )}
      </Formik>
    </View>
  );
};

const ForgotPassword = () => {
  const {
    handleSubmitForm,
    isSecondaryEmail,
    toggleSecondaryEmail,
    validationSchema,
    emailError,
  } = useForgotPassword();

  // if (isSecondaryEmail)
  //   return (
  //     <MockUpForgotPassword
  //       handleSubmitForm={handleSubmitForm}
  //       toggleSecondaryEmail={toggleSecondaryEmail}
  //       heading="Reset Password"
  //       subHeading="Try putting in your account's secondary email to reset it's password."
  //       buttonLabel="Use Primary Email"
  //       placeholder="Secondary Email Address"
  //       validationSchema={validationSchema}
  //       emailError={emailError}
  //       buttonPosition={buttonPosition}
  //     />
  //   );
  // else
  return (
    <MockUpForgotPassword
      handleSubmitForm={handleSubmitForm}
      toggleSecondaryEmail={toggleSecondaryEmail}
      heading="We got your back."
      subHeading="Try putting in your account email to reset it’s password."
      buttonLabel="Use Secondary Email"
      placeholder="Email Address"
      validationSchema={validationSchema}
      emailError={emailError}
    />
  );
};

export default ForgotPassword;
