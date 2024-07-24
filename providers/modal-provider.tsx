"use client";

import { ChoosestoreModal } from "@/components/modals/choosestore-modal";
import InternetConnectionStatus from "./internet-status";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ChoosestoreModal />
      <InternetConnectionStatus />
    </>
  );
};
