"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Hint } from "@/components/ui/hint";
import { useTranslations } from "next-intl";
import EmotionFeedBack from "./emotion-feedback";
import CategoryFeedBack from "./category-feedback";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PolicyViolationModal } from "../../modal/policy-violation-modal";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { offensiveWords } from "@/vn_offensive_words";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Dispatch, SetStateAction, useState } from "react";

interface FeedbackFormProps {
  withSheet?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;

  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const FeedbackForm = ({
  withSheet = false,
  isOpen,
  onOpenChange,
  title,
  description,
  content,
  setContent,
  loading,
  setLoading,
}: FeedbackFormProps) => {
  const t = useTranslations();
  const user = useCurrentUser();
  const param = useParams();

  const storeHighlights = [
    {
      title: t("dropmenuHint.TitleAboutTruongDat"),
      description: t("dropmenuHint.DescriptionAboutTruongDat"),
    },
    {
      title: t("dropmenuHint.TitleProductCategories"),
      description: [
        t("dropmenuHint.DescriptionProductCategoriesCementSteel"),
        t("dropmenuHint.DescriptionProductCategoriesPaints"),
        t("dropmenuHint.DescriptionProductCategoriesFixtures"),
        t("dropmenuHint.DescriptionProductCategoriesEco"),
      ],
    },
    {
      title: t("dropmenuHint.TitleLogisticsService"),
      description: [
        t("dropmenuHint.DescriptionLogisticsServiceDelivery"),
        t("dropmenuHint.DescriptionLogisticsServiceConsulting"),
        t("dropmenuHint.DescriptionLogisticsServicePriceUpdate"),
        t("dropmenuHint.DescriptionLogisticsServiceQuote"),
      ],
    },
    {
      title: t("dropmenuHint.TitlePartnerPolicy"),
      description: [
        t("dropmenuHint.DescriptionPartnerPolicyDiscounts"),
        t("dropmenuHint.DescriptionPartnerPolicyCredit"),
        t("dropmenuHint.DescriptionPartnerPolicyBulkSupport"),
      ],
    },
  ];

  // ⬇️ State dùng nội bộ
  const [indexEmotion, setIndexEmotion] = useState<number | null>(null);
  const [errorEmotion, setErrorEmotion] = useState(false);
  const [indexCategory, setIndexCategory] = useState<number | null>(null);
  const [errorCategory, setErrorCategory] = useState(false);
  const [policiViolationModal, setPoliciViolationModal] = useState(false);

  const feedbackDate = user?.feedbackTimeNextResonse
    ? new Date(user.feedbackTimeNextResonse)
    : undefined;
  const now = new Date();

  const compareTime =
    feedbackDate === undefined || now.getTime() > feedbackDate.getTime();

  const formSchema = z.object({
    content: z
      .string()
      .min(4, { message: t("dropmenuHint.minCharacters") })
      .max(250, { message: t("dropmenuHint.maxCharacter") }),
  });

  type FeedBackFormValues = z.infer<typeof formSchema>;

  const form = useForm<FeedBackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: FeedBackFormValues) => {
    setContent(data.content);

    const containsOffensiveWord = offensiveWords.some((word) =>
      data.content.includes(word)
    );

    if (containsOffensiveWord) {
      setPoliciViolationModal(true);
      return;
    }

    if (!compareTime) {
      toast.error(t("toastError.somethingWentWrong"));
      return;
    }

    if (indexEmotion === null) {
      setErrorEmotion(true);
      return;
    }
    if (indexCategory === null) {
      setErrorCategory(true);
      return;
    }

    try {
      setLoading(true);
      const promise = axios.post(`/api/${param.storeId}/feedback`, {
        userId: user?.id,
        content: data.content,
        emotion: indexEmotion,
        category: indexCategory,
      });

      await toast.promise(
        promise.then((response) => {
          return (
            <p>
              {t("dropmenuHint.thankYouForFeedback", {
                email: response.data.user.email,
              })}
            </p>
          );
        }),
        {
          loading: t("dropmenuHint.updatingFeedback"),
          success: (message) => {
            setIndexEmotion(null);
            setIndexCategory(null);
            onOpenChange?.(false);
            form.reset();
            return message;
          },
          error: () => t("toastError.somethingWentWrong"),
        }
      );
    } catch (error) {
      toast.error(t("toastError.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const formBody = compareTime ? (
    <div className="space-y-2">
      {!withSheet && (
        <span className="text-2xl text-red-400 font-bold">
          {t("dropmenuHint.feedback")}
        </span>
      )}
      <div className="space-y-1">
        <span className="text-sm text-slate-900 dark:text-slate-200">
          {t("dropmenuHint.selectExperienceFeedback")}
        </span>
        <Hint label={t("dropmenuHint.required")}>
          <span className="text-red-600">(*)</span>
        </Hint>
        <EmotionFeedBack
          indexEmotion={indexEmotion}
          setIndexEmotion={setIndexEmotion}
          errorEmotion={errorEmotion}
          setErrorEmotion={setErrorEmotion}
        />
      </div>

      <div className="space-y-1">
        <span className="text-sm text-slate-900 dark:text-slate-200">
          {t("dropmenuHint.selectFeedbackCategory")}
        </span>
        <Hint label={t("dropmenuHint.required")}>
          <span className="text-red-600">(*)</span>
        </Hint>
        <CategoryFeedBack
          indexCategory={indexCategory}
          setIndexCategory={setIndexCategory}
          errorCategory={errorCategory}
          setErrorCategory={setErrorCategory}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-sm text-slate-900 dark:text-slate-200">
                    {t("dropmenuHint.leaveFeedbackBelow")}
                  </span>
                  <Hint label={t("dropmenuHint.required")}>
                    <span className="text-red-600">(*)</span>
                  </Hint>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="text-slate-900 dark:text-slate-200 min-h-6"
                    disabled={loading}
                    placeholder={t("dropmenuHint.pleaseFillYourAnswer")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? t("loading.loading") : t("action.submit")}
          </Button>
        </form>
      </Form>
    </div>
  ) : (
    <>
      {storeHighlights.map((item, idx) => (
        <div key={idx} className="">
          <h3 className="text-2xl font-semibold mb-2 text-red-400">
            {item.title}
          </h3>
          {Array.isArray(item.description) ? (
            <ul className="list-disc list-inside bg-slate-900 bg-opacity-20 dark:bg-slate-200 rounded-md dark:bg-opacity-20 p-2 shadow-sm text-slate-700 dark:text-slate-300">
              {item.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <PolicyViolationModal
        isOpen={policiViolationModal}
        onClose={() => setPoliciViolationModal(false)}
        value={content}
      />

      {withSheet
        ? compareTime &&
          isOpen && (
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
              <SheetOverlay className="z-[999998]" />
              <SheetContent className="z-[999999]">
                <SheetHeader>
                  <SheetTitle>{title || t("dropmenuHint.feedback")}</SheetTitle>
                  <SheetDescription>
                    {description || t("dropmenuHint.feedbackContent")}
                  </SheetDescription>
                </SheetHeader>
                {formBody}
              </SheetContent>
            </Sheet>
          )
        : formBody}
    </>
  );
};
