import AuthRedirect from "@/components/AuthRedirect";
import ResetPasswordPopup from "@/components/ResetPasswordPopup";

const page = () => {
  return (
    <AuthRedirect>
      <ResetPasswordPopup />
    </AuthRedirect>
  );
};

export default page;
