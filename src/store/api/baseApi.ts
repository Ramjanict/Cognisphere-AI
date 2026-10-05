import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

// Type for API response that may contain a message
interface ApiResponseMessage {
  message?: string;
}

// Typed baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL || "https://api.cognisphere.us/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth?: { token?: string } })?.auth?.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// Extra options type for skipToast
interface BaseQueryExtraOptions {
  skipToast?: boolean;
}

const baseQueryWithToast = async (
  args: string | (FetchArgs & { skipToast?: boolean }),
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions = {},
) => {
  const skipToast =
    extraOptions.skipToast ??
    (typeof args === "object" ? args.skipToast : false);

  const result = await baseQuery(args, api, extraOptions);

  const method =
    typeof args === "object" && "method" in args
      ? args.method?.toUpperCase()
      : "GET";

  if (
    !skipToast &&
    result.data &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(method ?? "")
  ) {
    const message = (result.data as ApiResponseMessage)?.message;
    if (message) toast.success(message);
  }

  if (result.error) {
    const errorData = result.error as FetchBaseQueryError & {
      data?: ApiResponseMessage;
    };
    const message = errorData.data?.message || "Something went wrong!";
    toast.error(message);
  }

  return result;
};

// Base API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithToast,
  endpoints: () => ({}),
  tagTypes: ["Profile", "Session"],
});
