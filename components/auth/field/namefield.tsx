"use client"
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

interface NameFieldProps {
  field: {
    onChange: (value: string) => void;
  };
  isPending: boolean;
  validateName: (isValid: boolean) => void;
  name: string; 
  setName: (value: string) => void; 
}

const NameField: React.FC<NameFieldProps> = ({ field, isPending, validateName,setName,name }) => {
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [isNameLengthValid, setIsNameLengthValid] = useState(false); // State mới để kiểm tra độ dài ký tự
  const [allValid, setAllValid] = useState(false); // Thêm state để theo dõi tất cả các yêu cầu đều hợp lệ

  const inputRef = useRef<HTMLInputElement>(null);

  //Kiếm tra nếu tất cả các valid đều đúng thì ẩn đi
  useEffect(() => {
    // Kiểm tra nếu tất cả các yêu cầu đều hợp lệ, ẩn showValidations
    if (
      isValidName && isNameLengthValid
    ) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }, [isValidName,isNameLengthValid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    // Loại bỏ khoảng trắng chỉ ở đầu chuỗi
    inputValue = inputValue.replace(/^\s+/, '');
    // Loại bỏ khoảng trắng chỉ ở cuối chuỗi
    inputValue = inputValue.replace(/\s+$/, ' ');
    
    const isValid = /^[a-zA-ZÀ-ỹ\s]*$/.test(inputValue);
    setIsValidName(isValid && inputValue !== '');
    setShowNamePrompt(true);
    validateName(isValid && inputValue !== '');
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

  return (
    <>
      <Input
        disabled={isPending}
        placeholder="Họ và tên..."
        value={name} // Bind value to the local state
        onChange={handleInputChange}
        onClick={() => setShowNamePrompt(true)}
        onBlur={handleBlur}
        ref={inputRef}
        className={`border-2 ${isInvalidInput ? 'border-red-500' : (isValidName || isNameLengthValid ? 'border-green-400' : '')}`}
      />
      <div
        className={`mt-2 space-y-2 ${
          (showNamePrompt && !allValid)
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
              <span className="text-xs text-green-400">
                Hợp lệ!
              </span>
            ) : (
              <span className="text-xs text-red-500">
                Không được khoảng cách đầu dòng và ghi số
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {isNameLengthValid ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                Bạn đã nhập đủ Họ và Tên!
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                Hãy nhập đủ Họ và Tên. ít nhất 4 ký tự!
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NameField;
