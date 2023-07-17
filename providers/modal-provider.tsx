"use client"

import {ChoosestoreModal} from "@/components/modals/choosestore-modal";
import { AlertModal } from "@/components/modals/alert-modal";

import { useEffect, useState } from "react";

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    return ( 
        <>   
            <ChoosestoreModal />
            {/* <AlertModal /> */}
        </>
     );
}
 
