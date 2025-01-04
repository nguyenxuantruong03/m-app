"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

interface LoginGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const LoginGuestModal: React.FC<LoginGuestModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const t = useTranslations()
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
      onConfirm();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={t("auth.term")}
      description={t("auth.quickLogin")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <p>{t("auth.guestAccount.name")}</p>
        <p>{t("auth.guestAccount.name2")}</p>
        <p>
          <span className="text-yellow-500 flex items-center font-bold mt-2">
            <TriangleAlert className="h-5 w-5 mr-1" /> {t("auth.note")}:
          </span>{" "}
          {t("auth.guestAccount.name3")}
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
            <span className="font-bold">{t("auth.guestAccount.name4")}</span>
          </label>
        </div>

        <div className="flex items-center space-x-3 justify-end">
          <Button variant="secondary" disabled={loading} onClick={handleClose}>
            {t("action.cancel")}
          </Button>
          <Button onClick={handleConfirm} disabled={loading || !agree}>
            {t("action.continue")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
