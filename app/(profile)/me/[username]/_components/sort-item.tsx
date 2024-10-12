"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const SortItem = ({ setSortCriteria }: { setSortCriteria: (criteria: string) => void }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
        <div className="flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 text-gray-300 text-lg rounded-md p-1 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl cursor-pointer">
              <SlidersHorizontal className="h-7 w-7 mr-1"/> Bộ lọc
              </div>
        </SheetTrigger>
        <SheetContent className="space-y-4" side="right">
          <SheetHeader>
            <SheetTitle>Sắp xếp bài đăng</SheetTitle>
          </SheetHeader>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setSortCriteria('newest')}>Mới nhất</Button>
            <Button variant="secondary" onClick={() => setSortCriteria('oldest')}>Cũ nhất</Button>
            <Button variant="secondary" onClick={() => setSortCriteria('trending')}>Xu hướng</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SortItem;