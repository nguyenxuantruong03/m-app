"use client"
import React, { useState, useRef,useEffect } from "react";

interface MultiInputFieldProps {
  length: number;
  onChange: (newValue: string) => void;
  isError: boolean; 
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({ length, onChange,isError  }) => {
  const [inputValues, setInputValues] = useState(Array.from({ length }, () => ""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length }, () => null));
  useEffect(() => {
    // Nếu có lỗi xảy ra, set lại tất cả các giá trị thành chuỗi trống
    if (isError) {
      setInputValues(Array.from({ length }, () => ""));
      onChange("");
    }
  }, [isError, length]);
  const handleChange = (index: number, newValue: string) => {
    // Filter out non-numeric characters
    const numericValue = newValue.replace(/[^0-9]/g, "");
    const newInputValues = [...inputValues];
    newInputValues[index] = numericValue;
    setInputValues(newInputValues);
    onChange(newInputValues.join("")); // Call onChange to update the new value

    // Focus on the next input if available
    if (index < length - 1 && numericValue !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && inputValues[index] === "") {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteValues = pasteData.slice(0, length).split("");
    const newInputValues = [...inputValues];

    pasteValues.forEach((value, index) => {
      newInputValues[index] = value.replace(/[^0-9]/g, "");
    });

    setInputValues(newInputValues);
    onChange(newInputValues.join(""));
  };

  return (
    <div className="flex items-center justify-between">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          value={inputValues[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste} // Handle paste event
          className="w-10 h-10 border-gray-300 text-center rounded-md border-2"
          maxLength={1} // Allow only 1 character input
        />
      ))}
    </div>
  );
};

export default MultiInputField;