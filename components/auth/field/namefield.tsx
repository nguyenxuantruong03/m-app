"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface NameFieldProps {
  field: {
    onChange: (value: string) => void;
  };
  isPending: boolean;
  validateName: (isValid: boolean) => void;
  name: string;
  setName: (value: string) => void;
  isSubmittedName: boolean;
  setError: (value: string) => void;
  setSuccess: (value: string) => void;
  setIsSubmittedName: (value: boolean) => void;
}

const NameField: React.FC<NameFieldProps> = ({
  field,
  isPending,
  validateName,
  setName,
  name,
  isSubmittedName,
  setError,
  setSuccess,
  setIsSubmittedName,
}) => {
  const t = useTranslations()
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [isNameLengthValid, setIsNameLengthValid] = useState(false); // State mới để kiểm tra độ dài ký tự
  const [allValid, setAllValid] = useState(false); // Thêm state để theo dõi tất cả các yêu cầu đều hợp lệ

  const inputRef = useRef<HTMLInputElement>(null);

  //Kiếm tra nếu tất cả các valid đều đúng thì ẩn đi
  useEffect(() => {
    // Kiểm tra nếu tất cả các yêu cầu đều hợp lệ, ẩn showValidations
    if (isValidName && isNameLengthValid) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }, [isValidName, isNameLengthValid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    // Loại bỏ khoảng trắng chỉ ở đầu chuỗi
    inputValue = inputValue.replace(/^\s+/, "");
    // Loại bỏ khoảng trắng chỉ ở cuối chuỗi
    inputValue = inputValue.replace(/\s+$/, " ");

    const isValid = /^[a-zA-ZÀ-ỹ\s]*$/.test(inputValue);
    setIsValidName(isValid && inputValue !== "");
    setShowNamePrompt(true);
    validateName(isValid && inputValue !== "");
    setIsInvalidInput(!isValid);
    setName(inputValue); // Cập nhật giá trị trong state
    // Kiểm tra độ dài tên
    setIsNameLengthValid(inputValue.length >= 4); // Tên phải có ít nhất 2 ký tự
    field.onChange(inputValue); // Gọi field.onChange để cập nhật state của biểu mẫu
  };

  const handleBlur = () => {
    setShowNamePrompt(false);
    setIsInvalidInput(false);
  };

  const handleFocus = () => {
    setError("");
    setSuccess("");
    setIsSubmittedName(false);
    // Thiết lập lại màu của trường email
    const inputElement = inputRef.current;
    if (inputElement) {
      setTimeout(() => {
        inputElement.classList.remove("border-red-500", "border-green-400");
      }, 1); // Đợi 1ms trước khi thực hiện xóa border
    }
  };

  return (
    <>
      <Input
        disabled={isPending}
        placeholder={`${t("info.fullName")}...`}
        value={name} // Bind value to the local state
        onChange={handleInputChange}
        onClick={() => setShowNamePrompt(true)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
        className={`border-2 ${
          isInvalidInput
            ? "border-red-500"
            : isSubmittedName
            ? ""
            : isValidName || isNameLengthValid
            ? "border-green-400"
            : ""
        }`}
      />
      <div
        className={`mt-2 space-y-2 ${
          showNamePrompt && !allValid
            ? "opacity-100 max-h-96 animate-fade-down animate-once animate-duration-[1200ms] animate-delay-100 animate-ease-in-out"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex item-center space-x-1">
          {isValidName ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <X className="w-5 h-5 text-red-500" />
          )}
          <span className="text-xs">
            {isValidName ? (
              <span className="text-xs text-green-400">{t("auth.valid")}</span>
            ) : (
              <span className="text-xs text-red-500">
                {t("auth.noIndentNoNumber")}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {isNameLengthValid ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                {t("auth.fullNameEnter")}
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                {t("auth.enterFullName")} {t("auth.min4Characters")}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NameField;
