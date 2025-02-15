"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface PasswordFieldProps {
  field: {
    onChange: (value: string) => void;
  };
  isPending: boolean;
  validatePasswordNew: (isValid: boolean) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  isSubmittedPasswordnew?: boolean;
  setError: (value: string) => void;
  setSuccess: (value: string) => void;
  setIsSubmittedPasswordnew: (value: boolean) => void;
}

const PasswordNewField: React.FC<PasswordFieldProps> = ({
  field,
  isPending,
  validatePasswordNew,
  newPassword,
  setNewPassword,
  isSubmittedPasswordnew,
  setError,
  setSuccess,
  setIsSubmittedPasswordnew,
}) => {
  const t = useTranslations()
  const [validations, setValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    isLengthValid: false,
  });

  const [showValidations, setShowValidations] = useState(false);
  const [hasSpace, setHasSpace] = useState(false); // Biến state để kiểm tra mật khẩu có chứa khoảng trắng không
  const [hasAccentError, setHasAccentError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [allValid, setAllValid] = useState(false); // Thêm state để theo dõi tất cả các yêu cầu đều hợp lệ

  //Kiếm tra nếu tất cả các valid đều đúng thì ẩn đi
  useEffect(() => {
    // Kiểm tra nếu tất cả các yêu cầu đều hợp lệ, ẩn showValidations
    if (
      validations.hasUpperCase &&
      validations.hasLowerCase &&
      validations.hasNumber &&
      validations.isLengthValid &&
      !hasSpace &&
      !hasAccentError
    ) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }, [validations, hasSpace, hasAccentError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowValidations(true); // Hiển thị validations khi ghi vào input
    const passwordInput = e.target.value;
    if (passwordInput === "") {
      setIsTyping(false); // Nếu input rỗng, set isTyping thành false
    } else {
      setIsTyping(true); // Ngược lại, nếu có nội dung trong input, set isTyping thành true
    }
    const hasAccent = /[^\x00-\x7F]+/.test(passwordInput); // Kiểm tra xem có ký tự có dấu không
    setHasAccentError(hasAccent); // Cập nhật trạng thái của thông báo lỗi
    if (hasAccent) {
      validatePasswordNew(false); // Nếu có dấu, đặt isValid thành false
      return; // Dừng lại và không cập nhật state
    }

    // Tiếp tục xử lý như bình thường nếu không có ký tự có dấu
    const hasSpaceInPassword = /\s/.test(passwordInput); // Kiểm tra xem mật khẩu có chứa khoảng trắng không
    setHasSpace(hasSpaceInPassword); // Cập nhật biến state

    // Kiểm tra các yêu cầu của mật khẩu
    const hasUpperCase = /[A-Z]/.test(passwordInput);
    const hasLowerCase = /[a-z]/.test(passwordInput);
    const hasNumber = /\d/.test(passwordInput);
    const isLengthValid =
      passwordInput.length >= 6 && passwordInput.length <= 20;

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

    validatePasswordNew(isValid); // Gửi kết quả cho validatePassword
    setNewPassword(passwordInput);
    field.onChange(passwordInput);
  };

  const handleInputClick = () => {
    setShowValidations(true);
  };

  const handleBlur = () => {
    setShowValidations(false); // Ẩn validations
  };

  const handleFocus = () => {
    setError("");
    setSuccess("");
    setIsSubmittedPasswordnew(false);
    const inputElement = inputRef.current;
    if (inputElement) {
      setTimeout(() => {
        inputElement.style.borderImage = "initial"; // Đặt lại border image style sau một khoảng thời gian ngắn
      }, 1); // Đợi 1ms trước khi thực hiện xóa border
    }
  };

  const calculateBorderPercentage = (): number => {
    // Tính toán tỷ lệ phần trăm của các yếu tố hợp lệ
    const validCount = Object.values(validations).filter(
      (valid) => valid
    ).length;
    let additionalCount = 0;

    // Nếu có hasSpace hoặc hasAccentError, tăng additionalCount
    if (!hasSpace) {
      additionalCount++;
    }

    if (!hasAccentError) {
      additionalCount++;
    }

    // Đảm bảo tất cả các yếu tố đều hợp lệ thì mới tăng additionalCount
    if (
      validCount === Object.keys(validations).length &&
      !hasSpace &&
      !hasAccentError
    ) {
      additionalCount++;
    }

    return (
      ((validCount + additionalCount) / (Object.keys(validations).length + 2)) *
      100
    ); // Tổng số yếu tố là 8 (6 yếu tố chuẩn + 2 yếu tố bổ sung)
  };

  const borderPercentage = calculateBorderPercentage();

  const leftColorStop = borderPercentage / 2;
  const rightColorStop = 100 - borderPercentage / 2;

  const borderStyle = isTyping
    ? {
        // Style được áp dựa trên trạng thái của input blur
        borderImage: isSubmittedPasswordnew
          ? "" // Nếu isSubmittedPasswordnew là true, đặt lại border thành rỗng
          : `linear-gradient(to left,#22c55e ${leftColorStop}%, #ef4444 ${leftColorStop}%, #ef4444 ${rightColorStop}%, #22c55e ${rightColorStop}%) 1`,
        borderWidth: "2px",
        borderRadius: "10px",
        clipPath: "inset(0 round 3px)",
      }
    : {}; // Nếu input không blur, không áp dụng style

  return (
    <>
      <Input
        disabled={isPending}
        placeholder="******"
        type="password"
        value={newPassword}
        onChange={handleChange}
        onClick={handleInputClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        style={borderStyle}
      />

      <div
        className={`mt-2 space-y-2 ${
          showValidations && !allValid // Sử dụng biến state mới để kiểm tra
            ? "opacity-100 max-h-96 animate-fade-down animate-once animate-duration-[1200ms] animate-delay-100 animate-ease-in-out"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center space-x-1">
          {validations.hasUpperCase ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                {t("formInfo.completedPasswordUpperCase")}
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                {t("formInfo.hasUppercaseLetter")}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {validations.hasLowerCase ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                {t("formInfo.completedPassword")}
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                {t("formInfo.hasLowercase")}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {validations.hasNumber ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
                {t("formInfo.completedNumbers0to9")}
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                {t("formInfo.hasDigit")}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {validations.isLengthValid ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400">
              {t("formInfo.completedNumbers6tp20")}
              </span>
            </>
          ) : (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs text-red-500">
                {t("formInfo.characterLength")}
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
              {t("formInfo.noSpacesInPassword")}
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">
              {t("formInfo.noValidSpace")}
            </span>
          </div>
        )}
        {hasAccentError ? (
          <div className="flex items-center space-x-1">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-xs text-red-500">
              {t("formInfo.noAccentedCharactersInPassword")}
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">
              {t("formInfo.noValidAccent")}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default PasswordNewField;
