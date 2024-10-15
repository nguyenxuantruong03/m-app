"use client";
import qs from "query-string";
import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchItem from "./_components/search-item";

export const SearchPage = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    //localhost:3000?term=value
    router.push(url);
  };

  const onClear = () => {
    setValue("");
    setIsOpen(false);
  };

  const onOpenModal = () => {
    if (value) {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true); // Open the modal when Input is focused
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-[11rem] md:max-w-[13rem] lg:max-w-7xl flex items-center z-[9999]"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="Search Product..."
          className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-white"
        />
        {value && (
          <X
            className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
            onClick={onClear}
          />
        )}
        <Button
          type="submit"
          size="default"
          variant="secondary"
          className="rounded-l-none"
        >
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>

      {isOpen && (
        <div>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[9998]"
            onClick={closeModal} // Click outside to close the modal
          />
          <div
            className="fixed top-24 md:top-[6.5rem] lg:top-24 left-0 right-0 md:left-auto md:right-auto bg-white rounded-md shadow-md max-w-[23rem] md:max-w-md w-full z-[9999] mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <SearchItem value={value} />
          </div>
        </div>
      )}
    </>
  );
};
