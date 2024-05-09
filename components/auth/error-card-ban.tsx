"use client";
import { useEffect } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";

interface ErrorCardProps {
  daysLeft: number;
}

function formatTimeout(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const ErrorCardBan: React.FC<ErrorCardProps> = ({ daysLeft }) => {
  useEffect(() => {
    const time = formatTimeout(daysLeft);
    // Use toast.success inside useEffect to ensure it's triggered after component mount
    if (daysLeft > 0) {
      alert(
        `Tài khoản của bạn đã bị khóa. Bạn có thể đăng nhập lại sau ${time} giờ. Để biết thêm thông tin liên hệ ADMIN.`
      );
    }
  }, [daysLeft]);
  // If daysLeft is 0, do not render the ErrorCard
  if (daysLeft === 0) {
    return null;
  }

  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCardBan;
