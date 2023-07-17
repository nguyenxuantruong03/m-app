"use client"

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps{
    isOpen: boolean;
    onClose: () =>void
    onConfirm: () => void
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({isOpen,onClose,onConfirm,loading})=>{
    const [isMounted , setIsdMounted] = useState(false)

    useEffect(() =>{
        setIsdMounted(true);
    },[])

    if(!isMounted){
        return null
    }

    return(
        <Modal
        title="Bạn có chắc chắn ?"
        description = "Đây là một hành động có thể chưa xong !"
        isOpen = {isOpen}
        onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    )
} 