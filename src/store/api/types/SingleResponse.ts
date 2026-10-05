export type AiAdapter = "openai" | "gemini" | "claude" | "perplexity";

type AiResponse = {
  adapter: AiAdapter;
  text: string;
};

export type MessageItemForText = {
  sequenceNumber: number;
  contentType: "text";
  summary: string;
  prompt: string;
  response: {
    selected: AiResponse;
    allResponses: AiResponse[];
  };
  timestamp: string;
};

export type SingleSessionResponseForText = {
  success: boolean;
  message: string;
  meta: null;
  data: {
    sessionId: string;
    userId: string;
    messages: MessageItemForText[];
  };
};

// single session response

export interface ImageMessage {
  sequenceNumber: number;
  contentType: "image";
  sessionId: string;
  prompt: string;
  imageUrl: string;
  adapter: string;
  messageId: string;
  adapterResponseId: string;
  timestamp: string;
}

export interface SessionData {
  sessionId: string;
  userId: string;
  messages: ImageMessage[];
  totalMessages: number;
  createdAt: string;
  updatedAt: string;
}

export interface SingleSessionResponseForImage {
  success: boolean;
  message: string;
  meta: null;
  data: SessionData;
}

export type SingleSessionResponse =
  | SingleSessionResponseForText
  | SingleSessionResponseForImage;
