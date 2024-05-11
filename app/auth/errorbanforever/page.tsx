"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";

const ErrorCard = () => {
 
  return (
    <CardWrapper
      headerLabel="Tài khoản khóa vĩnh viễn!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="bg-red-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-semibold">
        <AlertTriangle className="text-destructive w-12" /> 
        <p>Chúng tôi xin lỗi đối với tài khoản của bạn đã bị khóa vĩnh viễn vì sai điều khoản !</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
