export interface IResetPasswordPayload {
    new_password: string;
    id: string;
    token: string;
}

export interface IResetPasswordForm extends IResetPasswordPayload {
    cPassword: string;
}
