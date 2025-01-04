'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { FullConversationType } from "@/types/type";
import useOtherUser from "@/hooks/useOtherUser";
import AvatarBoxChat from "@/components/AvatarBoxChat";
import { useTranslations } from "next-intl";

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean;
  pusherKey: string | null | undefined;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ 
  data, 
  selected,
  pusherKey,
}) => {
  const t = useTranslations()
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  
  const [unseenMessages, setUnseenMessages] = useState<any[]>([]);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);
  
  const hasSeen = useMemo(() => {
    
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return t("message.sentImage");
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return t("message.startedConversation");
  }, [lastMessage]);

  // Fetch unseen messages on mount
  useEffect(() => {
    const fetchUnseenMessages = async () => {
      try {
        const response = await axios.get(`/api/conversations/unseen`);
        setUnseenMessages(response.data);
      } catch (error) {
        console.error(t("message.failedToFetchUnseenMessages"));
      }
    };

    fetchUnseenMessages();
  }, []);

  useEffect(() => {
    if (!pusherKey) return;
  
    // Define the unseenHandler to handle both cases
  const unseenHandler = (messages: any[]) => {
      setUnseenMessages(messages);
    };

  const unseenNewMessageHandler = (data: { conversationId: string; message: any }) => {
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
      if (!unseenMessages || !data.id) return 0;

      // Filter unseen messages by the conversationId
      return unseenMessages.filter((msg) => msg.conversationId === data.id).length;
    }, [unseenMessages, data.id]);

  return ( 
    <div
      onClick={handleClick}
      className={clsx(`
        w-full
        relative
        flex
        items-center
        space-x-3
        bg-neutral-100
        dark:bg-slate-200
        p-3
        group
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? 'bg-neutral-300 hover:bg-neutral-400 dark:bg-slate-200 dark:hover:bg-slate-300' : 'bg-netral-200 hover:bg-neutral-300 dark:bg-slate-700 dark:hover:bg-slate-500'
      )}
    >
      <AvatarBoxChat user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className={`text-md font-medium ${selected ? "text-slate-900" : "text-gray-900 dark:text-slate-200"}`}>
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p 
                className="text-xs text-gray-400 font-light"
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p 
            className={clsx(`
              truncate 
              text-sm
            `,
            hasSeen ? 'text-gray-500 group-hover:text-slate-700 dark:group-hover:text-slate-900' : 'text-black font-medium')}>
              {lastMessageText}
          </p>
          {unseenMessageCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {unseenMessageCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConversationBox;
