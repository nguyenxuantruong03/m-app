"use client"

import { DialogHeader,Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface ModalProps{
    title?: string;
    description?: string;
    descriptionLanguage?: React.ReactNode
    isOpen: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    maxWidth?: string;
    textCenter?: boolean;
    top?:boolean
    customClass?:string
    showCloseButton?: boolean
    customWidth?: string;
    classNameCustom?:string;
    isPadding?: boolean
}
const Modal:React.FC<ModalProps> = ({title,description,isOpen,onClose,children,maxWidth,textCenter,top,customClass,showCloseButton,customWidth,classNameCustom,descriptionLanguage,isPadding}) => {

    const onChange =(open:boolean) =>{
        if(!open && onClose){
            onClose();
        }
    }

    return (  
        <Dialog open={isOpen} onOpenChange={onChange} >
            <DialogContent isPadding={isPadding} customWidth={customWidth} showCloseButton={showCloseButton} className={`${classNameCustom} max-w-${maxWidth || "xl"} ${customClass}  ${top ? 'dialog-content-camera' : ''}`} >
                <DialogHeader>
                    <DialogTitle className={textCenter ? "text-center" : ""}>{title}</DialogTitle>
                    { descriptionLanguage ? <DialogDescription className={textCenter ? "text-center" : ""}>{descriptionLanguage}</DialogDescription> 
                    :  <DialogDescription className={textCenter ? "text-center" : ""}>{description}</DialogDescription>
                    }
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
 
export default Modal;