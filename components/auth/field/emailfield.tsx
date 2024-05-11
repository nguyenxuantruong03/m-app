"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

interface EmailFieldProps {
  field: {
    onChange: (value: string) => void;
  };
  isPending: boolean;
  email: string;
  setEmail: (value: string) => void;
  isSubmitted?: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({
  field,
  isPending,
  email,
  setEmail,
  isSubmitted,
}) => {
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false); // Thêm state mới
  const [allValid, setAllValid] = useState(false); // Thêm state để theo dõi tất cả các yêu cầu đều hợp lệ

  const inputRef = useRef<HTMLInputElement>(null);

  //Kiếm tra nếu tất cả các valid đều đúng thì ẩn đi
  useEffect(() => {
    // Kiểm tra nếu tất cả các yêu cầu đều hợp lệ, ẩn showValidations
    if (isValidEmail) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }, [isValidEmail]);

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    // Kiểm tra email có chứa ký tự @ hay không
    const isValid = emailRegex.test(emailInput);
    setIsValidEmail(isValid);
    setShowEmailPrompt(true); // Hiển thị prompt khi có sự thay đổi trong input
    setIsInvalidInput(!isValid); // Cập nhật trạng thái của biến isInvalidInput
    setEmail(emailInput);
    field.onChange(emailInput); // Call field.onChange to update form state
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
        className={`border-2 ${
          isInvalidInput
            ? "border-red-500"
            : isSubmitted
            ? ""
            : isValidEmail
            ? "border-green-400"
            : ""
        }`}
      />
      <div
        className={`mt-2 space-y-2 ${
          showEmailPrompt && !allValid
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
                Đã thêm đây đủ mail!
              </span>
            ) : (
              <span className="text-xs text-red-500">
                Bạn phải nhập email bao gồm @gmail.com hoặc các loại
                @example.com khác!
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default EmailField;
