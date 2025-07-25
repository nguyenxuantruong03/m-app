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
  const locale = user?.language || "vi";

  useEffect(() => {
    if (!user) {
      router.replace(`/${locale}/auth/login`);
    }

    // Mở modal nếu nó chưa được mở
    if (isOpen) {
      onOpen();
    }
  }, [user, isOpen, onOpen, router]);


  return null;
}
