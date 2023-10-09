import { useEffect, useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "shared/apis/auth/authApi";
import { useAppDispatch } from "shared/hooks/useRedux";
import { VerifyOTPPayload } from "shared/types/auth/verifyOtp.type";
import { logOut } from "shared/utils/auth";

const useVerifyOTP = (email: string, verificationId: string | null) => {
  const [time, setTime] = useState<number>(120);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [shouldResendOTP, setShouldResendOTP] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const dispatch = useAppDispatch();

  const timerRef = useRef<number | undefined>(undefined);
  const inputs: (TextInput | null)[] = [];

  const [doVerifyOtp, { data }] = useVerifyOTPMutation();
  const [doResendOtp] = useResendOTPMutation();

  let userVerificationId: string | null = verificationId;

  const sendOTP = async () => {
    const apiPayLoad = {
      email,
    };
    const res = await doResendOtp(apiPayLoad);
    if ("data" in res) {
      if (res.data.status.toLowerCase() === "success") {
        userVerificationId = res.data.verificationId;
        setErrorMessage("");
      } else {
      }
    } else {
      // Handle the error case
      setErrorMessage("An error occured while sending OTP");
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setShouldResendOTP(true);
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  useEffect(() => {
    // if (!userVerificationId) handleResendOTP();
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < newOtp.length - 1) {
      inputs[index + 1]?.focus();
      setActiveIndex(activeIndex + 1);
    } else if (!newOtp.includes("")) {
      handleSubmitOTP(newOtp);
    }
  };

  const handleSubmitOTP = (otp: string[]) => {
    Keyboard.dismiss();
    if (!userVerificationId) {
      setErrorMessage("Please wait for OTP to be reached");
      return;
    }
    const otpValue: VerifyOTPPayload = {
      otp: otp.join(""),
      verification_id: userVerificationId,
    };

    const res = doVerifyOtp(otpValue);
    if ("error" in res) setErrorMessage("Invalid Otp");
  };

  const handleResendOTP = async () => {
    if (!shouldResendOTP) return;
    await sendOTP();
    stopTimer();
    setTime(120);
    setShouldResendOTP(false);
    startTimer();
  };

  const navigateToSignIn = () => {
    logOut(dispatch);
  };

  return {
    handleResendOTP,
    time,
    shouldResendOTP,
    otp,
    handleOtpChange,
    activeIndex,
    inputs,
    errorMessage,
    navigateToSignIn,
    handleSubmitOTP,
  };
};

export default useVerifyOTP;
