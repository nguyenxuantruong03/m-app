import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface CategoryFeedBackProps {
  setIndexCategory: Dispatch<SetStateAction<number | null>>;
  indexCategory: number | null;
  setErrorCategory: Dispatch<SetStateAction<boolean>>;
  errorCategory: boolean;
}

const CategoryFeedBack = ({
  setIndexCategory,
  indexCategory,
  setErrorCategory,
  errorCategory,
}: CategoryFeedBackProps) => {
  const handleClick = (categoryIndex: number) => {
    if (indexCategory === categoryIndex) {
      // If the same emotion is clicked, deselect it (set indexEmotion to null)
      setIndexCategory(null);
      setErrorCategory(true); // Trigger the error when deselecting
    } else {
      // Otherwise, select the new emotion and clear the error
      setIndexCategory(categoryIndex);
      setErrorCategory(false); // Reset error state when a valid emotion is selected
    }
  };

  const TypeCategory = [
    { index: 1, label: "Unprofessional service" },
    { index: 2, label: "Delayed response from staff" },
    { index: 3, label: "Complicated payment" },
    { index: 4, label: "No response to the call" },
    { index: 5, label: "Website performance issues" },
    { index: 6, label: "Other" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap space-x-1 space-y-2">
        {TypeCategory.map((item) => (
          <Button
            key={item.index}
            variant="outline"
            onClick={() => handleClick(item.index)}
            className={`${
              indexCategory === item.index
                ? "bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-slate-300 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300 hover:dark:text-slate-800"
                : ""
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {errorCategory && (
        <p className="text-red-500 text-xs">Please select an category</p>
      )}
    </div>
  );
};

export default CategoryFeedBack;
