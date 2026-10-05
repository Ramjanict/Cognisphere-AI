"use client";
import {
  useDeleteAccountMutation,
  useLogoutFromAllDevicesMutation,
} from "@/store/api/authApi";
import { logout } from "@/store/api/AuthState";
import { setSelectedSessionId } from "@/store/api/chatSlice";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileNameMutation,
} from "@/store/api/profileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { PiExportThin } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { z } from "zod";
import user from "../../public/user.jpg";
import AlertBox from "./AlertBox";
import CommonButton from "./common/button/CommonButton";
import ButtonWithLoading from "./common/custom/ButtonWithLoading";
import CommonBorder from "./common/custom/CommonBorder";
import CommonHeader from "./common/header/CommonHeader";
import CommonWrapper from "./common/space/CommonWrapper";
import Separator from "./common/space/Separator";
import FormHeader from "./reuseable/FormHeader";

const tabs = [
  { id: "account", label: "Account", activeColor: "bg-[#212B36]" },
  { id: "security", label: "Security", activeColor: "bg-[#212B36]" },
];

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Image must be less than 2MB",
    }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface SettingsDialogProps {
  handleClose: () => void;
}

const inputClass = {
  input:
    "w-full px-4 py-3 text-sm leading-[22px] rounded-lg  border border-[#DFE3E8] dark:border-[#212B36] bg-[#F4F6F8] dark:bg-[#161C24] text-[#919EAB] dark:text-[#637381]  cursor-pointer transition outline-none",
  label: "text-sm leading-[22px] text-[#212B36] dark:text-[#DFE3E8] mb-1 block",
  error: "text-red-500 text-xs mt-1",
};
const SettingsDialog: FC<SettingsDialogProps> = ({ handleClose }) => {
  const [tab, setTab] = useState("account");
  const [editFullName, setEditFullName] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: " ",
    },
  });

  const handleEditClick = () => setEditFullName(!editFullName);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const [logoutFromAllDevices, { isLoading }] =
    useLogoutFromAllDevicesMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutFromAllDevices();
    dispatch(logout());
    dispatch(setSelectedSessionId(""));
    router.push("/login");
  };

  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [updateProfileName] = useUpdateProfileNameMutation();
  const currentFullName = watch("fullName");
  const currentImage = watch("image");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (currentFullName && currentFullName.trim() !== "") {
        await updateProfileName({ fullName: currentFullName }).unwrap();
      }

      if (currentImage && currentImage.size > 0) {
        await updateProfileImage(currentImage).unwrap();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const { data: profile } = useGetProfileQuery();

  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <CommonWrapper>
        <CommonBorder className="sm:min-w-[450px]">
          <FormHeader title="Settings" handleClose={handleClose} />

          <div className="pt-6">
            <div className="flex gap-2">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`px-3 py-1 text-base leading-[24px] rounded-md cursor-pointer transition ${
                    tab === item.id
                      ? `${item.activeColor} text-white`
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Separator marginY="my-4.5" />

            {tab === "account" && (
              <form>
                <div className="flex items-center justify-between">
                  <CommonHeader>Update Picture:</CommonHeader>
                  <div className="relative w-10 h-10 cursor-pointer">
                    <Image
                      src={preview || profile?.data?.profileImage || user}
                      alt="profile"
                      fill
                      className="rounded-md object-cover cursor-pointer"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.3)_100%),_#212B36] rounded-md flex items-center justify-center pointer-events-none" />

                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <PiExportThin size={20} className="text-white" />
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-md"
                    />
                  </div>
                </div>

                {errors.image && (
                  <p className={inputClass.error}>{errors.image.message}</p>
                )}
                <Separator marginY="my-6" />

                {/* Full Name */}
                <div className="flex items-center justify-between">
                  <CommonHeader>Full Name:</CommonHeader>
                  <div className="flex items-center gap-2">
                    {editFullName ? (
                      <input
                        type="text"
                        {...register("fullName")}
                        className={` ${inputClass.input} placeholder:!text-[#637381]`}
                        placeholder="Type your Name"
                        value={currentFullName || profile?.data?.fullName || ""}
                        onChange={(e) => setValue("fullName", e.target.value)}
                      />
                    ) : (
                      <CommonHeader size="gray">
                        {profile?.data?.fullName || ""}
                      </CommonHeader>
                    )}
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="text-xl cursor-pointer"
                    >
                      <CiEdit />
                    </button>
                  </div>
                </div>
                {errors.fullName && (
                  <p className={inputClass.error}>{errors.fullName.message}</p>
                )}
                <Separator marginY="my-4.5" />

                <div className="flex items-center justify-between">
                  <CommonHeader>Email Address:</CommonHeader>
                  <CommonHeader size="gray">
                    {profile?.data?.email}
                  </CommonHeader>
                </div>

                <Separator marginY="my-4.5" />

                <div className="flex items-center justify-between">
                  <CommonHeader>Delete account</CommonHeader>
                  <CommonButton
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    type="button"
                    className="!border-[#FF4842]"
                    variant="outline"
                  >
                    {isDeleting ? (
                      <ButtonWithLoading
                        title="Deleting..."
                        textColor="!text-[#FF4842]"
                      />
                    ) : (
                      "Delete Account"
                    )}
                  </CommonButton>
                </div>

                <Separator marginY="my-4.5" />
                <AlertBox title="This will change your whole interface." />

                <div className="text-right pt-4.5">
                  <CommonButton
                    onClick={handleSubmit}
                    variant="secondary"
                    type="button"
                    disabled={loading}
                  >
                    {loading ? (
                      <ButtonWithLoading title="Updating..." />
                    ) : (
                      "Save Changes"
                    )}
                  </CommonButton>
                </div>
              </form>
            )}

            {tab === "security" && (
              <div>
                <Separator marginY="my-4.5" />

                <div className="flex items-center justify-between">
                  <CommonHeader>Log out of all devices</CommonHeader>

                  <CommonButton
                    type="button"
                    className="!border-[#FF4842]"
                    variant="outline"
                    disabled={isLoading}
                    onClick={handleLogout}
                  >
                    Log Out
                  </CommonButton>
                </div>

                <Separator marginY="my-4.5" />
                <AlertBox title="This will log you out of all devices." />
              </div>
            )}
          </div>
        </CommonBorder>
      </CommonWrapper>
    </div>
  );
};

export default SettingsDialog;
