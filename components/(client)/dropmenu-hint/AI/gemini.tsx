import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, ArrowUp, Square, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import "./components/style.css";
import ChatHistory from "./components/ChatHistory";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types/type";
import { useCurrentUser } from "@/hooks/use-current-user";
import ImageCellOne from "@/components/image-cell-one";

type ModelResponse = {
  response: {
    text: () => string;
  };
};

interface ChatGeminiProps {
  setChatHistory: Dispatch<SetStateAction<ChatMessage[]>>;
  chatHistory: ChatMessage[];
}

const ChatGemini = ({ setChatHistory, chatHistory }: ChatGeminiProps) => {
  const user = useCurrentUser();
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [minHeight, setMinHeight] = useState(40);

  const APIApp = process.env.NEXT_PUBLIC_APIGEMINI || "";
  const genAI = new GoogleGenerativeAI(APIApp);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the bottom when chat history changes
    scrollToBottom();
  }, [chatHistory]);

  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setUserInput(input);
    if (input.trim() === "") {
      setMinHeight(40);
    } else {
      const scrollHeight = event.target.scrollHeight;
      setMinHeight(scrollHeight > 40 ? Math.min(scrollHeight, 150) : 40);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  const timestamp = getCurrentTimestamp();

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = (await model.generateContent(userInput)) as ModelResponse;
      const responseText = result.response.text();
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput, timestamp },
        {
          type: "bot",
          message: responseText,
          timestamp: getCurrentTimestamp(),
        },
      ]);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setMinHeight(40);
      setIsLoading(false);
    }
  };

  const currentHour = new Date().getHours();
  let greetingMessage = "Vui lòng đặt câu hỏi cho tôi!";
  if (currentHour >= 6 && currentHour < 12) {
    greetingMessage = "Chào mừng buổi sáng. Hãy đặt câu hỏi cho tôi!";
  } else if (currentHour >= 12 && currentHour < 14) {
    greetingMessage = "Chào mừng buổi trưa. Hãy đặt câu hỏi cho tôi!";
  } else if (currentHour >= 14 && currentHour < 18) {
    greetingMessage = "Chào mừng buổi chiều. Hãy đặt câu hỏi cho tôi!";
  } else {
    greetingMessage = "Chào mừng buổi tối. Hãy đặt câu hỏi cho tôi!";
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 max-h-[85%] overflow-y-auto">
        {!isLoading && chatHistory.length <= 0 ? (
          <div className="space-y-3 mt-10">
            <div className="line-with-text">
              <span className="text-sm text-gray-400">Hôm nay</span>
            </div>
            <div className="flex items-center space-x-5">
              <Avatar>
                <AvatarFallback className="bg-red-600">
                  <Bot className="text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-slaet-50 p-2.5 rounded-lg shadow-md">
                {greetingMessage}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <ChatHistory chatHistory={chatHistory} />
          </div>
        )}
        <div className="mt-10">
          {isLoading && (
            <div className="space-y-4">
              <div className="line-with-text">
                <span className="text-sm text-gray-400">{timestamp}</span>
              </div>
              <div className="flex justify-end space-x-2">
                <div className="space-y-2 flex-grow md:flex-grow-0">
                  <div className="bg-slaet-50 p-2.5 rounded-lg shadow-md">
                    {userInput}
                  </div>
                </div>
                <Avatar>
                  <ImageCellOne
                    imageUrl={user?.imageCredential || user?.image || ""}
                    createdAt={user?.createdAt || ""}
                    email={user?.email || ""}
                    isClient={true}
                    customClassFeedBack="z-[9999999]"
                  />
                  <AvatarFallback className="bg-sky-500">
                    <User className="text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-grow">
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={chatEndRef} />
        <div className="relative w-full max-w-screen-lg mx-auto">
          <div className="fixed bottom-0 left-0 right-0 w-full px-4 py-2">
            <div className="relative flex items-center w-full max-w-screen-lg mx-auto">
              <Textarea
                disabled={isLoading}
                className="bg-white dark:text-slate-900 flex-grow p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
                placeholder="Type your message..."
                rows={1}
                style={{ minHeight: `${minHeight}px`, maxHeight: "150px" }}
                value={userInput}
                onChange={handleUserInput}
                onInput={handleUserInput}
                onKeyDown={handleKeyDown}
              />
              <Button
                size="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                onClick={sendMessage}
                disabled={isLoading || userInput.trim() === ""}
              >
                {isLoading ? <Square fill="#fff" /> : <ArrowUp />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatGemini;