"use client"
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

interface EmailFieldProps {
  field: {
    onChange: (value: string) => void;
  };
  isPending: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({ field, isPending }) => {
  const [email, setEmail] = useState<string>(""); // State to store the input value
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false); // Thêm state mới

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailinput = e.target.value;
    // Kiểm tra email có chứa ký tự @ hay không
    const isValid = emailinput.includes("@");
    setIsValidEmail(isValid);
    setShowEmailPrompt(true); // Hiển thị prompt khi có sự thay đổi trong input
    setIsInvalidInput(!isValid); // Cập nhật trạng thái của biến isInvalidInput

    setEmail(emailinput)
    field.onChange(emailinput); // Call field.onChange to update form state
  };

  const handleBlur = () => {
    setShowEmailPrompt(false); // Ẩn prompt khi input mất focus
    setIsInvalidInput(false); // Reset trạng thái của biến isInvalidInput khi input mất focus
  };

  return (
    <>
      <Input
        disabled={isPending}
        placeholder="vlxdxuantruong@gmail.com"
        onChange={handleInputChange}
        value={email} 
        onClick={() => setShowEmailPrompt(true)} // Hiển thị prompt khi input được click
        onBlur={handleBlur}
        ref={inputRef}
        type="email"
        className={`border-2 ${isInvalidInput ? 'border-red-500' : (isValidEmail ? 'border-green-400' : '')}`} // Áp dụng lớp CSS tương ứng
      />
      <div
        className={`mt-2 space-y-2 ${
          showEmailPrompt
            ? "opacity-100 max-h-96 animate-fade-down animate-once animate-duration-[1200ms] animate-delay-100 animate-ease-in-out"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex item-center space-x-1">
          {isValidEmail ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <X className="w-5 h-5 text-red-500" />
          )}
          <span className="text-xs">
            {isValidEmail ? (
              <span className="text-xs text-green-400">
                Đã thêm @!
              </span>
            ) : (
              <span className="text-xs text-red-500">
                Bạn phải nhập email bao gồm @gmail.com hoặc các loại @ khác!
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default EmailField;
