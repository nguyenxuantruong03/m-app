import { Results } from "./_components/results";
import { currentUser } from "@/lib/auth";
import { getListLiveMessage } from "@/translate/translate-client";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto px-2">
        <Results />
    </div>
  );
}

export async function generateMetadata() {
  const user =  await currentUser()
  const listLiveMessage = getListLiveMessage(user?.language || "en")
  return {
    title: listLiveMessage.listLive,
  };
}