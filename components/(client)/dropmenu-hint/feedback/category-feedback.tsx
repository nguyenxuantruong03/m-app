import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations()

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
    { index: 1, label: t("feedback.categoryfeedback.unprofessionalService") },
    { index: 2, label: t("feedback.categoryfeedback.delayedResponse") },
    { index: 3, label: t("feedback.categoryfeedback.noResponseToCall") },
    { index: 4, label: t("feedback.categoryfeedback.complicatedPayment") },
    { index: 5, label: t("feedback.categoryfeedback.websitePerformanceIssues") },
    { index: 6, label: t("feedback.categoryfeedback.other") },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {TypeCategory.map((item) => (
          <Button
            key={item.index}
            variant="outline"
            onClick={() => handleClick(item.index)}
            className={`${
              indexCategory === item.index
                ? "text-slate-900 bg-green-400 hover:bg-green-500 hover:text-slate-900"
                : "text-slate-900 bg-slate-300 dark:bg-slate-200 dark:text-slate-900"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {errorCategory && (
        <p className="text-red-500 text-xs">{t("feedback.categoryfeedback.selectCategoryFeedback")}</p>
      )}
    </div>
  );
};

export default CategoryFeedBack;
