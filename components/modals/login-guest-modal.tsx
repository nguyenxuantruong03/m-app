"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TriangleAlert } from "lucide-react";
import {
  translateCancel,
  translateContinue,
  translateGuestAccountMessage,
  translateNote,
  translateQuickLoginMessage,
  translateTerms,
} from "@/translate/translate-client";

interface LoginGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  languageToUse: string;
}

export const LoginGuestModal: React.FC<LoginGuestModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  languageToUse,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [agree, setAgree] = useState(false);
  //languages
  const termMessage = translateTerms(languageToUse);
  const quickLoginMessage = translateQuickLoginMessage(languageToUse);
  const guestAccountMessage = translateGuestAccountMessage(languageToUse);
  const noteMessage = translateNote(languageToUse);
  const cancelMessage = translateCancel(languageToUse);
  const continuteMessage = translateContinue(languageToUse);

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
      title={termMessage}
      description={quickLoginMessage}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <p>{guestAccountMessage.name}</p>
        <p>{guestAccountMessage.name2}</p>
        <p>
          <span className="text-yellow-500 flex items-center font-bold mt-2">
            <TriangleAlert className="h-5 w-5 mr-1" /> {noteMessage}:
          </span>{" "}
          {guestAccountMessage.name3}
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
            <span className="font-bold">{guestAccountMessage.name4}</span>
          </label>
        </div>

        <div className="flex items-center space-x-3 justify-end">
          <Button variant="secondary" disabled={loading} onClick={handleClose}>
            {cancelMessage}
          </Button>
          <Button onClick={handleConfirm} disabled={loading || !agree}>
            {continuteMessage}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
