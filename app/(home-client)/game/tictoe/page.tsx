"use client"
import Container from "@/components/ui/container";
import { TicTacToe } from "./tic-tac-toe";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const revalidate =86400

const TicToe = () => {
  const user = useCurrentUser()
  const router = useRouter();
  useEffect(() => {
    if(user?.role === "GUEST" || !user?.id){
      router.push("/home-product")
    }
  }, [router,user?.id,user?.role]);

    return ( 
        <main className="mt-32">
            <Container>
            <TicTacToe />
            </Container> 
        </main>
    );
}
 
export default TicToe;