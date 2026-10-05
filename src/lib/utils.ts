import { logout as Logout } from "@/store/api/AuthState";
import { AdapterResponse, GetProfileRequest } from "@/store/api/types/profile";
import { AiAdapter } from "@/store/api/types/SingleResponse";
import { AppDispatch } from "@/store/store";
import { clsx, type ClassValue } from "clsx";
import { Router } from "next/router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logout = (dispatch: AppDispatch, router: Router) => {
  dispatch(Logout());
  router.push("/login");
};

export function shouldShowUpgradePopup(user: GetProfileRequest): boolean {
  if (!user) return false;
  const now = new Date();

  const isTrialExpired =
    user.subscriptionStatus === "trialing" &&
    user.trialEndsAt &&
    new Date(user.trialEndsAt) < now;

  const needsSubscription =
    user.subscriptionStatus === "none" && user.hasUsedTrial;

  return isTrialExpired || needsSubscription;
}
export function formatAIResponse(text: string): string {
  if (!text) return "";

  // 1. Normalize line endings
  let cleaned = text.replace(/\r\n/g, "\n");

  // 2. Remove emojis (unicode ranges for most common emojis)
  cleaned = cleaned.replace(
    /([\u231A-\u231B\u23E9-\u23EC\u23F0\u23F3\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
    "",
  );

  // 3. Remove bold/italic markers outside code blocks
  const parts = cleaned.split(/(```[\s\S]*?```)/g);

  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith("```")) {
      parts[i] = parts[i]
        .replace(/(\*\*|__|\*|_)/g, "") // bold/italic
        .replace(/`([^`]+)`/g, "$1") // inline code
        .replace(/^#{1,6}\s*/gm, "") // headings
        .replace(/^\s*[-*+]\s+/gm, "- ") // lists
        .replace(/^\s*\d+\.\s+/gm, "1. ") // numbered lists
        .replace(/\n{3,}/g, "\n\n") // collapse multiple newlines
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n")
        .replace(/\s{2,}/g, " "); // collapse spaces
    }
  }

  cleaned = parts.join("");

  // 4. Final trim
  return cleaned.trim();
}

export const getAdapterResponse = (
  responses: AdapterResponse[],
  adapter: AiAdapter,
): string => {
  return responses.find((r) => r.adapter === adapter)?.text || "";
};

export const isMathResponse = (text: string) => {
  return (
    /\$.*?\$/.test(text) ||
    /\$\$[\s\S]*?\$\$/.test(text) ||
    /\\\(.+?\\\)/.test(text) ||
    /\\\[.+?\\\]/.test(text)
  );
};
