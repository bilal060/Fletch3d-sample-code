export interface VerifyOTPPayload {
  otp: string;
  verification_id: string;
}

export interface VerifyUserInitialStates {
  verificationID: string;
  verificationEmail: string;
  accountVerified: boolean;
}
