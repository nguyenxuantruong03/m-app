"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, SquarePen, X } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetOverlay,
} from "@/components/ui/sheet";
import axios from "axios";
import toast from "react-hot-toast";
import SocialHint from "./social/socialHint";
import FeedBack from "./feedback/feedBack";
import ChatGemini from "./AI/gemini";
import { ChatMessage } from "@/types/type";
import { useCurrentUser } from "@/hooks/use-current-user";
import ImageCellOne from "@/components/image-cell-one";
import { usePathname, useSearchParams } from "next/navigation";
import Translation from "./translate/translation";
import { AlertModal } from "@/components/modals/alert-modal";
import { PolicyViolationModal } from "../modal/policy-violation-modal";
import { useTranslations } from "next-intl";
import { FeedbackForm } from "./feedback/form-feedback";

export default function DropMenuHint() {
  const t = useTranslations();
  const user = useCurrentUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReloadm, setIsOpenReload] = useState(false);
  const [isAISheetOpen, setIsAISheetOpen] = useState(false); // State for AI Assistant Sheet
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false); // State for Feedback Sheet
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingLanguage, setLoadingLanguage] = useState(false);
  const [language, setLanguage] = useState("vi");
  const [isOpenConfirmLanguage, setIsConfirmLanguage] = useState(false);
  const [userInputAI, setUserInputAI] = useState<string>("");
  const [content, setContent] = useState("");
  const [policiViolationModal, setPoliciViolationModal] = useState(false);

  //language
  const languageToUse = user?.language || "vi";

  const feedbackDate = user?.feedbackTimeNextResonse
    ? new Date(user.feedbackTimeNextResonse)
    : undefined;
  const now = new Date();

  const compareTime =
    feedbackDate === undefined || now.getTime() > feedbackDate.getTime();

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

  const onCreatlanguage = async () => {
    setLoadingLanguage(true);
    try {
      let apiResponse;

      if (user?.role !== "GUEST" && user?.id) {
        // Nếu có user, gọi API
        apiResponse = await axios.post("/api/translation", {
          language: language,
        });

        // Kiểm tra nếu API trả về dữ liệu thành công
        if (apiResponse.status === 200) {
          toast.success(t("dropmenuHint.languageToastSuccess"));

          // Thực hiện setIsConfirmLanguage và setLoadingLanguage trước
          setIsConfirmLanguage(false);
          setLoadingLanguage(false);

          // Nếu thành công, gọi setTimeout để mở trạng thái reload sau 3s
          setTimeout(() => {
            setIsOpenReload(true);
          }, 2000);
        }
      } else {
        // Nếu không có user
        toast.success(t("dropmenuHint.languageToastSuccess"));

        // Thực hiện setIsConfirmLanguage và setLoadingLanguage trước
        setIsConfirmLanguage(false);
        setLoadingLanguage(false);

        // Nếu thành công, gọi setTimeout để mở trạng thái reload sau 3s
        setTimeout(() => {
          setIsOpenReload(true);
        }, 2000); // 3000ms = 3s
      }
    } catch (error) {
      // Lấy thông báo từ getLanguageToastError
      toast.error(t("toastError.somethingWentWrong"));
      // Dù có lỗi hay không, vẫn đảm bảo set loading thành false
      setIsConfirmLanguage(false);
      setLoadingLanguage(false);
    }
  };

  const handleReloadPage = () => {
    // Tách các phần của URL
    const params = new URLSearchParams(searchParams.toString());
    const currentPathArray = pathname.split("/").filter((segment) => segment);

    // Xác định index ngôn ngữ trong URL hiện tại
    const isLanguageInPath = ["en", "vi"].includes(currentPathArray[0]);
    if (isLanguageInPath) {
      currentPathArray[0] = language; // Thay thế ngôn ngữ nếu đã có
    } else {
      currentPathArray.unshift(language); // Thêm ngôn ngữ nếu chưa có
    }

    // Tạo URL mới với ngôn ngữ chính xác
    const newUrl = `/${currentPathArray.join("/")}?${params.toString()}`;

    // Reload toàn bộ trang
    window.location.href = newUrl;
  };

  //Bỏ pointer-event:none khi không có isAISheetOpen
  useEffect(() => {
    if (!isAISheetOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [isAISheetOpen]);

  //Bỏ pointer-event:none khi không có isFeedbackSheetOpen
  useEffect(() => {
    if (!isFeedbackSheetOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [isFeedbackSheetOpen]);

  //Bỏ pointer-event:none khi không có isOpenConfirmLanguage
  useEffect(() => {
    if (!isOpenConfirmLanguage) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [isOpenConfirmLanguage]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AlertModal
        title={t("dropmenuHint.title")}
        message={t("dropmenuHint.message")}
        isOpen={isOpenConfirmLanguage}
        loading={loadingLanguage}
        onClose={() => setIsConfirmLanguage(false)}
        onConfirm={onCreatlanguage}
      />
      <AlertModal
        title={t("dropmenuHint.confirm")}
        message={t("dropmenuHint.info")}
        isOpen={isOpenReloadm}
        onClose={() => setIsOpenReload(false)}
        onConfirm={handleReloadPage}
        loading={loading}
      />
      <PolicyViolationModal
        isOpen={policiViolationModal}
        onClose={() => setPoliciViolationModal(false)}
        value={content || userInputAI}
        setUserInputAI={setUserInputAI}
      />
      <div>
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger asChild className="z-[99999999]">
            <Button
              disabled={loading || loadingLanguage}
              variant="outline"
              className={`fixed right-4 ${
                isScrolled ? "bottom-32" : "bottom-28 md:bottom-8"
              } transition-all duration-300`}
            >
              <Hint label={t("dropmenuHint.information")}>
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
            <DropdownMenuItem className="top-[114px] -bottom-[62px] focus:outline-none focus:bg-transparent">
              <SocialHint loadingLanguage={loadingLanguage} loading={loading} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                user?.role !== "GUEST" && user?.id
                  ? "-bottom-[62px] right-[62px] focus:outline-none focus:bg-transparent"
                  : "-bottom-[55px] right-[62px] focus:outline-none focus:bg-transparent"
              }`}
            >
              <Translation
                setLanguage={setLanguage}
                setIsConfirmLanguage={setIsConfirmLanguage}
                loadingLanguage={loadingLanguage}
                loading={loading}
                languageToUse={languageToUse}
              />
            </DropdownMenuItem>
            {user?.role !== "GUEST" && user?.id && (
              <DropdownMenuItem className="-bottom-[55px] right-[62px] focus:outline-none focus:bg-transparent">
                <FeedBack
                  setIsAISheetOpen={setIsAISheetOpen}
                  setIsFeedbackSheetOpen={setIsFeedbackSheetOpen}
                  compareTime={compareTime}
                  loading={loading}
                  loadingLanguage={loadingLanguage}
                />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {user?.role !== "GUEST" && user?.id && (
          <>
            {/* AI Assistant Sheet */}
            <Sheet
              open={isAISheetOpen}
              onOpenChange={(open) => setIsAISheetOpen(open)}
            >
              <SheetOverlay className="z-[999998]" />
              <SheetContent side="bottom" className="h-5/6 z-[999999]">
                <div className="max-w-7xl mx-auto shadow-lg flex items-center justify-between p-2 rounded-md">
                  <div className="flex item-center space-x-2">
                    <ImageCellOne
                      imageUrl="/images/avatar-AI.webp"
                      createdAt={""}
                      email={""}
                      isClient={true}
                      customClassFeedBack="z-[9999999]"
                      languageToUse={languageToUse}
                    />
                    <div>
                      <SheetTitle>
                        {t("dropmenuHint.helloVLXDXuanTruongAI")}
                      </SheetTitle>
                      <SheetDescription>
                        {t("dropmenuHint.myVirtualAssistantWillHelpYou")}
                      </SheetDescription>
                    </div>
                  </div>
                  <Hint label={t("dropmenuHint.newChat")}>
                    <Button variant="secondary" size="icon" onClick={newChat}>
                      <SquarePen />
                    </Button>
                  </Hint>
                </div>
                {/* Add any additional content for the AI Sheet */}
                <ChatGemini
                  setChatHistory={setChatHistory}
                  chatHistory={chatHistory}
                  setUserInputAI={setUserInputAI}
                  userInputAI={userInputAI}
                  setPoliciViolationModal={setPoliciViolationModal}
                  languageToUse={languageToUse}
                />
              </SheetContent>
            </Sheet>

            {/* Feedback Sheet */}
            <FeedbackForm
              withSheet
              isOpen={isFeedbackSheetOpen}
              onOpenChange={setIsFeedbackSheetOpen}
              content={content}
              setContent={setContent}
              loading={loading}
              setLoading={setLoading}
            />
          </>
        )}
      </div>
    </>
  );
}
