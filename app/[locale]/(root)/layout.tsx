"use client";

import LoadingPageComponent from "@/components/ui/loading";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { usechoosestoreModal } from "@/hooks/usechoosestoreModal";
import { Store, UserRole } from "@prisma/client";
import useSWR from "swr";
import axios from "axios";
import ErrorComponent from "@/components/ui/error";

const fetchStores = async (): Promise<Store[]> => {
  const response = await axios.get("/api/stores");
  return response.data;
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: stores, error, isLoading } = useSWR("/api/stores", fetchStores);
  const user = useCurrentUser(); // Hook lấy thông tin người dùng
  const router = useRouter(); // Router để điều hướng
  const onOpen = usechoosestoreModal((state) => state.onOpen);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const locale = user?.language || "vi";

  useEffect(() => {
    if (!user && isClient) {
      router.replace(`/${locale}/auth/login`);
    }
  }, [user, locale, isClient, router]);

  // Redirect nếu user là GUEST hoặc USER
  useEffect(() => {
    if (user && (user.role === UserRole.USER || user.role === UserRole.GUEST)) {
      router.replace(`/${locale}/home-product`);
    }
  }, [user, locale, router]);

  // Xử lý khi stores đã được fetch xong
  useEffect(() => {
    if (stores && stores.length > 0) {
      const storeIdFromUrl = pathname.split("/")[2]; // Ex: /vi/storeId/...

      if (!storeIdFromUrl) {
        router.replace(`/${locale}/${stores[0].id}`);
        return;
      }

      const storeExists = stores.some(
        (store: Store) => store.id === storeIdFromUrl
      );
      if (!storeExists) {
        router.replace(`/${locale}/${stores[0].id}`);
      }
    }
  }, [stores, pathname, locale, router]);

  useEffect(() => {
    // Mở modal nếu nó chưa được mở
    if (!isLoading && !stores) {
      onOpen();
    }
  }, [user, onOpen, router]);

  if (isLoading) {
    return <LoadingPageComponent />;
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div>
        <ErrorComponent
          reset={() => {
            window.location.reload();
          }}
        />
      </div>
    );
  }

  // Loading UI
  if (!user) {
    return <LoadingPageComponent />;
  }

  return <>{children}</>;
}
