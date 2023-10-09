import { IUserData } from "./user.type";

export interface LoginPayload {
    email?: string;
    phone_number?: string;
    password: string;
    remember_me: boolean;
    type: "email" | "phone";
}
export interface LoginAPIResponse extends IUserData {
    token: string;
}
