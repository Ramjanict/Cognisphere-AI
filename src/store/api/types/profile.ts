import { AiAdapter } from "./SingleResponse";

export type GetProfileRequest = {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  hasUsedTrial: boolean;
  subscriptionStatus: "trialing" | "active" | "none";
  trialEndsAt: string;
};
export type GetProfileResponse = {
  success: boolean;
  message: string;
  meta: null;
  data: GetProfileRequest;
};

export interface SessionData {
  sessionId: string;
  sequenceNumber: number;
  prompt: string;
  response: ResponseData;
}

export interface ResponseData {
  selected: SelectedResponse;
  allResponses: AdapterResponse[];
}

export interface SelectedResponse {
  adapter: string;
  text: string;
}

export interface AdapterResponse {
  adapter: AiAdapter;
  text: string;
}
