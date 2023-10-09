export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
  invite_code?: string;
}

export interface IUnverifiedUserResponse {
  status: string;
  data: {
    verificationId: string;
  };
  message: string;
}
