"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setContentType } from "@/store/api/chatSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Wand2 } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import imageIcon from "../../public/images/elements.svg";
import imageGenerate from "../../public/images/gallery.svg";
import query from "../../public/images/query.svg";
import CommonButton from "./common/button/CommonButton";
import CommonHeader from "./common/header/CommonHeader";
interface ChatInputProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  handleGenerate: () => void;
  isGenerating: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleGenerate,

  isGenerating,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { contentType } = useSelector((state: RootState) => state.chat);

  return (
    <div className=" w-full">
      <CommonHeader
        size="2xl"
        className="font-bold  text-foreground !text-center pb-2 "
      >
        Every perspective, every AI, one place.
      </CommonHeader>

      <div className="relative shadow-[0_8px_16px_0_rgba(107,115,123,0.16)]   max-w-3xl mx-auto bg-[#161C24] p-6 rounded-xl  mb-10">
        <div
          className="shadow-[1px_1px_1px_0_rgba(0,0,0,0.18)] bg-black  p-3 rounded-lg
"
        >
          <textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              const textarea = e.target;
              textarea.style.height = "auto";
              textarea.style.height = `${textarea.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            className="w-full text-white resize-none outline-none text-lg"
            placeholder="Ask a question about anything... (Press Enter to send)"
          />
        </div>
        {/* Bottom controls */}
        <div className="flex justify-between items-center mt-4 ">
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <CommonButton
                    variant="secondary"
                    className="flex items-center !rounded-full"
                  >
                    <Image
                      src={imageIcon}
                      alt="icon"
                      className="h-4 w-4 mr-1.5"
                    />
                    {contentType === "text" ? "Query" : "Create Image"}
                  </CommonButton>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-black text-white border border-[#454F5B]">
                <DropdownMenuItem
                  onClick={() => dispatch(setContentType("text"))}
                  className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <Image src={query} alt="icon" className="h-4 w-4" />
                  Query
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => dispatch(setContentType("image"))}
                  className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <Image src={imageGenerate} alt="icon" className="h-4 w-4" />
                  Create Image
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CommonButton
            className="flex !py-3"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                Generate <Wand2 className="ml-2 h-4 w-4" />
              </>
            )}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
