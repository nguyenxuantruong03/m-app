"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConversationBox from "./ConversationBox";
import { useSession } from "next-auth/react";
import { find } from "lodash";
import { FullConversationType } from "@/types/type";
import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/lib/pusher";
import { useTranslations } from "next-intl";

interface ConversationListProps {
  initialItems: any[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const t = useTranslations()
  const session = useSession();
  const router = useRouter();

  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return { ...currentConversation, messages: conversation.messages };
          }
          return currentConversation;
        })
      );
    };

    /**
     * Chức năng này xóa một cuộc hội thoại khỏi danh sách các cuộc hội thoại dựa trên ID của nó.
     * Cuộc trò chuyện @param {FullConversationType} - Tham số `conversation` thuộc loại
     * `FullConversationType`, có khả năng là đối tượng chứa thông tin về cuộc hội thoại.
     * Chức năng này có thể được sử dụng để xóa một cuộc hội thoại cụ thể khỏi một loạt các cuộc hội thoại
     * được lưu trữ trong biến trạng thái `items`.
     */
    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id === conversation.id)];
      });
      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-200">
              {t("message.message")}
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              pusherKey={pusherKey}
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
export default ConversationList;
