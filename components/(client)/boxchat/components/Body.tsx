"use client"

import { FullMessageType } from "@/types/type"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import { find } from "lodash"
import { pusherClient } from "@/lib/pusher"
import { Conversation, User } from "@prisma/client"
import useOtherUser from "@/hooks/useOtherUser"
import { useTranslations } from "next-intl"

interface BodyProps {
  initialMessages: FullMessageType[]
  conversation: Conversation & {
      users: User[];
    };
}

const Body: React.FC<BodyProps> = ({ initialMessages,conversation }) => {
  const t = useTranslations()
  const otherUser = useOtherUser(conversation);
  const [messages, setMessages] = useState(initialMessages)

  const defaultMessage: FullMessageType = {
    id: otherUser.id,
    body: t("message.helpMessage"),
    sender: {
      id: "system",
      phonenumber: "",
      nameuser: "",
      imageCredential: [],
      email: "system@chat.com",
      name: otherUser.name,
      image: otherUser.image,
    },
    senderId: "system",
    conversationId: "default-conversation",
    seenIds: [],
    seen: [], // Mảng rỗng cho danh sách những người đã xem
    createdAt: new Date(0),  // Tạo đối tượng Date, mặc định là ngày 01/01/1970
    image: null,
  };

  
  /* `const bottomRef = useRef<HTMLDivElement>(null);` đang tạo tham chiếu đến phần tử `div` trong
  JSX của thành phần. Tham chiếu này được sử dụng để cuộn phần tử vào chế độ xem khi có thông báo mới được thêm vào
  đến cuộc trò chuyện. Móc `useRef` được sử dụng để tạo tham chiếu và `HTMLDivElement`
  type được sử dụng để chỉ định loại phần tử đang được tham chiếu. Giá trị ban đầu của tham chiếu là
  `null`, có nghĩa là nó sẽ được gán cho thành phần `div` khi thành phần này được hiển thị. */
  const bottomRef = useRef<HTMLDivElement>(null)

  const conversationId = conversation.id

  /* Móc `useEffect` này đang đăng ký kênh Pusher cho cuộc hội thoại hiện tại và cuộn
phần tử `bottomRef` vào chế độ xem. `conversationId` được sử dụng làm phụ thuộc cho hiệu ứng, vì vậy
nó sẽ chạy lại bất cứ khi nào cuộc hội thoạiId thay đổi. */
  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

   /**
      * Chức năng này thêm một tin nhắn mới vào một mảng tin nhắn và cuộn xuống cuối
      * thùng chứa tin nhắn.
      * Thông báo @param {FullMessageType} - Tham số `message` thuộc loại `FullMessageType`, mà
      * có thể là một loại tùy chỉnh được xác định ở nơi khác trong cơ sở mã. Nó đại diện cho một đối tượng tin nhắn mà
      * đang được thêm vào một mảng các thông báo được lưu trữ trong trạng thái của thành phần bằng cách sử dụng `setMessages`
      * chức năng. Hàm kiểm tra xem đã có tin nhắn chưa
      */
    const messageHandler = (message: FullMessageType) => {
      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView()
    }
   /**
     * Chức năng này cập nhật một tin nhắn trong một mảng tin nhắn dựa trên ID của nó.
     * @param {FullMessageType} newMessage - newMessage là một biến kiểu FullMessageType mà
     * đại diện cho thông báo cập nhật cần được thay thế trong mảng thông báo.
     */
    const updateMessageHandler = (newMessage:FullMessageType) =>{
      setMessages((current)=> current.map((currentMessage)=>{
        if(currentMessage.id === newMessage.id){
          return newMessage;
        }
        return currentMessage
      }))
    }
   /* `pusherClient.bind("messages:new", messageHandler)` and `pusherClient.bind('message:
    update',updateMessageHandler)` là các trình lắng nghe sự kiện ràng buộc với ứng dụng khách Pizer. Điều thứ nhất là
    lắng nghe sự kiện "tin nhắn: mới", được kích hoạt khi một tin nhắn mới được thêm vào
    cuộc hội thoại. Hàm `messageHandler` sau đó được gọi, cập nhật trạng thái của
    thành phần có thông báo mới và cuộn phần tử bottomRef vào chế độ xem. cái thứ hai là
    lắng nghe sự kiện "tin nhắn: cập nhật", được kích hoạt khi một tin nhắn hiện có được cập nhật.
    Hàm `updateMessageHandler` sau đó được gọi, cập nhật trạng thái của thành phần với
    thông báo được cập nhật. */
    pusherClient.bind("messages:new", messageHandler)
    pusherClient.bind('message: update',updateMessageHandler)
    

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind("messages:new", messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  return (
    <div className="h-[380px] md:h-[425px] xl:h-[400px] overflow-y-auto bg-white dark:bg-black">
    {/* Tin nhắn mặc định */}
    <MessageBox key={defaultMessage.id} data={defaultMessage} />
    <div className="flex justify-center ">
      <p className="text-xs text-gray-500 text-center max-w-[280px]">
        {t('message.privacyNotice')}
      </p>
    </div>

    {/* Danh sách tin nhắn */}
    {messages.map((message) => (
      <MessageBox key={message.id} data={message} />
    ))}
    <div ref={bottomRef} className="pt-8 " />
  </div>
  )
}
export default Body
