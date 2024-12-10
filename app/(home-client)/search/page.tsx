"use client"
import { redirect } from "next/navigation";
import { Results } from "./_components/results";
import { Suspense, useEffect } from "react";
import { ResultSkeleton } from "@/app/(profile-user-other)/(livestream-explore)/listlive/_components/results";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getSearchMessage } from "@/translate/translate-client";

interface SearchPageProps{
    searchParams:{
        term?: string
    }
}
const SearchPage = ({searchParams}:SearchPageProps) => {
    const user = useCurrentUser()
    const searchMessage = getSearchMessage(user?.language || "en");

    useEffect(() => {
        document.title = searchMessage.search;
      }, []);

    if(!searchParams.term){
        redirect("/")
    }

    return ( 
        <div className="h-full p-8 max-w-screen-2xl mx-auto mt-20">
            <Suspense fallback={<ResultSkeleton />}>
            <Results term={searchParams.term}/>
            </Suspense>
        </div>     
        );
}
 
export default SearchPage;