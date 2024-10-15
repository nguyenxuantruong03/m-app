import { redirect } from "next/navigation";
import { Results } from "./_components/results";
import { Suspense } from "react";
import { ResultSkeleton } from "@/app/(profile-user-other)/(livestream-explore)/listlive/_components/results";

interface SearchPageProps{
    searchParams:{
        term?: string
    }
}
const SearchPage = ({searchParams}:SearchPageProps) => {

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