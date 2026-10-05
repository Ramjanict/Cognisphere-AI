"use client";
import { useGetSingleSessionQuery } from "@/store/api/AIApi";
import { useGetProfileQuery } from "@/store/api/profileApi";
import {
  AiAdapter,
  ImageMessage,
  MessageItemForText,
} from "@/store/api/types/SingleResponse";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MarkdownRenderer from "@/lib/MarkdownRenderer";
import { formatAIResponse, isMathResponse } from "@/lib/utils";
import { newQuery } from "@/store/api/chatSlice";
import { skipToken } from "@reduxjs/toolkit/query";
// import "katex/dist/katex.min.css";
import { User } from "lucide-react";
import { FaRegCopy } from "react-icons/fa6";
import CommonButton from "./common/button/CommonButton";
import AITabs from "./reuseable/AITabs";

interface ChatMessagesProps {
  handleCopy: (text: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ handleCopy }) => {
  const { data: profile } = useGetProfileQuery();

  const dispatch = useDispatch();

  const [selectedAdapters, setSelectedAdapters] = useState<
    Record<number, AiAdapter>
  >({});

  const { selectedSessionId, sessionId } = useSelector(
    (state: RootState) => state.chat,
  );

  useEffect(() => {
    if (!sessionId) {
      dispatch(newQuery());
    }
  }, [sessionId, dispatch]);

  const selectedSession = selectedSessionId || sessionId || skipToken;

  const { data: singleSessionData } = useGetSingleSessionQuery(
    selectedSession,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const sessionData = singleSessionData?.data;

  const messagesForText: MessageItemForText[] =
    sessionData &&
    "messages" in sessionData &&
    sessionData.messages[0]?.contentType === "text"
      ? (sessionData.messages as MessageItemForText[])
      : [];

  const messagesForImage: ImageMessage[] =
    sessionData &&
    "messages" in sessionData &&
    sessionData.messages[0]?.contentType === "image"
      ? (sessionData.messages as ImageMessage[])
      : [];

  const handleImageDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${prompt.replace(/\s+/g, "_").slice(0, 30)}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleSafe = messagesForText.length > 0 || messagesForImage.length > 0;

  const getAIText = (message: MessageItemForText): string => {
    const activeAdapter = selectedAdapters[message.sequenceNumber] ?? "gemini";

    const match = message.response.allResponses.find(
      (res) => res.adapter === activeAdapter,
    );

    return match?.text ?? message.response.selected.text;
  };

  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  return handleSafe ? (
    <div className="max-w-[872px] overflow-y-auto flex flex-col gap-10 justify-center mb-10">
      {/* Text Messages */}
      {messagesForText.map((message) => {
        const rawText = getAIText(message);

        return (
          <div
            key={message.sequenceNumber}
            className="flex flex-col gap-6 w-full"
          >
            <div className="flex flex-col gap-4 ">
              <div className="flex items-baseline-last gap-2    ">
                <div className="w-full bg-[#212B36]/20  rounded-t-3xl rounded-bl-3xl text-white  pl-6 py-4  ">
                  {message?.prompt}

                  <span className="cursor-pointer text-white! w-fit ml-auto block mr-2">
                    <FaRegCopy onClick={() => handleCopy(message?.prompt)} />
                  </span>
                </div>
                <Avatar className="h-7 w-7 self-end ">
                  <AvatarImage
                    src={profile?.data?.profileImage}
                    alt="User profile"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
              {isSummaryOpen ? (
                <div className="bg-[#212B36]/20 p-6 rounded-t-3xl rounded-bl-3xl   ">
                  <MarkdownRenderer messages={rawText} />

                  <div className="mt-5 flex items-center justify-between gap-10">
                    <AITabs
                      activeAdapter={
                        selectedAdapters[message.sequenceNumber] ?? "gemini"
                      }
                      setIsSummaryOpen={setIsSummaryOpen}
                      setActiveAdapter={(adapter: AiAdapter) =>
                        setSelectedAdapters((prev) => ({
                          ...prev,
                          [message.sequenceNumber]: adapter,
                        }))
                      }
                    />
                    <span className="cursor-pointer text-white!">
                      <FaRegCopy
                        onClick={() =>
                          handleCopy(
                            isMathResponse(rawText)
                              ? rawText
                              : formatAIResponse(rawText),
                          )
                        }
                      />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#212B36]/20 p-6 rounded-t-3xl rounded-bl-3xl max-w-[872px]  ">
                  <MarkdownRenderer messages={rawText} />

                  <div className="pt-5 flex justify-end">
                    <CommonButton onClick={() => setIsSummaryOpen(true)}>
                      All responses
                    </CommonButton>
                  </div>

                  <span className="cursor-pointer text-white ">
                    <FaRegCopy
                      onClick={() =>
                        handleCopy(
                          isMathResponse(message.summary)
                            ? message.summary
                            : formatAIResponse(message.summary),
                        )
                      }
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Image Messages */}
      {messagesForImage?.map((message, i) => (
        <div key={i} className="flex flex-col gap-4 w-full ">
          <div className="flex items-baseline-last gap-2  w-full ">
            <div className="bg-[#212B36]/20 rounded-t-3xl rounded-bl-3xl text-white pl-6 py-4 w-full ">
              {message?.prompt}
              <span className="cursor-pointer text-white! w-fit ml-auto block mr-2">
                <FaRegCopy onClick={() => handleCopy(message?.prompt)} />
              </span>
            </div>
            <Avatar className="h-7 w-7 self-end ">
              <AvatarImage
                src={profile?.data?.profileImage}
                alt="User profile"
              />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className=" bg-[#212B36]/20 p-6 rounded-3xl overflow-hidden w-full  ">
            <Image
              width={524}
              height={350}
              src={message?.imageUrl}
              className="rounded-xl"
              alt={message.prompt}
            />
            <div className="flex justify-between items-center pt-4.5 w-full">
              <div
                onClick={() =>
                  handleImageDownload(message.imageUrl, message.prompt)
                }
                className="bg-[#000000] p-1.5 rounded text-base cursor-pointer"
              >
                <MdOutlineFileDownload className="size-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    "No data is available for this session."
  );
};

export default ChatMessages;
