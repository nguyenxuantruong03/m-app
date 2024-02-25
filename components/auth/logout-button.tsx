"use client"

import { logout } from "@/actions/actions-signin-sign-up/logout"


interface LogoutButtonProp{
    children?: React.ReactNode
}

const LogoutButton = ({children}:LogoutButtonProp) => {
    const onClick = () =>{
        logout()
    }
    return ( 
        <span onClick={onClick} >
            {children}
        </span>
     );
}
 
export default LogoutButton;