"use client";

import { usechoosestoreModal } from "@/app/hooks/usechoosestoreModal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

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

type PopoverTrigger = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTrigger {
  /* `items: Record <string , any>[]` đang định nghĩa một chỗ dựa có tên `items` cho thành phần `StoreSwitcher. */
  items: Record<string, any>[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const chooseModal = usechoosestoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Vui lòng chọn một cửa hàng"
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
            <CommandInput placeholder="Tìm kiếm cửa hàng" />
            <CommandEmpty>Không tìm thấy cửa hàng</CommandEmpty>
            <CommandGroup heading="Stores">
                {fomattedItems.map((store)=>(
                    <CommandItem 
                    key={store.value}
                    onSelect={() =>onStoreSelect(store)}
                    className="text-sm"
                    >
                        <Store className="mr-2 h-4 w-4"/>
                        {store.label}
                        <Check 
                        className={cn("ml-auto h-4 w-4",currentStore?.value === store.value 
                        ? "opacity-100"
                        : "opacity-0"
                        )}
                        />
                    </CommandItem>
                ))}
                
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                        onSelect={() =>{
                            setOpen(false) 
                            chooseModal.onOpen()
                        }}
                        >
                            <PlusCircle  className="mr-2 h-5 w-5"/>
                            Tạo cửa hàng
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
