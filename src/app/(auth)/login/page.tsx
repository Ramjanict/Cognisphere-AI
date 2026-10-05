"use client";

import AuthRedirect from "@/components/AuthRedirect";
import CommonButton from "@/components/common/button/CommonButton";
import ButtonWithLoading from "@/components/common/custom/ButtonWithLoading";
import CommonHeader from "@/components/common/header/CommonHeader";
import { auth, provider, signInWithPopup } from "@/firebase/firebase";
import { useGoogleLoginMutation, useLoginMutation } from "@/store/api/authApi";
import { setToken } from "@/store/api/AuthState";
import { baseApi } from "@/store/api/baseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { z } from "zod";
import logo from "../../../../public/images/final-logo.png";
import googleIcon from "../../../../public/images/google-icon.png";

// Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 6 characters" }),
  remember: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const inputClass = {
  input:
    "w-full px-4 py-3 text-sm leading-[22px] rounded-lg  border border-[#212B36] bg-[#161C24] text-[#919EAB] text-[#637381]  cursor-pointer transition outline-none",
  label: "text-sm leading-[22px] text-[#DFE3E8] mb-1 block",
  error: "text-red-500 text-xs mt-1",
};
const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      const token = result.data.accessToken;
      dispatch(baseApi.util.resetApiState());
      dispatch(setToken(token));
    } catch (err) {
      const error = err as FetchBaseQueryError | { data?: { message: string } };
      console.log(error);
    }
  };

  // google Login

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email) {
        return;
      }

      if (!user.displayName) {
        return;
      }
      const body = {
        email: user.email,
        provider: "Google",
        fullName: user.displayName,
      };

      const response = await googleLogin(body).unwrap();

      if (response.data.accessToken) {
        dispatch(baseApi.util.resetApiState());
        dispatch(setToken(response.data.accessToken));
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161C24] relative px-4 sm:px-6 py-6 transition-colors ">
      {/* Decorative dots */}
      <div className="absolute top-4 md:top-10 left-2 md:left-10  z-50   ">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={20}
          className=" rounded-md"
        />
      </div>
      <div className="absolute top-10 left-6 sm:left-10 w-3 h-3 bg-green-500 rounded-full hidden md:block" />
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-green-400 rounded-full" />
      <div className="absolute top-1/3 right-10 sm:right-20 w-6 h-6 bg-green-400 rounded-full" />
      <div className="absolute bottom-10 right-1/4 sm:right-1/3 w-6 h-6 bg-green-500 rounded-full" />

      <div className="relative w-full max-w-4xl mt-12 md:mt-30 ">
        {/* Background shapes */}
        <div className="absolute hidden lg:block -top-12  -right-10 h-[520px] w-[520px] rotate-12 rounded-3xl bg-[#212B36]" />
        <div className="absolute hidden lg:block -top-18 left-14 h-[520px] w-[500px] -rotate-12 rounded-3xl bg-black" />

        <div className="relative w-full flex flex-col md:flex-row overflow-hidden rounded-2xl  bg-background transition-colors shadow-lg ">
          <div className="hidden md:flex md:w-1/2 relative">
            <Image
              src="/images/login.png"
              alt="login-image"
              width={700}
              height={900}
              className="object-cover h-full w-full"
              priority
            />

            <div className="absolute bottom-8 left-6 sm:left-8 text-white text-lg sm:text-xl font-semibold max-w-xs sm:max-w-sm">
              <div className="flex items-stretch gap-3">
                <div className="w-3 bg-green-500 rounded-full" />
                <CommonHeader size="2xl" className="">
                  Log in to access your account.
                </CommonHeader>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-14 bg-[#0B0D12]">
            <div className="mb-6 sm:mb-8">
              <CommonHeader size="2xl" className="text-white">
                Welcome back!
              </CommonHeader>
              <CommonHeader className="!text-[#DFE3E8] mt-1">
                Login to your account.
              </CommonHeader>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className={inputClass.label}>E-mail</label>
                <input
                  type="email"
                  placeholder="e.g. example@email.com"
                  {...register("email")}
                  className={inputClass.input}
                />
                {errors.email && (
                  <p className={inputClass.error}>{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className={inputClass.label}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password"
                    {...register("password")}
                    className={inputClass.input}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <span>
                        <FiEye />
                      </span>
                    ) : (
                      <span>
                        <FiEyeOff />
                      </span>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className={inputClass.error}>{errors.password.message}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 cursor-pointer"
                  />
                  <p className="text-gray-300 text-sm">Remember</p>
                </div>
                <button
                  type="button"
                  className="text-red-500 text-sm hover:underline cursor-pointer"
                >
                  <Link href="/forgot-password">Forgot Password</Link>
                </button>
              </div>

              <CommonButton
                disabled={isLoading}
                type="submit"
                size="lg"
                className="w-full"
              >
                {!isLoading ? (
                  "Log in"
                ) : (
                  <ButtonWithLoading title="Logging..." />
                )}
              </CommonButton>

              <p className="text-center text-gray-400 text-sm mt-4">
                Don&apos;t have an account?
                <Link
                  href="/register"
                  className="text-green-500 hover:underline font-medium cursor-pointer ml-1"
                >
                  Register
                </Link>
              </p>

              {/* Social Login */}
              <div className="">
                <p className="text-center text-gray-400 text-sm mb-3">
                  Or login with
                </p>
                <button
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-600  rounded-lg w-full py-3 bg-[#0B0D12] text-white hover:shadow-md transition cursor-pointer"
                >
                  {isGoogleLoading ? (
                    <ButtonWithLoading title="Logging..." />
                  ) : (
                    <Image
                      src={googleIcon}
                      alt="Google"
                      width={70}
                      height={70}
                      style={{ height: "auto" }}
                      priority
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  return (
    <AuthRedirect>
      <LoginPage />
    </AuthRedirect>
  );
}
