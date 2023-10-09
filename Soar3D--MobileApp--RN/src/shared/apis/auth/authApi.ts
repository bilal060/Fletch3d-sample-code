import { IResetPasswordPayload } from "shared/types/auth/resetPassword.type";
import { setUserSignInInfo } from "store/slices/auth/authSlice";
import { setLoggedIn } from "store/slices/auth/userSignInfo";
import apiSlice from "shared/apis/apiSlice/apiSlice";
import { Alert } from "react-native";
import { SOCIAL_REDIRECT_URI_PROD } from "@env";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          const { token, profiles, ...others }: any = data;
          dispatch(apiSlice.util.resetApiState());
          dispatch(
            setUserSignInInfo({
              user: others,
              token,
              userProfile: profiles,
            })
          );
          dispatch(setLoggedIn(true));
        } catch (err) {
          const error = JSON.parse(err?.error?.data);
          console.error(error);
          if (
            error.error.includes("Email is not verified") &&
            error.data.verificationId
          )
            dispatch(setLoggedIn(true));
          dispatch(
            setUserSignInInfo({
              user: {
                is_email_verified: false,
                email: _.email,
                verificationId: error.data.verificationId,
                in_waiting_list: false,
              },
              token: null,
            })
          );
          return;
        }
      },
    }),

    // Register
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
          dispatch(setLoggedIn(true));
          dispatch(
            setUserSignInInfo({
              user: {
                is_email_verified: false,
                verificationId: data.verificationId,
                email: _.email,
                in_waiting_list: false,
              },
              token: null,
            })
          );
        } catch (err) {
          console.error(err);
          return;
        }
      },
    }),

    // Apple, Facebook and Google sign in
    socialLogin: builder.mutation({
      query: (body: {
        code: string;
        type: "google" | "facebook" | "apple";
      }) => ({
        url: `/auth/${body.type}/login`,
        method: "POST",
        body: {
          code: body.code,
          redirect_uri: SOCIAL_REDIRECT_URI_PROD,
        },
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          const { token, profiles, ...others }: any = data;
          dispatch(apiSlice.util.resetApiState());
          dispatch(
            setUserSignInInfo({
              user: others,
              token,
              userProfile: profiles,
            })
          );
          dispatch(setLoggedIn(true));
        } catch (err: any) {
          console.error(err);
          const errorResponse = JSON.parse(err?.error?.data);
          if (typeof errorResponse.error === "string") {
            Alert.alert("Error", errorResponse.error);
          }
          return;
        }
      },
    }),

    // Apple, Facebook and Google Sign Up
    socialRegister: builder.mutation({
      query: (body: {
        code: string;
        invite_code?: string;
        type: "google" | "facebook" | "apple";
        terms: boolean;
        redirect_uri?: string;
      }) => ({
        url: `/auth/${body.type}/register`,
        method: "POST",
        body: {
          ...body,
          redirect_uri: SOCIAL_REDIRECT_URI_PROD,
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          const { token, profiles, ...others }: any = data;
          if (data._doc.in_waiting_list) {
            Alert.alert("You have been added in the waiting list");
          } else {
            dispatch(apiSlice.util.resetApiState());
            dispatch(
              setUserSignInInfo({
                user: data._doc,
                token,
                userProfile: profiles,
              })
            );
            dispatch(setLoggedIn(true));
          }
        } catch (err: any) {
          console.error(err);
          const errorResponse = JSON.parse(err.error.data);
          if (typeof errorResponse.error.email === "string")
            Alert.alert("Error", errorResponse.error.email);
          return;
        }
      },
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forget-password",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          Alert.alert(data.message);
        } catch (err) {
          return;
        }
      },
    }),

    // reset password
    resetUserPassword: builder.mutation({
      query: (body: IResetPasswordPayload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    // Verify OTP
    verifyOTP: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          const { token, profiles, ...others }: any = data;
          if (data.in_waiting_list) {
            Alert.alert("You have been added in the waiting list");
            dispatch(apiSlice.util.resetApiState());
            dispatch(
              setUserSignInInfo({
                user: {
                  is_email_verified: true,
                  email: _.email,
                  verificationId: null,
                  in_waiting_list: true,
                },
                token: null,
              })
            );
          } else {
            dispatch(apiSlice.util.resetApiState());
            dispatch(
              setUserSignInInfo({
                user: others,
                token,
                userProfile: profiles,
              })
            );
            dispatch(setLoggedIn(true));
          }
        } catch (err) {
          console.error(err);
          return;
        }
      },
    }),

    // Resend OTP
    resendOTP: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
        } catch (err) {
          console.error(err);
          return;
        }
      },
    }),

    // Verify Token
    verifyToken: builder.query({
      query: () => ({
        url: "/auth/verify",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          const { token, profiles, ...others }: any = data;
          dispatch(
            setUserSignInInfo({
              user: others,
              token,
              userProfile: profiles,
            })
          );
          dispatch(setLoggedIn(true));
        } catch (err) {
          return;
        }
      },
    }),

    // get user profiles
    getUserProfiles: builder.query({
      query: () => ({
        url: "/user/profiles",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useVerifyTokenQuery,
  useGetUserProfilesQuery,
  useResetUserPasswordMutation,
  useSocialLoginMutation,
  useSocialRegisterMutation,
} = authApi;
export default authApi;
