import { baseApi } from "./baseApi";
import {
  ChangePassword,
  ForgotPassword,
  GoogleLogin,
  Login,
  LoginResponse,
  ResetPassword,
  SignUp,
  VerifyMail,
} from "./types/auth";

interface ApiMessageResponse {
  message: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Login>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation<LoginResponse, GoogleLogin>({
      query: (credentials) => ({
        url: "/auth/login-with-google",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<ApiMessageResponse, SignUp>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    changePassword: builder.mutation<ApiMessageResponse, ChangePassword>({
      query: (password) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: password,
      }),
    }),
    forgotPassword: builder.mutation<ApiMessageResponse, ForgotPassword>({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<ApiMessageResponse, ResetPassword>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    VerifyMail: builder.mutation<ApiMessageResponse, VerifyMail>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    resendOTP: builder.mutation<ApiMessageResponse, ForgotPassword>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    logoutFromAllDevices: builder.mutation<ApiMessageResponse, void>({
      query: () => ({
        url: "/auth/log-out-all-device",
        method: "POST",
      }),
    }),
    deleteAccount: builder.mutation<ApiMessageResponse, void>({
      query: () => ({
        url: "/auth/delete-account",
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutFromAllDevicesMutation,
  useDeleteAccountMutation,
  useGoogleLoginMutation,
  useVerifyMailMutation,
  useResendOTPMutation,
} = authApi;
