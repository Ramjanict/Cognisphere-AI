"use client";
import { logout } from "@/store/api/AuthState";
import { setSelectedSessionId } from "@/store/api/chatSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import logoutIcon from "../../public/images/logout.png";
import AlertBox from "./AlertBox";
import CommonButton from "./common/button/CommonButton";
import CommonBorder from "./common/custom/CommonBorder";
import CommonHeader from "./common/header/CommonHeader";
import CommonWrapper from "./common/space/CommonWrapper";
import FormHeader from "./reuseable/FormHeader";
const LogoutDialog = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setSelectedSessionId(""));
    router.push("/login");
  };
  return (
    <CommonWrapper className="">
      <CommonBorder className="sm:min-w-[350px] pointer-events-auto">
        <FormHeader handleClose={handleClose} />

        <div className=" space-y-6 pt-6">
          <CommonHeader className=" !text-center" size="xl">
            Log Out
          </CommonHeader>
          <div className="flex items-center justify-center">
            <Image src={logoutIcon} alt="logout" />
          </div>
          <AlertBox title="You will be log out from the site." />
          <div className="flex justify-center gap-6">
            <CommonButton variant="danger" onClick={handleLogout} className="">
              Log Out
            </CommonButton>
            <CommonButton onClick={handleClose} variant="outline" className="">
              Cancel
            </CommonButton>
          </div>
        </div>
      </CommonBorder>
    </CommonWrapper>
  );
};

export default LogoutDialog;
