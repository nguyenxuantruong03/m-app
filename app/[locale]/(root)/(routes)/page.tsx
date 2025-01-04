"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usechoosestoreModal } from "@/hooks/usechoosestoreModal";

export default function SetupPage() {
  const user = useCurrentUser(); // Hook lấy thông tin người dùng
  const router = useRouter(); // Router để điều hướng
  const onOpen = usechoosestoreModal((state) => state.onOpen);
  const isOpen = usechoosestoreModal((state) => state.isOpen);

  useEffect(() => {
    // Kiểm tra nếu không có user, điều hướng đến trang login
    if (!user) {
      router.push("/auth/login");
      return; // Ngăn mã phía dưới chạy khi không có user
    }

    // Mở modal nếu nó chưa được mở
    if (!isOpen) {
      onOpen();
    }
  }, [user, isOpen, onOpen, router]);

  return null;
}
