"use client";

import { ChoosestoreModal } from "@/components/modals/choosestore-modal";

import { useEffect, useState } from "react";
import InternetConnectionStatus from "./internet-status";

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
