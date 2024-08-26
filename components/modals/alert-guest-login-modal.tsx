"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import LogoutButton from "../auth/logout-button";

interface AlertGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertGuestModal: React.FC<AlertGuestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={"Quy định tài khoản khách !"}
      description={
        "Bạn không được phép chỉnh sửa khi đăng nhập bằng tài khoản khách."
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <p>
          <p>- Với tư cách là người dùng khách, chức năng bị hạn chế.</p>
          <p>
            - Bạn không thể chỉnh sửa hoặc đăng bình luận. Vui lòng đăng nhập
            bằng tài khoản đã đăng ký để có quyền truy cập đầy đủ vào các tính
            năng này.
          </p>
        </p>
        <div className="flex items-center space-x-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Hủy bỏ
          </Button>

          <LogoutButton>
            <Button>Đăng nhập</Button>
          </LogoutButton>
        </div>
      </div>
    </Modal>
  );
};
