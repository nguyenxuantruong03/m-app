"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { offensiveWords } from "@/vn_offensive_words";
import Modal from "@/components/ui/modal";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface PolicyViolationProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  setResponseDescriptions?: Dispatch<SetStateAction<string>>;
  setComment?: Dispatch<SetStateAction<string>>;
  setUserInputAI?: Dispatch<SetStateAction<string>>;
}

export const PolicyViolationModal: React.FC<PolicyViolationProps> = ({
  isOpen,
  onClose,
  value,
  setComment,
  setResponseDescriptions,
  setUserInputAI,
}) => {
  const t = useTranslations("violation")
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleClose = () => {
    setUserInputAI?.("");
    setResponseDescriptions?.(""); // Đặt giá trị về chuỗi rỗng khi đóng modal
    setComment?.("");
    onClose(); // Gọi onClose từ prop
  };

  const renderText = (text: string) => {
    return text
      .split(" ")
      .map((word, index) => {
        const isOffensive = offensiveWords.includes(word);
        return (
          <span
            key={index}
            className={isOffensive ? "font-bold text-red-500" : ""}
          >
            {word}
          </span>
        );
      })
      .reduce((acc: React.ReactNode[], curr, idx) => {
        // Adding space between words
        if (idx > 0) acc.push(" ");
        acc.push(curr);
        return acc;
      }, []);
  };

  return (
    <Modal
      customClass="z-[99999999]"
      title={t("violationMessage")}
      description={t("offensiveMessage")}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="mt-4 break-word">
        <p>{renderText(value)}</p>
      </div>
      <span className="break-word text-xs text-amber-500">
        {t("violationPart1")}{" "}
        <Link href="/policy" className="underline">
          {t("violationPart2")}
        </Link>{" "}
        {t("violationPart3")}.
      </span>
    </Modal>
  );
};
