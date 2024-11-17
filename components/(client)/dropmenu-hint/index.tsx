"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, SquarePen, User, X } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetOverlay,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import * as z from "zod";
import { Avatar } from "@/components/ui/avatar";
import SocialHint from "./social/socialHint";
import FeedBack from "./feedback/feedBack";
import ChatGemini from "./AI/gemini";
import EmotionFeedBack from "./feedback/emotion-feedback";
import CategoryFeedBack from "./feedback/category-feedback";
import { ChatMessage } from "@/types/type";
import { useCurrentUser } from "@/hooks/use-current-user";
import ImageCellOne from "@/components/image-cell-one";
import { useParams } from "next/navigation";

const formSchema = z.object({
  content: z
    .string()
    .min(4, { message: "Nhập ít nhất 4 ký tự." })
    .max(250, { message: "Không được vượt quá 250 ký tự." }),
});

type FeedBackFormValues = z.infer<typeof formSchema>;

export default function DropMenuHint() {
  const user = useCurrentUser();
  const param = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAISheetOpen, setIsAISheetOpen] = useState(false); // State for AI Assistant Sheet
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false); // State for Feedback Sheet
  const [errorEmotion, setErrorEmotion] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [indexEmotion, setIndexEmotion] = useState<number | null>(null);
  const [indexCategory, setIndexCategory] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const feedbackDate = user?.feedbackTimeNextResonse
    ? new Date(user.feedbackTimeNextResonse)
    : undefined;
  const now = new Date();

  const compareTime = feedbackDate === undefined ||
  now.getTime() > feedbackDate.getTime()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 299);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const newChat = () => {
    setChatHistory([]);
  };

  const form = useForm<FeedBackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: FeedBackFormValues) => {
    try {
      if (indexEmotion === null) {
        setErrorEmotion(true);
      }
      if (indexCategory === null) {
        setErrorCategory(true);
        return;
      }

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
              Cảm ơn {response.data.user.email} đã gửi feedback cho cửa hàng!
            </p>
          );
        }),
        {
          loading: "Updating feedback...",
          success: (message) => {
            setIndexEmotion(null);
            setIndexCategory(null);
            setIsFeedbackSheetOpen(false);
            form.reset();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return "Something went wrong.";
            }
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {user?.role !== "GUEST" && (
        <div>
          <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger asChild className="z-[99999]">
              <Button
                variant="outline"
                className={`fixed right-4 ${
                  isScrolled ? "bottom-32" : "bottom-8"
                } transition-all duration-300`}
              >
                <Hint label="Infomation">
                  {isOpen ? (
                    <X className="dark:text-white" />
                  ) : (
                    <Info className="dark:text-white" />
                  )}
                </Hint>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              className="relative min-w-0 overflow-visible bg-transparent shadow-none border-none"
            >
              <DropdownMenuItem className="-bottom-[62px] focus:outline-none focus:bg-transparent">
                <SocialHint />
              </DropdownMenuItem>
              <DropdownMenuItem className="-bottom-[55px] right-[62px] focus:outline-none focus:bg-transparent">
                <FeedBack
                  setIsAISheetOpen={setIsAISheetOpen}
                  setIsFeedbackSheetOpen={setIsFeedbackSheetOpen}
                  compareTime={compareTime}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* AI Assistant Sheet */}
          <Sheet open={isAISheetOpen} onOpenChange={setIsAISheetOpen}>
            <SheetOverlay className="z-[999998]" />
            <SheetContent side="bottom" className="h-5/6 z-[999999]">
              <div className="max-w-7xl mx-auto shadow-lg flex items-center justify-between p-2 rounded-md">
                <div className="flex item-center space-x-2">
                  <Avatar>
                    <ImageCellOne
                      imageUrl="/images/avatar-AI.png"
                      createdAt={""}
                      email={""}
                      isClient={true}
                      customClassFeedBack="z-[9999999]"
                    />
                  </Avatar>
                  <div>
                    <SheetTitle>Hello VLXD Xuân Trường AI</SheetTitle>
                    <SheetDescription>
                      Trợ lý ảo của tôi sẽ giúp bạn!
                    </SheetDescription>
                  </div>
                </div>
                <Hint label="Đoạn chat mới">
                  <Button variant="secondary" size="icon" onClick={newChat}>
                    <SquarePen />
                  </Button>
                </Hint>
              </div>
              {/* Add any additional content for the AI Sheet */}
              <ChatGemini
                setChatHistory={setChatHistory}
                chatHistory={chatHistory}
              />
            </SheetContent>
          </Sheet>

          {compareTime && (
            <Sheet
              open={isFeedbackSheetOpen}
              onOpenChange={setIsFeedbackSheetOpen}
            >
              <SheetContent className="z-[999999]">
                <SheetHeader>
                  <SheetTitle>Feedback</SheetTitle>
                  <SheetDescription>Nội dung Feedback.</SheetDescription>
                </SheetHeader>
                {/* Add any additional content for the Feedback Sheet */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-sm">
                      Please select how you feel about the experience:
                    </span>
                    <Hint label="Required">
                      <span className="text-red-600">(*)</span>
                    </Hint>
                    <EmotionFeedBack
                      setIndexEmotion={setIndexEmotion}
                      indexEmotion={indexEmotion}
                      setErrorEmotion={setErrorEmotion}
                      errorEmotion={errorEmotion}
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm">
                      Please select your feedback category below:
                    </span>
                    <Hint label="Required">
                      <span className="text-red-600">(*)</span>
                    </Hint>
                    <CategoryFeedBack
                      setIndexCategory={setIndexCategory}
                      indexCategory={indexCategory}
                      setErrorCategory={setErrorCategory}
                      errorCategory={errorCategory}
                    />
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <div>
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <span className="text-sm">
                                  Please leave your feedback below:
                                </span>
                                <Hint label="Required">
                                  <span className="text-red-600">(*)</span>
                                </Hint>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  disabled={loading}
                                  placeholder="Please fill on your answer ..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                      >
                        {loading ? "Loading..." : "Submit"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </SheetContent>
            </Sheet>
          )}
          {/* Feedback Sheet */}
        </div>
      )}
    </>
  );
}
