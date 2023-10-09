import { IUploadFileResponse } from "../uploadFile/uploadFile";

export interface IUserData {
  _id: string;
  address?: {
    city: string;
    country: string;
    street: string;
    zip: string;
    _id: string;
  };
  full_name: string;
  email: string;
  is_phone_verified: boolean;
  phone: string;
  location: [];
  is_email_verified: boolean;
  isScanner: true;
  is_imaginex_synced: boolean;
  in_waiting_list: boolean;
  profile_img: IUploadFileResponse | null;
  profiles: IUserProfilesTypes[];
  secondary_email: string;
  is_secondary_email_verified: true;
  created_at: string;
  updated_at: string;
  scan_credit: number;
  __v: number;
}

export interface IUserProfilesTypes {
  _id: string;
  user_id: string;
  profile_name: string;
  configuration_id: string;
  is_enterprise_scanner: boolean;
  is_enterprise_manager: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
}
