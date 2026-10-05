import { baseApi } from "./baseApi";
import {
  AiSendPrompt,
  AllSessionResponse,
  PlanResponse,
  SubscribePlanPayload,
  SubscribePlanResponse,
  UpdateSessionPayload,
} from "./types/auth";
import { SingleSessionResponse } from "./types/SingleResponse";

const AIApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendSessionForText: builder.mutation<void, AiSendPrompt>({
      query: (data) => ({
        url: "/ai/send",
        method: "POST",
        body: data,
        skipToast: true,
      }),
      invalidatesTags: ["Session"],
    }),
    sendSessionForImage: builder.mutation<void, AiSendPrompt>({
      query: (data) => ({
        url: "/ai/generate-image",
        method: "POST",
        body: data,
        skipToast: true,
      }),
      invalidatesTags: ["Session"],
    }),

    getAllSession: builder.query<AllSessionResponse, void>({
      query: () => ({
        url: "/ai/sessions",
        method: "GET",
      }),
      providesTags: ["Session"],
    }),

    getSingleSession: builder.query<SingleSessionResponse, string>({
      query: (session_id) => ({
        url: `/ai/session/${session_id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Session", id }],
    }),

    deleteSession: builder.mutation<void, string>({
      query: (session_id) => ({
        url: `/ai/session/${session_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Session"],
    }),
    updateSession: builder.mutation<void, UpdateSessionPayload>({
      query: (data) => ({
        url: `/ai/session/update-title`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    getAllPlan: builder.query<PlanResponse, void>({
      query: () => ({
        url: "/plan/all",
        method: "GET",
      }),
    }),
    buyPlan: builder.mutation<SubscribePlanResponse, SubscribePlanPayload>({
      query: (subscribedPlanId) => ({
        url: "/plan/checkout",
        method: "POST",
        body: subscribedPlanId,
        skipToast: true,
      }),
    }),
    cancelPlan: builder.mutation<void, void>({
      query: () => ({
        url: "/plan/cancel-subscription",
        method: "POST",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useSendSessionForTextMutation,
  useSendSessionForImageMutation,
  useGetAllSessionQuery,
  useGetSingleSessionQuery,
  useLazyGetSingleSessionQuery,
  useDeleteSessionMutation,
  useUpdateSessionMutation,
  useGetAllPlanQuery,
  useBuyPlanMutation,
  useCancelPlanMutation,
} = AIApi;

export default AIApi;
