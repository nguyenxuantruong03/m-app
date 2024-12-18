"use client"
import { useEffect } from "react";
import { 
  FieldValues, 
  UseFormRegister, 
  FieldErrors 
} from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  loading: boolean;
  onSendMessage: () => void; // Thêm một hàm để gửi tin nhắn
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  required,
  register,
  loading,
  onSendMessage, // Lấy hàm gửi tin nhắn
}) => {
  // Hàm xử lý sự kiện khi người dùng nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngừng hành động mặc định của Enter (xuống dòng)
      const messageValue = e.currentTarget.value.trim(); // Lấy giá trị tin nhắn và loại bỏ khoảng trống
      if (messageValue.length > 0) {
        onSendMessage(); // Gửi tin nhắn khi Enter được nhấn và tin nhắn không rỗng
      }
    }
  };

    useEffect(() => {
      // Kiểm tra xem input đã được render chưa và focus vào nó
      const inputElement = document.getElementById(id);
      if (inputElement) {
        inputElement.focus();
      }
    }, []);

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        maxLength={350}
        className="
          text-slate-900
          dark:text-slate-200
          font-light
          py-2
          px-4
          w-full
          focus:outline-none
          bg-transparent
          resize-none
          h-[60px]
        "
        disabled={loading}
        onKeyDown={handleKeyDown} // Lắng nghe sự kiện onKeyDown
      />
    </div>
  );
};

export default MessageInput;
