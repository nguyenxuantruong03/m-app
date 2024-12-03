"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  translateNewest,
  translateOldest,
  translateSortPost,
  translateTrending,
} from "@/translate/translate-client";

const SortItem = ({
  setSortCriteria,
  languageToUse,
}: {
  setSortCriteria: (criteria: string) => void;
  languageToUse: string;
}) => {
  const sortPostMessage = translateSortPost(languageToUse);
  const newestMessage = translateNewest(languageToUse);
  const oldestMessage = translateOldest(languageToUse);
  const trendingMessage = translateTrending(languageToUse);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="fixed right-10 bottom-12 xl:top-24">
          <AlignRight className="w-10 h-10 p-2 bg-gray-300 bg-opacity-30 hover:bg-gray-300 cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="space-y-4" side="right">
          <SheetHeader>
            <SheetTitle>{sortPostMessage}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => setSortCriteria("newest")}
            >
              {newestMessage}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSortCriteria("oldest")}
            >
              {oldestMessage}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSortCriteria("trending")}
            >
              {trendingMessage}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SortItem;
