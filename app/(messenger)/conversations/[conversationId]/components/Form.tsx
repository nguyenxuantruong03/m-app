"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import MessageInput from "./MessageInput";
import { SmilePlus, SendHorizontal  } from "lucide-react";
import useConversation from "@/hooks/useConversation";
import { Image as ImageIcon } from 'lucide-react';
import { CldUploadButton } from "next-cloudinary";
import { translateFormMessages } from "@/translate/translate-client";

interface FormProps{
  language: string
}

const Form = ({language}:FormProps) => {
  const { conversationId } = useConversation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const formMessage = translateFormMessages(language);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const message = watch("message");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    })
  }

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setValue("message", message + emoji.emoji, { shouldValidate: true });
  };

  return (
    <div
      className="
        p-4
        bg-white dark:bg-slate-700
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      <CldUploadButton 
        options={{ maxFiles: 1 }} 
        onUpload={handleUpload} 
        uploadPreset="ktkokc1o"
      >
        <ImageIcon size={24} className="text-sky-500 hover:text-sky-600" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full relative"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder={formMessage.writeMessage}
        />
         <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-400 dark:text-gray-300 dark:hover-text-slate-200 hover:text-gray-700"
        >
          <SmilePlus  size={24} />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-20 right-0 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <button
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
          <SendHorizontal  size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
