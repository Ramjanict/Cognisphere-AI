"use client";

import {
  useResendOTPMutation,
  useVerifyMailMutation,
} from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonWithLoading from "./common/custom/ButtonWithLoading";

// Zod schema
const resetPasswordSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [verifyEmail, { isLoading }] = useVerifyMailMutation();
  const [resendOTP, { isLoading: resendLoading }] = useResendOTPMutation();
  const router = useRouter();
  const { handleSubmit, setValue } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    setValue("otp", newCode.join(""));
  };

  const handleVerify = async (data: ResetPasswordFormData) => {
    if (timer <= 0) return;

    const email = localStorage.getItem("selectedEmail");
    if (!email) return;

    const apiBody = {
      email,
      otp: data.otp,
    };

    try {
      await verifyEmail(apiBody);
      router.push("/login");
    } catch (err) {
      const error = err as FetchBaseQueryError | { data?: { message: string } };
      console.log(error);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (timer > 0) return;

    const email = localStorage.getItem("selectedEmail");
    if (!email) return;

    try {
      await resendOTP({ email });
      setTimer(600);
      setCode(["", "", "", "", "", ""]);
      setValue("otp", "");
    } catch (error) {
      console.log(error);
    }
  };
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-[380px] relative">
        <h2 className="text-xl font-semibold mb-4">Verification</h2>
        <p className="text-gray-400 mb-6 text-sm">
          We have sent a <strong>6-digit</strong> verification code to your
          email. Please check and confirm.
        </p>

        <div className="text-red-500 font-mono text-lg mb-4 text-center">
          {formatTime(timer)}
        </div>

        <div className="flex justify-between gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center rounded-lg bg-gray-800 border border-gray-700 text-white text-xl focus:outline-none focus:border-green-500"
              disabled={timer <= 0}
            />
          ))}
        </div>

        <div className="w-full flex justify-between gap-6">
          <button
            onClick={handleSubmit(handleVerify)}
            className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 transition font-semibold cursor-pointer disabled:opacity-70"
            disabled={timer <= 0 || isLoading}
          >
            {isLoading ? <ButtonWithLoading title="Verifying..." /> : "Verify"}
          </button>

          <button
            disabled={resendLoading || timer > 0}
            onClick={handleResend}
            className="text-sm text-gray-400 hover:text-white underline cursor-pointer disabled:cursor-not-allowed disabled:text-gray-600"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
