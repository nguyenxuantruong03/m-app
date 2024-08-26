"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TriangleAlert } from "lucide-react";

interface LoginGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  isCaptchaVerified?: boolean;
}

export const LoginGuestModal: React.FC<LoginGuestModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  isCaptchaVerified,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleRadioChange = () => {
    setAgree(!agree);
  };

  const handleClose = () => {
    setAgree(false);
    onClose();
  };

  const handleConfirm = () => {
    if (!isCaptchaVerified) {
      onClose();
    } else {
      onConfirm();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={"Điều khoản!"}
      description={
        "Đăng nhập bằng tài khoản nhanh sẽ giúp bạn trải nghiệm tốt hơn."
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <p>
          - Chào mừng bạn đến với ứng dụng của chúng tôi! Với tài khoản khách,
          bạn có thể khám phá các tính năng cơ bản mà không cần đăng nhập. Tuy
          nhiên, để trải nghiệm đầy đủ các chức năng và nhận các ưu đãi đặc
          biệt, chúng tôi khuyến khích bạn tạo một tài khoản cá nhân. Cảm ơn bạn
          đã chọn chúng tôi!
        </p>
        <p>
          - Khi bạn đăng nhập với vai trò khách thông tin của bạn sẽ được bảo
          mật tuyệt đối khi mua sản phẩm trên ứng dụng của chúng tôi. Chúng tôi
          không lưu thông tin của bạn và không chịu trách nhiệm.
        </p>
        <p>
          <span className="text-yellow-500 flex items-center font-bold mt-2">
            <TriangleAlert className="h-5 w-5 mr-1" /> Lưu ý:
          </span>{" "}
          - Bên cạnh đó quy định của tài khoản khách tất cả dữ liệu người dùng
          sẽ lưu dưới dạng local và nó sẽ không lưu vào database của chúng tôi.
          Việc bạn lạc mất những dữ liệu quan trọng trong quá trình sử dụng
          chúng tôi sẽ không giải quyết khi bạn đăng nhập với vai trò khách.
        </p>

        <div className="flex items-center space-x-1 space-y-1 mt-4">
          <label className="flex items-center space-x-1 cursor-pointer">
            <Input
              type="radio"
              checked={agree}
              onChange={handleRadioChange}
              disabled={loading}
              className="w-4 h-4 mr-1"
            />
            <span className="font-bold">Tôi đồng ý với điều khoản trên.</span>
          </label>
        </div>

        <div className="flex items-center space-x-3 justify-end">
          <Button variant="secondary" disabled={loading} onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirm} disabled={loading || !agree}>
            Tiếp tục
          </Button>
        </div>
      </div>
    </Modal>
  );
};
