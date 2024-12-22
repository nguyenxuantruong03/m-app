"use client";

import { Loader2, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ModalChat from "./components/Modal-chat";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { useCurrentUser } from "@/hooks/use-current-user";
import BoxchatSkeleton from "@/components/(client)/skeleton/boxchat-skeleton";
import toast from "react-hot-toast";
import { getToastError, translateConversationErrorMessages } from "@/translate/translate-client";

const BoxChat = () => {
  const user = useCurrentUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [unseenMessages, setUnseenMessages] = useState<any[]>([]);
  const conversationId = user?.conversationId;
  const pusherKey = user?.email;

  const languageToUse = user?.language || "vi"

  const errorToastMessage = getToastError(languageToUse)
  const conversationErrorMessage = translateConversationErrorMessages(languageToUse)

  useEffect(() => {
    if (user?.role === "GUEST"|| !user?.id) {
      return;
    }

    //--------- Nếu để logic này thì mới vào nó sẽ call trước nhưng tôi muốn khi onClick mới call chỉ call unseent trước để người dùng biết---------
    const fetchData = async () => {
      try {
        setLoading(true);
        //Logic GET thay đổi patch thành GET
        if (conversationId) {
          // const messages = await axios.patch("/api/messages", {
          //   conversationId: conversationId,
          // });
          // const conversation = await axios.patch("/api/conversations", {
          //   conversationId: conversationId,
          // });
          const unseen = await axios.get(`/api/conversations/unseen`);
          setUnseenMessages(unseen.data);
          // setMessages(messages.data);
          // setConversation(conversation.data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Lắng nghe sự kiện Pusher khi tin nhắn mới được gửi
    const channel = pusherClient.subscribe(conversationId || "");

    // Cập nhật tin nhắn khi sự kiện 'messages:new' xảy ra
    channel.bind("messages:new", (newMessage: any) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Dọn dẹp khi component bị unmount
    return () => {
      pusherClient.unsubscribe(conversationId || "");
    };
  }, [conversationId]);

  const handleCreateConvertation = useCallback(async () => {
    if (user?.role === "GUEST" || !user?.id) {
      return;
    }
    setLoading(true);
    try {
      //Tạo conversation mới nếu chưa có
      const conversationCreate = await axios.post("/api/conversations", {
        userId: `${process.env.NEXT_PUBLIC_USERID_SYSTEM}`,
      });

      if (conversationCreate.data.id) {
        // Use Promise.all to handle all three asynchronous calls in parallel
        const [seenResponse, messages, conversation] = await Promise.all([
          axios.post(`/api/conversations/${conversationCreate.data.id}/seen`), // Seen request in parallel
          axios.patch("/api/messages", {
            conversationId: conversationCreate.data.id,
          }),
          axios.patch("/api/conversations", {
            conversationId: conversationCreate.data.id,
          }),
        ]);
    
        // Set the state for messages and conversation
        setMessages(messages.data);
        setConversation(conversation.data);
      }

    } catch (error) {
      toast.error(errorToastMessage);
      throw error; // Ném lỗi ra ngoài để catch trong handleButtonClick
    } finally {
      setLoading(false);
    }
  }, []);

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (user?.role === "GUEST" || !user?.id) {
      return;
    }
    try {
      setLoading(true); // Bắt đầu hiển thị loading
      setDrawerOpen((prev) => !prev); // Mở drawer sau khi hoàn tất
      await handleCreateConvertation(); // Chờ hàm tạo conversation hoàn tất
    } catch (error) {
      toast.error(conversationErrorMessage);
    } finally {
      setLoading(false); // Dừng hiển thị loading
    }
  };

  //-------------------Unseen------------------------
  useEffect(() => {
    if (user?.role === "GUEST" || !user?.id) {
      return;
    }
    if (!pusherKey) return;

    // Define the unseenHandler to handle both cases
    const unseenHandler = (messages: any[]) => {
      setUnseenMessages(messages);
    };

    const unseenNewMessageHandler = (data: {
      conversationId: string;
      message: any;
    }) => {
      // Cập nhật danh sách tin nhắn chưa đọc dựa trên conversationId
      setUnseenMessages((prev) => [...prev, data.message]);
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("messages:unseen", unseenHandler);
    pusherClient.bind("messages:unseenNewMessage", unseenNewMessageHandler);

    return () => {
      pusherClient.unbind("messages:unseen", unseenHandler);
      pusherClient.unbind("messages:unseenNewMessage", unseenNewMessageHandler);
      pusherClient.unsubscribe(pusherKey);
    };
  }, [pusherKey]);

  // Get the number of unseen messages for this conversation based on conversationId
  const unseenMessageCount = useMemo(() => {
    if (!unseenMessages || !conversationId) return 0;

    // Filter unseen messages by the conversationId
    return unseenMessages.filter((msg) => msg.conversationId === conversationId)
      .length;
  }, [unseenMessages, conversationId]);

  return (
    <>
      {user?.role !== "GUEST" && user?.id && (
        <div className="relative">
          <button
            disabled={loading}
            onClick={handleButtonClick}
            className={`fixed bottom-20 md:bottom-10 left-4 md:left-10 z-[99999999999] rounded-full bg-red-500 p-3 md:p-4 font-mono font-bold text-white transition-colors duration-300 ease-linear ${
              unseenMessageCount > 0
                ? "before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-red-500"
                : ""
            } hover:bg-red-700 hover:before:bg-red-700`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <MessageCircle className="w-5 h-5" />
            )}
            {unseenMessageCount > 0 && (
              <div className="absolute top-0 right-0 bg-red-900 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unseenMessageCount}
              </div>
            )}
          </button>

          <ModalChat isOpen={drawerOpen}>
            {!loading && conversation ? (
              <div className="h-full w-full flex flex-col">
                <Header
                  conversation={conversation}
                  onClose={() => setDrawerOpen(false)}
                  language={languageToUse}
                />
                <Body language={languageToUse} initialMessages={messages} conversation={conversation} />
                <Form language={languageToUse} loading={loading} conversationId={conversationId} />
              </div>
            ) : (
              <>
                <BoxchatSkeleton />
              </>
            )}
          </ModalChat>
        </div>
      )}
    </>
  );
};

export default BoxChat;
