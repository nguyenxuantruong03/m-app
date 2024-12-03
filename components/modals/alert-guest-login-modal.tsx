"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import LogoutButton from "../auth/logout-button";
import { translateGuestAccountModal } from "@/translate/translate-dashboard";

interface AlertGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageToUse: string;
}

export const AlertGuestModal: React.FC<AlertGuestModalProps> = ({
  isOpen,
  onClose,
  languageToUse,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  //language
  const guestAccountModalMessage = translateGuestAccountModal(languageToUse);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={guestAccountModalMessage.guestAccountRule}
      description={guestAccountModalMessage.cannotEditAsGuest}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <p>
          <p>- {guestAccountModalMessage.limitedFunctionalityAsGuest}</p>
          <p>- {guestAccountModalMessage.cannotEditOrComment}</p>
        </p>
        <div className="flex items-center space-x-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {guestAccountModalMessage.cancel}
          </Button>

          <LogoutButton>
            <Button>{guestAccountModalMessage.login}</Button>
          </LogoutButton>
        </div>
      </div>
    </Modal>
  );
};
