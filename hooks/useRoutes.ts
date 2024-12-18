import {useMemo} from"react";
import { usePathname} from "next/navigation"

import useConversation from "./useConversation"
import { ArrowLeft, MessageCircleMore, Trash2, Users } from "lucide-react";


const useRoutes=() =>{
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const routes = useMemo(()=>[
        {
            label: 'Chat',
            href: '/conversations',
            icon: MessageCircleMore ,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href:'/list-users',
            icon: Users,
            active: pathname ==='/list-users'
        },
        {
            label:'Xóa',
            icon: Trash2
        },
        {
            label:'Back',
            href:'/',
            icon: ArrowLeft 
        },
    ],[pathname , conversationId])

    return routes
}
export default useRoutes;