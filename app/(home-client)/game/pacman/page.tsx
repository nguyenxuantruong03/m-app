"use client"
import Header from "./components/Header";
// import Scene from "./components/Scene";
import { GameProvider } from "./context/GameContext";
import dynamic from 'next/dynamic'
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SceneNossr = dynamic(() => import("./components/Scene"), {
  ssr: false,
});
const Pacman = () => {
  const user = useCurrentUser()
  const router = useRouter();
  useEffect(() => {
    if(user?.role === "GUEST" || !user?.id){
      router.push("/home-product")
    }
  }, [router,user?.id,user?.role]);
    return ( 
        <div className="pacman-app mt-24">
      <GameProvider>
        <Header />
        <SceneNossr foodSize={60} border={20} topScoreBoard={100} />
      </GameProvider>
    </div>
     );
}
 
export default Pacman;