import { Results, ResultSkeleton } from "@/app/(profile-user-other)/(livestream-explore)/listlive/_components/results";
import { currentUser } from "@/lib/auth";
import { getListLiveMessage } from "@/translate/translate-client";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}

export async function generateMetadata() {
  const curentUsers = await currentUser()
  const listLiveMessage = getListLiveMessage(curentUsers?.language || "en")
  return {
    title: listLiveMessage.listLive
  };
}