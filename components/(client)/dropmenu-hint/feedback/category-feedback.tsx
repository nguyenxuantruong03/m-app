import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  translateComplicatedPayment,
  translateDelayedResponse,
  translateNoResponseToCall,
  translateOtherMessage,
  translateSelectCategoryFeedback,
  translateUnprofessionalService,
  translateWebsitePerformanceIssues,
} from "@/translate/translate-client";

interface CategoryFeedBackProps {
  setIndexCategory: Dispatch<SetStateAction<number | null>>;
  indexCategory: number | null;
  setErrorCategory: Dispatch<SetStateAction<boolean>>;
  errorCategory: boolean;
  languageToUse: string;
}

const CategoryFeedBack = ({
  setIndexCategory,
  indexCategory,
  setErrorCategory,
  errorCategory,
  languageToUse,
}: CategoryFeedBackProps) => {
  //Language
  const unprofessionalServiceMessage =
    translateUnprofessionalService(languageToUse);
  const delayedResponseMessage = translateDelayedResponse(languageToUse);
  const complicatedPaymentMessage = translateComplicatedPayment(languageToUse);
  const noResponseToCallMessage = translateNoResponseToCall(languageToUse);
  const websitePerformanceIssuesMessage =
    translateWebsitePerformanceIssues(languageToUse);
  const otherMessage = translateOtherMessage(languageToUse);
  const selectCategoryFeedbackMessage =
    translateSelectCategoryFeedback(languageToUse);

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
    { index: 1, label: unprofessionalServiceMessage },
    { index: 2, label: delayedResponseMessage },
    { index: 3, label: complicatedPaymentMessage },
    { index: 4, label: noResponseToCallMessage },
    { index: 5, label: websitePerformanceIssuesMessage },
    { index: 6, label: otherMessage },
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
        <p className="text-red-500 text-xs">{selectCategoryFeedbackMessage}</p>
      )}
    </div>
  );
};

export default CategoryFeedBack;
