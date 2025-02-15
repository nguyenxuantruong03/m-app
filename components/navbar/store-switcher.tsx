"use client";

import { usechoosestoreModal } from "@/hooks/usechoosestoreModal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useTranslations } from "next-intl";

type PopoverTrigger = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface Item {
  id: string;
  name: string;
}
interface StoreSwitcherProps extends PopoverTrigger {
  items: Item[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const t = useTranslations()
  const chooseModal = usechoosestoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    router.refresh();
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 3000);
  };

  const fomattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = fomattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <div className="flex space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label={t("navbardashboard.storeSwitcher.selectStore")}
            className={cn("w-[200px] justify-between", className)}
          >
            <Store className="mr-2 h-4 w-4" />
            {currentStore?.label}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder={t("navbardashboard.storeSwitcher.searchStore")} />
              <CommandEmpty>{t("navbardashboard.storeSwitcher.storeNotFound")}</CommandEmpty>
              <CommandGroup heading="Stores">
                {fomattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                  >
                    <Store className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}

                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        chooseModal.onOpen();
                      }}
                    >
                      <PlusCircle className="mr-2 h-5 w-5" />
                      {t("navbardashboard.storeSwitcher.createStore")}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div>
        <Button variant="outline" size="icon" onClick={handleClick}>
          <RotateCw className={`w-5 h-5 ${isRotating ? "rotation" : ""}`} />
        </Button>
      </div>
    </div>
  );
}
