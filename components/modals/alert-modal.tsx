"use client"

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { translateAlertModal } from "@/translate/translate-dashboard";

interface AlertModalProps {
    isOpen: boolean;
    language?: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    message?: string;
    title?: string
    languageToUse?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading,message,title,language,languageToUse }) => {
    const [isMounted, setIsMounted] = useState(false);

    //language
    const alertModalMessage = translateAlertModal(languageToUse || "vi")

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title={title || alertModalMessage.areYouSure}
            descriptionLanguage={language}
            description={message || alertModalMessage.deletePermanently}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    {alertModalMessage.cancel}
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    {loading ? alertModalMessage.continueWithEllipsis : alertModalMessage.continue}
                </Button>
            </div>
        </Modal>
    );
};
