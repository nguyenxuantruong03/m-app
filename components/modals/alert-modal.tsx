"use client"

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    message?: string;
    title?: string
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading,message,title }) => {
    const [isMounted, setIsMounted] = useState(false);
    
    //language
    const t =useTranslations()

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title={title || t("action.areYouSure")}
            description={message || t("action.actionIrreversible")}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    {t("action.cancel")}
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    {loading ? t("action.continueWithEllipsis") : t("action.continue")}
                </Button>
            </div>
        </Modal>
    );
};
