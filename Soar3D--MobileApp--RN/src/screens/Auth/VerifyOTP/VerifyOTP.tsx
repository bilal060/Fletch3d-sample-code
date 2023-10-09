import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Heading,
  IconButton,
  OutlinedButton,
  Text,
  TextButton,
} from "shared/components/ui";
import useVerifyOTP from "./useVerifyOTP";
import { ArrowRight } from "react-native-feather";
import ErrorText from "shared/components/ui/ErrorText";
import AnimatedButton from "shared/components/ui/AnimatedButton";

type VerifyOTPProps = {
  email: string;
  verificationId: string | null;
};

const VerifyOTP = ({ email, verificationId }: VerifyOTPProps) => {
  const insets = useSafeAreaInsets();
  const {
    shouldResendOTP,
    time,
    handleResendOTP,
    otp,
    handleOtpChange,
    activeIndex,
    inputs,
    errorMessage,
    navigateToSignIn,
    handleSubmitOTP,
  } = useVerifyOTP(email, verificationId);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: "#fff",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View>
            <View style={styles.outlineButtonContainer}>
              <OutlinedButton label="Sign In" onPress={navigateToSignIn} />
            </View>
            <Heading>Verify Your OTP</Heading>
            <Text style={{ marginTop: 8, marginBottom: 24 }}>
              We have sent you an email with the auth code at{" "}
              <TextButton disabled>{email}</TextButton>. Please visit your mail.
            </Text>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <View style={styles.container}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.cell,
                    styles.text,
                    activeIndex === index && styles.activeCell,
                  ]}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(value) => handleOtpChange(value, index)}
                  value={digit}
                  ref={(input) => {
                    inputs[index] = input;
                  }}
                />
              ))}
            </View>
            <TouchableOpacity disabled={time > 0} onPress={handleResendOTP}>
              <Text style={styles.resendOtpContainer}>
                {shouldResendOTP
                  ? "Didn't received the code yet? "
                  : "Resend another code in"}{" "}
                <TextButton disabled={true}>
                  {time > 60 ? `1m ${(time - 60).toFixed(0)}` : `${time}`}s
                </TextButton>
              </Text>
            </TouchableOpacity>
          </View>
          <AnimatedButton fullHeight={true}>
            <IconButton
              label="Sign Up"
              Icon={<ArrowRight color="#fff" />}
              onPress={() => handleSubmitOTP(otp)}
            />
          </AnimatedButton>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outlineButtonContainer: {
    alignSelf: "flex-end",
    marginTop: -8,
  },
  cell: {
    width: "15%",
    aspectRatio: 0.9,
    borderWidth: 2,
    borderColor: "#00000030",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  activeCell: {
    borderColor: "#000",
    color: "#000",
  },
  focusText: {
    color: "#000",
  },
  text: {
    fontSize: 28,
    textAlign: "center",
  },
  resendOtpContainer: {
    marginTop: 16,
    textAlign: "center",
  },
  container: {
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
  },
});

export default VerifyOTP;
