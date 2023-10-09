export interface IPhoneNumberAuthenticationForm {
    step: "phone_number" | "otp" | "success";
    phone_number: string;
    otp: string;
    verification_id?: string;
}

export interface IEmailAuthenticationForm {
    step: "email" | "otp" | "success";
    secondary_email: string;
    otp: string;
    verification_id?: string;
}

export interface IThirdPartyAppAuthenticationForm {
    otp: string;
}

export interface IUserAuthenticationPayload {
    params: {
        type: "phone_number" | "secondary_email" | "third_party_app";
        action_type: "add" | "remove";
    };
    body: {
        secondary_email?: string;
        phone_number?: string;
    };
}

export interface IUserAuthenticationVerificationPayload {
    params: {
        type: "phone_number" | "secondary_email" | "third_party_app";
    };
    body: {
        otp?: string;
        verification_id?: string;
    };
}
