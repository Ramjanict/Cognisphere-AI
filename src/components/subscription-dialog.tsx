"use client";
import {
  useBuyPlanMutation,
  useCancelPlanMutation,
  useGetAllPlanQuery,
} from "@/store/api/AIApi";
import { useGetProfileQuery } from "@/store/api/profileApi";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import CommonButton from "./common/button/CommonButton";
import ButtonWithLoading from "./common/custom/ButtonWithLoading";

interface SubscriptionDropdownItemProps {
  handleClose: () => void;
  subscriptionNeed?: boolean;
}
const SubscriptionDropdownItem: React.FC<SubscriptionDropdownItemProps> = ({
  handleClose,
  subscriptionNeed,
}) => {
  const { data: plans } = useGetAllPlanQuery();
  const { data: profile } = useGetProfileQuery();
  const proPlan = plans?.data[0];
  const [buyPlan, { isLoading: isPlanBuying }] = useBuyPlanMutation();

  const handleBuyPlan = async (planId: string) => {
    if (!planId) return;

    try {
      const result = await buyPlan({ subscribedPlanId: planId }).unwrap();

      if (result?.data?.url) {
        window.location.href = result.data.url;
      }

      handleClose();
    } catch (error) {
      console.error("Failed to buy plan:", error);
    }
  };
  const [cancelPlan, { isLoading: isPlanCanceling }] = useCancelPlanMutation();
  const handleCancelPlan = async () => {
    try {
      await cancelPlan().unwrap();
      handleClose();
    } catch (error) {
      console.error("Failed to cancel plan:", error);
    }
  };

  const showCancel = profile?.data.hasUsedTrial;
  return (
    <div
      className=" fixed inset-0 z-50 w-full bg-black/50 backdrop-blur-sm p-4
    flex items-start md:items-center justify-center
    overflow-y-auto"
    >
      <div>
        <div className={`  w-full   `}>
          <div className=" h-full  ">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl group h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 group-hover:h-2 transition-all"></div>
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                RECOMMENDED
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-8   ">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white">
                    {proPlan?.name}
                  </h3>
                  <p className="text-slate-400 mt-2">
                    Perfect for professionals, coders, and creators.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {proPlan?.features.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-slate-300"
                      >
                        <CheckCircle className="w-4 h-4 text-indigo-400" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="flex items-end gap-1 justify-center">
                    <span className="text-6xl font-extrabold text-white">
                      ${proPlan?.price}
                    </span>
                    <span className="text-slate-500 pb-2 text-xl">/mo</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full md:w-auto px-10 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg cursor-pointer"
                    onClick={() => handleBuyPlan(proPlan?._id || "")}
                    disabled={isPlanBuying}
                  >
                    {isPlanBuying ? (
                      <ButtonWithLoading
                        title="Purchasing..."
                        textColor="!text-black"
                        borderColor="!border-black"
                      />
                    ) : (
                      "Purchase"
                    )}
                  </motion.button>
                  <p className="mt-4 text-xs text-slate-500">
                    No hidden fees. Cancel anytime.
                  </p>

                  {showCancel && (
                    <p className="text-center text-amber-700 text-sm mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg font-medium">
                      You are using the free trial, please upgrade to continue
                      access
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 flex justify-center gap-4">
          <CommonButton onClick={handleClose} variant="secondary" className="">
            Go Back
          </CommonButton>

          {!subscriptionNeed && !showCancel && (
            <CommonButton
              onClick={handleCancelPlan}
              variant="secondary"
              className="bg-red-500!"
              disabled={isPlanCanceling}
            >
              {isPlanCanceling ? (
                <ButtonWithLoading title="Cancelling..." />
              ) : (
                "Cancel Subscription"
              )}
            </CommonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDropdownItem;
