"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import PasswordField from "./field/passwordfield";
import EmailField from "./field/emailfield";
import MultiInputField from "./field/mutipleinput";
import { login } from "@/actions/actions-signin-sign-up/login";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { useDevice } from "@/providers/device-info-provider";
import { LoginGuestModal } from "../modals/login-guest-modal";
import {
  getLoadingMessage,
  getToastError,
  translateBackToLogin,
  translateConfirmLogin,
  translateDontHaveAccount,
  translateExceededAttempts,
  translateForgotPassword,
  translateGuestLogin,
  translateLogin,
  translatePassword,
  translateResendError,
  translateResendSuccess,
  translateRetryLimit,
  translateTwoFactorAuth,
  translateTwoFactorExpired,
  translateTwoFactorExpiry,
  translateVerifyNotRobot,
  translateVerifyRobot,
  translateWelcomeBack,
} from "@/translate/translate-client";

const getTheme = () => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
};

const LoginForm = () => {
  const searchParams = useSearchParams();
  const deviceInfo = useDevice();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with diffrent provider!"
      : "";
  const [isMounted, setIsMounted] = useState(false);
  //ShowtoFactor dùng để xác thực 2 yếu tố hay còn được gọi là 2FA
  const [showTwoFacTor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [countdown, setCountdown] = useState(120); // Khởi tạo đếm ngược từ 2:00 (120 giây)
  const [resendCount, setResendCount] = useState(0);
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  //Nếu như có lỗi thì set tất cả mutipleInput thành trống
  const [isError, setIsError] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true); // Khởi tạo giá trị mặc định là true để hiển thị ReCAPTCHA
  const [theme, setTheme] = useState(getTheme());
  const [loginClicked, setLoginClicked] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //Làm mới borderInput
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedEmail, setIsSubmittedEmail] = useState(false);
  const [loadingResent, setLoadingResent] = useState(false);
  const [openGuestModal, setOpenGuestModal] = useState(false);
  //language
  const [language, setLanguage] = useState("vi");
  const [isOpen, setOpen] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  const MAX_RESEND_ATTEMPTS = 5;

  //language
  const languageToUse = storedLanguage || language;
  const toastErrorMessage = getToastError(languageToUse);
  const exceededAttemptMessage = translateExceededAttempts(languageToUse);
  const resendSuccessMessage = translateResendSuccess(languageToUse);
  const resendErrorMessage = translateResendError(languageToUse);
  const verifyRobotMessage = translateVerifyRobot(languageToUse);
  const welcomeBackMessage = translateWelcomeBack(languageToUse);
  const dontHaveAccountMessage = translateDontHaveAccount(languageToUse);
  const twoFactorAuthMessage = translateTwoFactorAuth(languageToUse);
  const passwordMessage = translatePassword(languageToUse);
  const forgotPasswordMessage = translateForgotPassword(languageToUse);
  const twoFactorExpiryMessage = translateTwoFactorExpiry(languageToUse);
  const twoFactorExpiredMessage = translateTwoFactorExpired(languageToUse);
  const retryLimitMessage = translateRetryLimit(languageToUse);
  const confirmLoginMessage = translateConfirmLogin(languageToUse);
  const guestLoginMessage = translateGuestLogin(languageToUse);
  const verifyNotRobotMessage = translateVerifyNotRobot(languageToUse);
  const backToLoginMessage = translateBackToLogin(languageToUse);
  const loginMessage = translateLogin(languageToUse);
  const loadingMessage = getLoadingMessage(languageToUse);

  useEffect(() => {
    if (isPending) {
      document.title = loadingMessage.loading;
    } else {
      document.title = loginMessage;
    }
  }, [isPending]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dùng để tự dộng đổi theme theo trình duyệt
  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getTheme());
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleThemeChange);
    };
  }, []);

  //Đếm ngược khi gửi lại mã xác thực
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (showTwoFacTor && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000); // Giảm 1 giây sau mỗi 1 giây
    }
    return () => clearTimeout(timer); // Clear timer khi component bị unmount
  }, [showTwoFacTor, countdown]);

  // form bên dưới dùng để validate trường nhập theo loginForm bên dưới gọi form đẻ validate code đã xử lý ở  đây và bên dưới dùng destructuring để gọi hết vào
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleResendCode = async () => {
    setError(""); // Xóa thông báo lỗi hiện tại
    setSuccess(""); // Xóa thông báo thành công hiện tại
    setLoadingResent(true);

    // Kiểm tra số lần thử lại đã vượt quá giới hạn
    if (resendCount >= MAX_RESEND_ATTEMPTS) {
      setShowTwoFactor(false); // Tắt chế độ xác thực hai yếu tố
      setLoadingResent(true);
      setError(`${exceededAttemptMessage}.`);
      return;
    }

    try {
      const values = form.getValues(); // Lấy giá trị mới nhất từ form
      setLoadingResent(true);
      const data = await login(values); // Gửi lại mã xác thực

      if (data?.error) {
        setError(data.error); // Hiển thị thông báo lỗi nếu có
        setIsError(true); // Đặt giá trị của state mới là true khi có lỗi
        setLoadingResent(false);
      }

      if (data?.success) {
        setSuccess(data.success); // Hiển thị thông báo thành công nếu có
        setLoadingResent(false);
      } else {
        setSuccess(resendSuccessMessage);
      }

      setCountdown(120); // Đặt lại đếm ngược
      await axios.patch(`/api/resendCount`, resendCount);
      setResendCount((prevCount) => prevCount + 1); // Tăng số lần thử lại lên 1
    } catch (error) {
      setError(resendErrorMessage); // Xử lý lỗi nếu có
    }
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setLoginClicked(true);
    setError("");
    setSuccess("");
    // If it's a guest login, bypass captcha verification
  if (values.email === "guest@gmail.com") {
    setCaptchaVerified(true); // Force captcha as verified for guest login
  }

  // Proceed only if captcha is verified (for non-guest logins)
  if (showCaptcha && !isCaptchaVerified && !(values.email === "guest@gmail.com")) {
    return setError(verifyRobotMessage);
  } else {
      startTransition(() => {
        login(values, callbackUrl, deviceInfo, languageToUse)
          .then((data) => {
            if (data?.error) {
              setError(data.error);
              setIsError(true); // Đặt giá trị của state mới là true khi có lỗi
              setPasswordValid(false);
              setPassword("");
              setIsSubmitted(true);
              setIsSubmittedEmail(true);
            }

            if (data?.success) {
              setSuccess(data.success);
              setPasswordValid(false);
              setPassword("");
              setEmail("");
              setIsSubmitted(true);
              setIsSubmittedEmail(true);
            }

            if (data?.twoFactor) {
              setShowTwoFactor(true);
              setCountdown(120); // Đặt lại đếm ngược
              setShowCaptcha(false);
            }
            //Nếu như sai tắt 2FA
            // else {
            //   setShowTwoFactor(false); // Đặt lại showTwoFactor thành false nếu không cần hiển thị form xác thực hai yếu tố
            //   setCountdown(0); // Đặt lại đếm ngược
            // }
          })
          .catch(() => setError(toastErrorMessage));
      });
    }
  };

  const handleCaptchaVerify = () => {
    setCaptchaVerified(true);
  };

  const handleGuestLogin = () => {
    const guestValues = {
      email: "guest@gmail.com",
      password: "guestguest@123A",
    };
    onSubmit(guestValues);
  };
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginGuestModal
        languageToUse={languageToUse}
        isOpen={openGuestModal}
        onClose={() => setOpenGuestModal(false)}
        onConfirm={handleGuestLogin}
        loading={isPending}
      />
      <CardWrapper
        headerLabel={welcomeBackMessage}
        backButtonHref="/auth/register"
        backButtonLabel={dontHaveAccountMessage}
        showSocial
        setLanguage={setLanguage}
        languageToUse={languageToUse}
        isPending={isPending}
        setOpen={setOpen}
        isOpen={isOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {showTwoFacTor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{twoFactorAuthMessage}</FormLabel>
                      <FormControl>
                        <MultiInputField
                          length={6} // Số lượng ô input
                          onChange={(newValue) => field.onChange(newValue)} // Cập nhật giá trị mới vào field của useForm
                          isError={isError}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFacTor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <EmailField
                            languageToUse={languageToUse}
                            field={field}
                            isPending={isPending}
                            setEmail={setEmail}
                            email={email}
                            validateEmail={setEmailValid}
                            setError={setError}
                            setSuccess={setSuccess}
                            isSubmittedEmail={isSubmittedEmail}
                            setIsSubmittedEmail={setIsSubmittedEmail}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{passwordMessage}</FormLabel>
                        <FormControl>
                          <PasswordField
                            languageToUse={languageToUse}
                            field={field}
                            isPending={isPending}
                            validatePassword={setPasswordValid}
                            setPassword={setPassword}
                            password={password}
                            setError={setError}
                            setSuccess={setSuccess}
                            isSubmitted={isSubmitted}
                            setIsSubmitted={setIsSubmitted}
                          />
                        </FormControl>
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href="/auth/reset">
                            {forgotPasswordMessage}
                          </Link>
                        </Button>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            {showTwoFacTor && (
              <div className="mt-2 mb-6">
                {countdown > 0 ? (
                  <p className="text-sm">
                    {twoFactorExpiryMessage.name1}
                    <span className="font-bold">{countdown}</span>{" "}
                    {twoFactorExpiryMessage.name2}.
                  </p>
                ) : (
                  <>
                    <p className="text-sm">
                      {twoFactorExpiredMessage.name1}
                      {countdown === 0 && (
                        <Label
                          className={`text-sm cursor-pointer ${
                            loadingResent
                              ? "text-gray-400 cursor-not-allowed"
                              : "hover:underline text-sky-400"
                          }`}
                          onClick={loadingResent ? () => {} : handleResendCode}
                        >
                          {twoFactorExpiredMessage.name2}
                        </Label>
                      )}
                      .
                    </p>
                    {resendCount >= 1 && (
                      <>
                        <p className="text-xs text-red-500">
                          {retryLimitMessage.name1}
                          <span className="font-bold text-xs text-red-500">
                            {resendCount}
                          </span>
                          {retryLimitMessage.name2}
                        </p>
                        <p className="text-xs  text-red-500">
                          <span className="text-sm text-red-500 font-bold">
                            {retryLimitMessage.name3}
                          </span>
                          {retryLimitMessage.name4}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {showCaptcha && (
              <div className="mb-1">
                <ReCAPTCHA
                  sitekey="6LePtLopAAAAAMq1dib9ylE_qam95hA6CVCNIsRr"
                  onChange={handleCaptchaVerify} // Xác thực ReCAPTCHA và cập nhật trạng thái
                  theme={theme === "dark" ? "dark" : undefined}
                />
              </div>
            )}

            <div className="my-2">
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={
                isPending ||
                !isPasswordValid ||
                !isCaptchaVerified ||
                !isEmailValid
              }
            >
              {showTwoFacTor
                ? confirmLoginMessage.name1
                : confirmLoginMessage.name2}
            </Button>

            <Button
              className="w-full my-2 hover:underline"
              disabled={isPending}
              variant="link"
              onClick={() => setOpenGuestModal(true)}
            >
              {guestLoginMessage}
            </Button>

            {/* Hiển thị lỗi nếu như chưa ghi password và robot */}
            <>
              {loginClicked && !isCaptchaVerified && (
                <div className="flex items-center space-x-1">
                  <X className="w-5 h-5 mr-1 text-red-500" />
                  <span className="text-red-500 text-xs">
                    {verifyNotRobotMessage}
                  </span>
                </div>
              )}
            </>
          </form>
        </Form>
        {showTwoFacTor && (
          <div className="mt-2 text-center">
            <span onClick={() => window.location.reload()}>
              <span className="hover:underline cursor-pointer text-sky-600 text-sm">
                {backToLoginMessage}
              </span>
            </span>
          </div>
        )}
      </CardWrapper>
    </>
  );
};

export default LoginForm;
