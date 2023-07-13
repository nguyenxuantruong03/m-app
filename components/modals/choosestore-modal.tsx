"use client"

import { usechoosestoreModal } from "@/app/hooks/usechoosestoreModal";
import Modal from "../ui/modal";

export const ChoosestoreModal = () => {
    const storeModal = usechoosestoreModal()
    return ( 
            <Modal 
            title="Tạo cửa hàng"
            description="Hãy tạo quản lý cửa hàng hoặc sản phẩm"
            isOpen= {storeModal.isOpen}
            onClose={storeModal.onClose}
            >
                Tạo cửa hàng mới
            </Modal>
     );
}