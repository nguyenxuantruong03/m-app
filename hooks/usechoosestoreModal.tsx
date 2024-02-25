import {create} from "zustand"

interface usechoosestoreModalInterface{
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
}

export const usechoosestoreModal= create<usechoosestoreModalInterface>((set)=>({
    isOpen: false,
    onClose:() => set({isOpen: false}),
    onOpen: () => set({isOpen: true})
}))