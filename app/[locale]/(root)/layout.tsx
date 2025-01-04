"use client";

import ErrorComponent from "@/components/ui/error";
import LoadingPageComponent from "@/components/ui/loading";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usechoosestoreModal } from "@/hooks/usechoosestoreModal";
import { Store, UserRole } from "@prisma/client";
import axios from "axios";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetchStores = async (): Promise<Store[]> => {
  const response = await axios.get("/api/stores");
  return response.data;
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: stores, error } = useSWR("/api/stores", fetchStores);
  const user = useCurrentUser();
  const storeModal = usechoosestoreModal();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only enable client-side behavior after the component has mounted
  }, []);

  const locale = user?.language;

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  if (user.role === UserRole.USER || user.role === UserRole.GUEST) {
    redirect(`/${locale}/home-product`);
  }

  if (error) {
    return (
      <div>
        <ErrorComponent
          reset={() => {
            if (isClient) {
              window.location.reload(); // Reload the window, only on the client side
            }
          }}
        />
      </div>
    );
  }

  if (!stores) {
    return (
      <div>
        <LoadingPageComponent />
      </div>
    );
  }

  // Lấy đường dẫn hiện tại và tách storeId từ URL
  const storeIdFromUrl = pathname.split("/")[2]; // Adjusted for locale part in the path

  // Nếu không có storeId trong URL, redirect tới store đầu tiên
  if (!storeIdFromUrl && stores.length > 0) {
    storeModal.isOpen;
    redirect(`/${locale}/${stores[0].id}`);
  }

  // Kiểm tra nếu storeId trong URL không tồn tại trong danh sách cửa hàng
  const storeExists = stores.some(
    (store: Store) => store.id === storeIdFromUrl
  );
  if (!storeExists && stores.length > 0) {
    redirect(`/${locale}/${stores[0].id}`);
  }

  const matchedStore = stores.find(
    (store: Store) => store.id === storeIdFromUrl
  );
  if (matchedStore) {
    redirect(`/${locale}/${matchedStore.id}`);
  }

  return <>{children}</>;
}
