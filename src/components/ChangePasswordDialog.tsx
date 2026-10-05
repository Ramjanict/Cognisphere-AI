"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useChangePasswordMutation } from "@/store/api/authApi";
import CommonButton from "./common/button/CommonButton";
import ButtonWithLoading from "./common/custom/ButtonWithLoading";
import CommonBorder from "./common/custom/CommonBorder";
import CommonWrapper from "./common/space/CommonWrapper";
import FormHeader from "./reuseable/FormHeader";

// Zod schema
const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

// TypeScript type
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordDialogProps {
  handleClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const apiBody = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      await changePassword(apiBody);

      reset();
      handleClose();
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const inputClass = {
    input:
      "w-full px-4 py-3 text-sm leading-[22px] rounded-lg  border border-[#212B36] bg-[#161C24] text-[#919EAB] text-[#637381]  cursor-pointer transition outline-none",
    label: "text-sm leading-[22px] text-[#DFE3E8] mb-1 block",
    error: "text-red-500 text-xs mt-1",
  };
  return (
    <CommonWrapper className="">
      <CommonBorder className="sm:min-w-[380px] pointer-events-auto">
        <FormHeader title="Change Password" handleClose={handleClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6">
          <div>
            <label className={inputClass.label}>Old Password</label>
            <input
              type="password"
              placeholder="Type your old password"
              {...register("oldPassword")}
              className={inputClass.input}
            />
            {errors.oldPassword && (
              <p className={inputClass.error}>{errors.oldPassword.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>New Password</label>
            <input
              type="password"
              placeholder="Type your new password"
              {...register("newPassword")}
              className={inputClass.input}
            />
            {errors.newPassword && (
              <p className={inputClass.error}>{errors.newPassword.message}</p>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <CommonButton disabled={isLoading} type="submit" className="">
              {isLoading ? <ButtonWithLoading title="Saving..." /> : "Save"}
            </CommonButton>
            <CommonButton
              type="button"
              variant="outline"
              onClick={handleClose}
              className=" "
            >
              Cancel
            </CommonButton>
          </div>
        </form>
      </CommonBorder>
    </CommonWrapper>
  );
};

export default ChangePasswordDialog;
