"use client";

import { formatter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number;
  valueold?: string | number;
  textSize?: string;
}

const Currency: React.FC<CurrencyProps> = ({ value, valueold, textSize }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Convert values to numbers
  const numericValue = Number(value);
  const numericValueOld = Number(valueold);

  // Check if `numericValueOld` is a valid number and not NaN
  const shouldDisplayOldValue =
    !isNaN(numericValueOld) &&
    numericValueOld !== 0 &&
    numericValue !== numericValueOld;

  return (
    <div className="flex space-x-4">
      <div
        className={`font-bold text-red-500 text-xs ${
          textSize ? `${textSize}` : " md:text-base"
        }`}
      >
        {formatter.format(numericValue)}
      </div>

      {shouldDisplayOldValue && (
        <div
          className={`font-bold text-gray-500 line-through text-xs ${
            textSize ? `${textSize}` : " md:text-base"
          }`}
        >
          {formatter.format(numericValueOld)}
        </div>
      )}
    </div>
  );
};

export default Currency;
