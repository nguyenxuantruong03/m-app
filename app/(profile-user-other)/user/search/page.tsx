import { redirect } from "next/navigation";
import { Results } from "./_components/results";
import { Suspense } from "react";
import { ResultSkeleton } from "../../(livestream-explore)/listlive/_components/results";

interface SearchPageProps{
    searchParams:{
        term?: string
    }
}
const SearchPage = ({searchParams}:SearchPageProps) => {

    if(!searchParams.term){
        redirect("/listlive")
    }
    
    return ( 
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultSkeleton />}>
            <Results term={searchParams.term}/>
            </Suspense>
        </div>     
        );
}
 
export default SearchPage;

export async function generateMetadata({searchParams}:SearchPageProps) {
    return {
      title: searchParams.term,
    };
  }