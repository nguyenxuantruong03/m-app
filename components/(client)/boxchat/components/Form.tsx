"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import MessageInput from "./MessageInput"
import { SmilePlus, SendHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"

interface FormProps {
  loading: boolean
  conversationId: string | undefined
}
const Form = ({ loading, conversationId }: FormProps) => {
  const t  = useTranslations()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ""
    }
  })

  const message = watch("message")

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setShowEmojiPicker(false)
    const trimmedMessage = data.message.trim(); // Loại bỏ khoảng trống
    if (trimmedMessage.length === 0) return; // Không gửi nếu tin nhắn rỗng
    setValue("message", "", { shouldValidate: true })
    axios.post("/api/messages", {
      ...data,
      conversationId
    })
  }

  const handleSendMessage = () => {
    handleSubmit(onSubmit)() // Gọi onSubmit khi nhấn Enter
  }

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setValue("message", message + emoji.emoji, { shouldValidate: true })
  }

  return (
    <div
      className="
        md:p-4
        p-2
        bg-slate-200 dark:bg-slate-700
        rounded-b-md 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full relative">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder={t("message.writeMessage")}
          loading={loading}
          onSendMessage={handleSendMessage} // Truyền hàm gửi tin nhắn vào đây
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-400 dark:text-gray-300 dark:hover-text-slate-200 hover:text-gray-700"
        >
          <SmilePlus size={24} />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-20 -left-[18px] z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <button
          disabled={loading}
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <SendHorizontal size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Form
