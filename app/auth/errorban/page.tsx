import CardWrapper from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";

const ErrorCardBan = async () => {
  return (
    <CardWrapper
      headerLabel="Khóa tài khoản do sai phạm điều khoản!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="bg-red-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-semibold">
        <AlertTriangle className="text-destructive w-24" />
        <p>Tài khoản của bạn đã bị ban hãy kiểm tra email để xem thời gian có thể đăng nhập lại. Thông cảm cho chúng tôi nếu có thắc mắc liên hệ 0352261103.</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCardBan;
