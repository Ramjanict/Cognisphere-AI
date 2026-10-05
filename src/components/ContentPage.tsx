"use client";
import {
  useSendSessionForImageMutation,
  useSendSessionForTextMutation,
} from "@/store/api/AIApi";
import {
  resetTrigger,
  setContentType,
  setSelectedSessionId,
} from "@/store/api/chatSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import TypingLoader from "./reuseable/TypingLoader";

const ContentPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { triggerNewQuery, selectedSessionId, contentType, sessionId } =
    useSelector((state: RootState) => state.chat);

  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [sendSessionForText, { isLoading: isLoadingText }] =
    useSendSessionForTextMutation();
  const [sendSessionForImage, { isLoading: isLoadingImage }] =
    useSendSessionForImageMutation();

  useEffect(() => {
    if (triggerNewQuery) {
      setInputValue("");
      dispatch(resetTrigger());
    }
  }, [triggerNewQuery, dispatch]);

  const activeSessionId = selectedSessionId || sessionId;

  const handleTextGeneration = async () => {
    dispatch(setContentType("text"));
    if (!inputValue.trim()) return;

    try {
      await sendSessionForText({
        session_id: activeSessionId,
        prompt: inputValue,
        contentType,
      }).unwrap();
      dispatch(setSelectedSessionId(activeSessionId));

      setInputValue("");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleImageGeneration = async () => {
    dispatch(setContentType("image"));
    if (!inputValue.trim()) return;

    try {
      await sendSessionForImage({
        session_id: activeSessionId,
        prompt: inputValue,
        contentType,
      }).unwrap();
      dispatch(setSelectedSessionId(activeSessionId));

      setInputValue("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleGenerate = async () => {
    if (isLoadingText || isLoadingImage) return;

    setIsGenerating(true);

    try {
      if (contentType === "text") {
        await handleTextGeneration();
      } else if (contentType === "image") {
        await handleImageGeneration();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 overflow-hidden  ">
      {selectedSessionId ? (
        <ChatMessages handleCopy={handleCopy} />
      ) : (
        <div className="text-white text-center mt-10">
          Start a new conversation
        </div>
      )}

      {(isLoadingText || isLoadingImage || isGenerating) && (
        <div className="mt-2">
          <TypingLoader
            size={8}
            color="#999"
            text={`${
              isLoadingText ? "Thinking" : isLoadingImage ? "Generating" : ""
            }`}
          />
        </div>
      )}

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default ContentPage;
