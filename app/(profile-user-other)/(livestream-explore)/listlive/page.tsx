import { Suspense } from "react";
import { Results, ResultSkeleton } from "./_components/results";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto px-2">
      <Suspense fallback={<ResultSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
