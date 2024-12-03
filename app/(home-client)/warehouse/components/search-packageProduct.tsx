import { SeatchPackageProduct } from "@/components/(client)/modal/search-package-product-moda";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { translateEnterOrderId } from "@/translate/translate-client";
import { Order } from "@/types/type";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchPackageProductProps {
  order: Order[];
  languageToUse: string;
}

const SearchPackageProduct: React.FC<SearchPackageProductProps> = ({
  order,
  languageToUse,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(""); // Explicitly type inputValue as a string

  const enterOrderIdMessage = translateEnterOrderId(languageToUse);

  // Handle input change with explicit typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle button click
  const handleButtonClick = () => {
    if (inputValue.trim()) {
      setOpen(true); // Example: Open the modal
    }
  };

  // Handle Enter key press for search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      handleButtonClick(); // Trigger search logic on Enter
    }
  };

  return (
    <>
      <SeatchPackageProduct
        order={order}
        isOpen={open}
        inputValue={inputValue}
        languageToUse={languageToUse}
        onClose={() => setOpen(false)}
      />
      <div className="flex items-center">
        <div className="w-full">
          <Input
            type="text"
            placeholder={enterOrderIdMessage}
            className="text-white"
            value={inputValue}
            onChange={handleInputChange} // Correctly typed onChange handler
            onKeyDown={handleKeyDown} // Handle Enter key press
          />
        </div>
        <div>
          <Button className="py-5" onClick={handleButtonClick}>
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchPackageProduct;
