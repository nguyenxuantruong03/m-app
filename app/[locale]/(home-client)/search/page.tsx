"use client"
import { redirect } from "next/navigation";
import { Results } from "./_components/results";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface SearchPageProps{
    searchParams:{
        term?: string
    }
}
const SearchPage = ({searchParams}:SearchPageProps) => {
    const t = useTranslations()

    useEffect(() => {
        document.title = t("search.search");
      }, []);

    if(!searchParams.term){
        redirect("/")
    }

    return ( 
        <div className="h-full p-8 max-w-screen-2xl mx-auto mt-20">
            <Results term={searchParams.term}/>
        </div>     
        );
}
 
export default SearchPage;