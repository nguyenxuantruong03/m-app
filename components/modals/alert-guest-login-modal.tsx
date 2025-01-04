"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import LogoutButton from "../auth/logout-button";
import { useTranslations } from "next-intl";

interface AlertGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertGuestModal: React.FC<AlertGuestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={t("auth.guestAccountRule")}
      description={t("auth.cannotEditAsGuest")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <p>
          <p>- {t("auth.limitedFunctionalityAsGuest")}</p>
          <p>- {t("auth.cannotEditOrComment")}</p>
        </p>
        <div className="flex items-center space-x-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {t("auth.cancel")}
          </Button>

          <LogoutButton>
            <Button>{t("auth.login")}</Button>
          </LogoutButton>
        </div>
      </div>
    </Modal>
  );
};
