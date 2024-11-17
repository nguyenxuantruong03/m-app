import React, { useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, BotMessageSquare, Check, Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github.css";
import { ChatMessage } from "@/types/type";
import { useCurrentUser } from "@/hooks/use-current-user";
import ImageCellOne from "@/components/image-cell-one";

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
}

const ChatHistory = ({ chatHistory }: ChatHistoryProps) => {
  const user = useCurrentUser();
  const [copiedKeys, setCopiedKeys] = useState<{ [key: string]: boolean }>({});

  const handleCopy = (key: string) => {
    setCopiedKeys((prevState) => ({
      ...prevState,
      [key]: true,
    }));

    setTimeout(() => {
      setCopiedKeys((prevState) => ({
        ...prevState,
        [key]: false,
      }));
    }, 5000);
  };

  const customRenderers: Components = {
    code: ({ className, children, ...props }) => {
      // Check if it's inline code
      const isInline = className?.includes("language-");

      // Extract the language type from the className (e.g., language-jsx, language-tsx)
      const languageType = className?.split("language-")[1] || "";

      // Extract the text from the children, even if it's an array or object
      const extractText = (node: React.ReactNode): string => {
        if (typeof node === "string") {
          return node;
        }
        if (Array.isArray(node)) {
          return node.map(extractText).join(""); // Recursively join array elements as text
        }
        if (node && typeof node === "object" && "props" in node) {
          return extractText(node.props.children); // If it's a React component, extract its children
        }
        return "";
      };

      const value = extractText(children); // Extract the raw text content

      return (
        <>
          {isInline ? (
            <div className="relative">
              <div className="absolute top-0 bg-slate-900 w-full text-slate-200 rounded-t-md px-2 pt-1 pb-3 text-xs">
                <span className="block  mt-1">{languageType || "code"}</span>
              </div>
              <div className="sticky flex justify-end top-2 right-0 z-10">
                <CopyToClipboard text={value}>
                  <Button
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-900"
                    onClick={() => handleCopy(value)}
                  >
                    {copiedKeys[value] ? (
                      <>
                        <Check /> Đã sao chép
                      </>
                    ) : (
                      <>
                        <Copy /> Sao chép mã
                      </>
                    )}
                  </Button>
                </CopyToClipboard>
              </div>

              <code
                {...props}
                className={`${className}`} // Ensure the className is included
              >
                {children}
              </code>
            </div>
          ) : (
            <code {...props}>{children}</code>
          )}
        </>
      );
    },
  };

  return (
    <div className="mt-10">
      {chatHistory.map((message, index) => (
        <div key={index} className="my-2">
          {message.type === "user" && (
            <div className="line-with-text">
              <span className="text-sm text-gray-400">{message.timestamp}</span>
            </div>
          )}
          <div
            className={`flex ${message.type === "user" ? "justify-end" : ""}`}
          >
            {message.type !== "user" && (
              <div className="mr-2">
                <Avatar>
                  <AvatarFallback className="bg-blue-600">
                    <BotMessageSquare className="text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            <div
              className={`relative py-2 px-4 rounded-lg w-fit ${
                message.type === "user"
                  ? "bg-gray-100 text-gray-800 max-w-xl break-words"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight, rehypeSlug]}
                components={customRenderers}
              >
                {message.message}
              </ReactMarkdown>
            </div>

            {message.type === "user" && (
              <div className="ml-2">
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
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
