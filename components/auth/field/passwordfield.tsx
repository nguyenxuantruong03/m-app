"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

interface PasswordFieldProps {
  field: {
    onChange: (value: string) => void;
  };
  isPending: boolean;
  validatePassword: (isValid: boolean) => void;
  password: string
  setPassword: (value: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  field,
  isPending,
  validatePassword,
  password,
  setPassword
}) => {
  const [validations, setValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    isLengthValid: false,
  });

  const [showValidations, setShowValidations] = useState(false);
  const [hasSpace, setHasSpace] = useState(false); // Biến state để kiểm tra mật khẩu có chứa khoảng trắng không
  const [hasAccentError, setHasAccentError] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true); // Biến state để kiểm tra tính hợp lệ của input
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputTouched, setInputTouched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTouched(true);
    setShowValidations(true); // Hiển thị validations khi ghi vào input
    const passwordInput = e.target.value;
    const hasAccent = /[^\x00-\x7F]+/.test(passwordInput); // Kiểm tra xem có ký tự có dấu không
    setHasAccentError(hasAccent); // Cập nhật trạng thái của thông báo lỗi
    if (hasAccent) {
      validatePassword(false); // Nếu có dấu, đặt isValid thành false
      setIsValidInput(false); // Input không hợp lệ
      return; // Dừng lại và không cập nhật state
    }

    // Tiếp tục xử lý như bình thường nếu không có ký tự có dấu
    const hasSpaceInPassword = /\s/.test(passwordInput); // Kiểm tra xem mật khẩu có chứa khoảng trắng không
    setHasSpace(hasSpaceInPassword); // Cập nhật biến state

    // Kiểm tra các yêu cầu của mật khẩu
    const hasUpperCase = /[A-Z]/.test(passwordInput);
    const hasLowerCase = /[a-z]/.test(passwordInput);
    const hasNumber = /\d/.test(passwordInput);
    const isLengthValid = passwordInput.length >= 6 && passwordInput.length <= 20;

    const isValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      isLengthValid &&
      !hasSpaceInPassword; // Kiểm tra xem mật khẩu có đáp ứng yêu cầu không

    setValidations({
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      isLengthValid,
    });

    validatePassword(isValid); // Gửi kết quả cho validatePassword
    setIsValidInput(isValid); // Cập nhật trạng thái của input
    setPassword(passwordInput)
    field.onChange(passwordInput); 
  };

  const handleInputClick = () => {
    setShowValidations(true);
  };

  const handleBlur = () => {
    setShowValidations(false);
  };

  return (
    <>
      <Input
        disabled={isPending}
        placeholder="******"
        type="password"
        value={password}
        onChange={handleChange}
        onClick={handleInputClick}
        onBlur={handleBlur}
        ref={inputRef}
        className={`border-2 ${
          inputTouched
            ? isValidInput
              ? "border-green-400"
              : "border-red-500"
            : "" // Border trống khi chưa chạm vào trường input
        }`}
      />
      <div
        className={`mt-2 space-y-2 ${
          showValidations
            ? "opacity-100 max-h-96 animate-fade-down animate-once animate-duration-[1200ms] animate-delay-100 animate-ease-in-out"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center space-x-1">
          {validations.hasUpperCase ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                Đã hoàn thành (A-Z)!
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                Có ít nhất một chữ cái viết hoa (A-Z)
              </span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {validations.hasLowerCase ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                Đã hoàn thành (a-z)!
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                Có ít nhất một chữ cái thường (a-z)
              </span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {validations.hasNumber ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                Đã hoàn thành (0-9)!
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                Có ít nhất một chữ số (0-9)
              </span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {validations.isLengthValid ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                Đã hoàn thành (6-20)!
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                6 đến 20 ký tự (6-20)
              </span>
            </>
          )}
        </div>
        {/* Có 2 cách hiển thị cái này mặc định không hiển thị khi có sai mới hiển thị */}
        {/* {hasSpace && (
          <div className="flex items-center space-x-1">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-xs text-red-500">
              Mật khẩu không được chứa khoảng trắng
            </span>
          </div>
        )}
        {hasAccentError && (
          <div className="flex items-center space-x-1">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-xs text-red-500">
              Mật khẩu không thể chứa ký tự có dấu.
            </span>
          </div>
        )} */}

        {/* Cái này mặc định hiển thị hợp lệ nếu có sai thì đổi sang không hợp lệ */}
        {hasSpace ? (
          <div className="flex items-center space-x-1">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-xs text-red-500">
              Mật khẩu không được chứa khoảng trắng
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">
              Không chứa khoảng cách hợp lệ!
            </span>
          </div>
        )}
        {hasAccentError ? (
          <div className="flex items-center space-x-1">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-xs text-red-500">
              Mật khẩu không thể chứa ký tự có dấu
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">
              Không chứa dấu hợp lệ!
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default PasswordField;
