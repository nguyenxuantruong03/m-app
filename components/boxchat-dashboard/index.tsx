"use client";

import { Loader2, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import { pusherClient } from "@/lib/pusher";
import { useParams, useRouter } from "next/navigation";

const BoxchatSystem = () => {
  const user = useCurrentUser();
  const params = useParams();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [unseenMessages, setUnseenMessages] = useState<any[]>([]);
  const pusherKey = user?.email;

  useEffect(() => {
    // Kiểm tra nếu pathname là "/conversations" hoặc "/list-users" thì không gọi API
    if (
      params?.pathname === "/conversations" ||
      params?.pathname === "/list-users"
    ) {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        //Logic GET thay đổi patch thành GET
        const unseen = await axios.get(`/api/conversations/unseenAllSystem`);
        setUnseenMessages(unseen.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params?.pathname]);

  //-------------------Unseen------------------------
  useEffect(() => {
    // Kiểm tra nếu pathname là "/conversations" hoặc "/list-users" thì không gọi API
    if (
      params?.pathname === "/conversations" ||
      params?.pathname === "/list-users"
    ) {
      return;
    }
    if (!pusherKey) return;

    // Define the unseenHandler to handle both cases
    const unseenAllSystemHandler = (data: {
      conversationId: string;
      message: any;
    }) => {
      // Cập nhật danh sách tin nhắn chưa đọc dựa trên conversationId
      setUnseenMessages((prev) => [...prev, data.message]);
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("messages:unseenNewMessage", unseenAllSystemHandler);

    return () => {
      pusherClient.unbind("messages:unseenNewMessage", unseenAllSystemHandler);
      pusherClient.unsubscribe(pusherKey);
    };
  }, [pusherKey, params?.pathname]);

  const unseenMessageCount = useMemo(() => {
    if (!unseenMessages) return 0;

    // Filter unseen messages by the conversationId
    return unseenMessages.length;
  }, [unseenMessages]);

  // Kiểm tra nếu params là /conversations hoặc /list-users
  if (
    params?.pathname === "/conversations" ||
    params?.pathname === "/list-users"
  ) {
    return null; // Không render gì cả
  }

  return (
    <>
      {user && user.email === process.env.NEXT_PUBLIC_EMAIL_SYSTEM && (
        <div className="relative">
          <button
            onClick={() => router.push("/conversations")}
            disabled={loading}
            className={`fixed bottom-10 left-10 rounded-full bg-sky-500 p-4 font-mono font-bold text-white transition-colors duration-300 ease-linear ${
              unseenMessageCount > 0
                ? "before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-sky-500"
                : ""
            } hover:bg-sky-700 hover:before:bg-sky-700`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <MessageCircle className="w-5 h-5" />
            )}
            {unseenMessageCount > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unseenMessageCount}
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default BoxchatSystem;
