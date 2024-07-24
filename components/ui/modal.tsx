"use client"

import { DialogHeader,Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface ModalProps{
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    maxWidth?: string;
    textCenter?: boolean;
    top?:boolean
    customClass?:string
}
const Modal:React.FC<ModalProps> = ({title,description,isOpen,onClose,children,maxWidth,textCenter,top,customClass}) => {

    const onChange =(open:boolean) =>{
        if(!open){
            onClose();
        }
    }

    return (  
        <Dialog open={isOpen} onOpenChange={onChange}>
              <DialogContent className={`max-w-${maxWidth || "xl"}  ${top ? 'dialog-content-camera' : ''} ${customClass}`}>
                <DialogHeader>
                    <DialogTitle className={textCenter ? "text-center" : ""}>{title}</DialogTitle>
                    <DialogDescription className={textCenter ? "text-center" : ""}>{description}</DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
 
export default Modal;