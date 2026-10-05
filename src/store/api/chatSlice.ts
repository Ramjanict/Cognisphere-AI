import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ContentType = "text" | "image";

interface ChatState {
  sessionId: string;
  selectedSessionId: string;
  triggerNewQuery: boolean;
  contentType: ContentType;
}

const initialState: ChatState = {
  sessionId: crypto.randomUUID(),
  selectedSessionId: "",
  triggerNewQuery: false,
  contentType: "text",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newQuery: (state) => {
      const newId = crypto.randomUUID();
      state.triggerNewQuery = true;
      state.sessionId = newId;
      state.selectedSessionId = "";
      state.contentType = "text";
    },

    resetTrigger: (state) => {
      state.triggerNewQuery = false;
    },
    setContentType: (state, action: PayloadAction<ContentType>) => {
      state.contentType = action.payload;
    },
    setSelectedSessionId: (state, action: PayloadAction<string>) => {
      state.selectedSessionId = action.payload;
    },
  },
});

export const { newQuery, resetTrigger, setContentType, setSelectedSessionId } =
  chatSlice.actions;

export default chatSlice.reducer;
