"use client";
import { useEffect } from "react";
import { usechoosestoreModal } from "../../hooks/usechoosestoreModal";

export default function SetupPage() {
  const onOpen = usechoosestoreModal((state) => state.onOpen);
  const isOpen = usechoosestoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return(
    <div>
      root page
    </div>
  )
}
