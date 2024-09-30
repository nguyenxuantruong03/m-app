"use client";
import "./emoji.scss";
import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, MessageCircle, ThumbsUp, Share } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import ShowInfoEmojiModal from "../modal/show-info-emoji";

interface EmojiProps {
  commentId: string;
  setShowResponseForm: React.Dispatch<React.SetStateAction<string | null>>;
  setShowResponseComments: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingResponseId: React.Dispatch<React.SetStateAction<string | null>>;
  setResponseDescriptions: React.Dispatch<React.SetStateAction<string>>;
  setErrorResponse: React.Dispatch<React.SetStateAction<string>>;
  setAlertGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
  role: string | undefined;
  showResponseComments: string | null;
  responseComment: number;
  responsesLength: number;
  product: string;
  userId: string | undefined;
  productId: string;
  loading: boolean;
}
const EmojiPage: React.FC<EmojiProps> = ({
  commentId,
  setShowResponseForm,
  showResponseComments,
  setShowResponseComments,
  setEditingResponseId,
  setResponseDescriptions,
  setErrorResponse,
  setAlertGuestModal,
  responseComment,
  responsesLength,
  product,
  loading,
  productId,
  userId,
  role,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [selectedEmojiLength, setSelectedEmojiLength] = useState<number>(0);
  const [aggregatedEmojiArray, setAggregatedEmojiArray] = useState<any[]>([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const [emojiUserIdModal, setEmojiUserIdModal] = useState<[]>([]); // New state for emoji user ID
  const shareOptionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareOptionsRef.current &&
        !shareOptionsRef.current.contains(event.target as Node)
      ) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const likeLinks = document.querySelectorAll(".Like__link");
    if (likeLinks) {
      likeLinks.forEach((likeLink) => {
        likeLink.addEventListener("mouseenter", function () {
          likeLink.classList.remove("js-hover");
        });

        setTimeout(function () {
          likeLink.classList.remove("js-hover");
        }, 200);
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareOptionsRef.current &&
        !shareOptionsRef.current.contains(event.target as Node)
      ) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cập nhật trạng thái mới nhất ra UI ngay lập thức khi người dùng thay đổi
  const updateEmojis = async () => {
    try {
      const response = await axios.get("/api/client/emoji");

      // Filter and aggregate emoji data
      const userEmojiData = response.data.filter(
        (emoji: any) => emoji.userId === userId
      );
      const emojiData = userEmojiData.find(
        (emoji: any) => emoji.commentId === commentId
      );
      const dataEmojilengthAll = response.data.filter(
        (emoji: any) => emoji.commentId === commentId
      );

      if (dataEmojilengthAll) {
        setSelectedEmojiLength(dataEmojilengthAll.length);

        const aggregatedEmojiLengths: any = {};

        dataEmojilengthAll.forEach((emoji: any) => {
          const { commentId } = emoji;

          if (!aggregatedEmojiLengths[commentId]) {
            aggregatedEmojiLengths[commentId] = {
              emojilengthLike: 0,
              emojilengthHaha: 0,
              emojilengthWow: 0,
              emojilengthAngry: 0,
              emojilengthLove: 0,
              emojilengthSad:0,
            };
          }

          aggregatedEmojiLengths[commentId].emojilengthLike +=
            emoji.emojilengthLike || 0;
          aggregatedEmojiLengths[commentId].emojilengthHaha +=
            emoji.emojilengthHaha || 0;
          aggregatedEmojiLengths[commentId].emojilengthWow +=
            emoji.emojilengthWow || 0;
          aggregatedEmojiLengths[commentId].emojilengthAngry +=
            emoji.emojilengthAngry || 0;
          aggregatedEmojiLengths[commentId].emojilengthLove +=
            emoji.emojilengthLove || 0;
            aggregatedEmojiLengths[commentId].emojilengthSad +=
            emoji.emojilengthSad || 0;
        });

        const aggregatedEmojiArray = Object.keys(aggregatedEmojiLengths).map(
          (commentId) => ({
            commentId,
            ...aggregatedEmojiLengths[commentId],
          })
        );

        setAggregatedEmojiArray(aggregatedEmojiArray);
      }

      if (emojiData) {
        setSelectedEmoji(emojiData.emoji);
      }
      
      //Set cho modal
      setEmojiUserIdModal(response.data.filter((emoji: any) => emoji.commentId === commentId))
    } catch (error) {
      console.error("Failed to fetch emojis:", error);
    }
  };

  const handleEmojiClick = async (emoji: string) => {
    try {
      if (role !== "GUEST" && userId) {
        // Toggle selected emoji
        setSelectedEmoji((prevEmoji) => {
          const newEmoji = prevEmoji === emoji ? null : emoji;
          return newEmoji;
        });

        // Update emoji on the server
        await axios.post("/api/client/emoji", {
          commentId,
          emoji,
          userId,
          productId,
        });

        // Cập nhật trạng thái mới nhất ra UI ngay lập thức khi người dùng thay đổi
        await updateEmojis();
      } else {
        setAlertGuestModal(true);
      }
    } catch (error) {
      console.error("Failed to handle emoji click:", error);
    }
  };

  const handleEmojiDelete = async (emoji: string) => {
    try {
      if (role !== "GUEST" && userId) {
        // Reset selected emoji
        setSelectedEmoji(null);

        // Delete emoji from the server
        await axios.delete("/api/client/emoji", {
          data: {
            commentId,
            emoji,
            userId,
          },
        });

        // Cập nhật trạng thái mới nhất ra UI ngay lập thức khi người dùng thay đổi
        await updateEmojis();
      } else {
        setAlertGuestModal(true);
      }
    } catch (error) {
      console.error("Failed to handle emoji delete:", error);
    }
  };

  // Update the recently selected emojis and store them in the database
  useEffect(() => {
    const updateEmojis = async () => {
      try {
        const response = await axios.get("/api/client/emoji");

        // Tìm emoji dựa trên commentId và userId hiện tại
        const userEmojiData = response.data.filter(
          (emoji: any) => emoji.userId === userId
        );

        // Tìm emoji của commentId hiện tại trong danh sách emoji của người dùng
        const emojiData = userEmojiData.find(
          (emoji: any) => emoji.commentId === commentId
        );

        // Lọc ra tất cả các bản ghi có commentId trùng nhau
        const dataEmojilengthAll = response.data.filter(
          (emoji: any) => emoji.commentId === commentId
        );

        if (dataEmojilengthAll) {
          setSelectedEmojiLength(dataEmojilengthAll.length);
          // aggregatedEmojiLengths được sử dụng để tính tổng số emoji của từng loại (Like, Haha, Wow, Angry, Love) theo commentId.
          const aggregatedEmojiLengths: any = {};

          // Iterate over each emoji record and aggregate the totals by commentId
          dataEmojilengthAll.forEach((emoji: any) => {
            const { commentId } = emoji;

            if (!aggregatedEmojiLengths[commentId]) {
              aggregatedEmojiLengths[commentId] = {
                emojilengthLike: 0,
                emojilengthHaha: 0,
                emojilengthWow: 0,
                emojilengthAngry: 0,
                emojilengthLove: 0,
                emojilengthSad:0,
              };
            }

            aggregatedEmojiLengths[commentId].emojilengthLike +=
            emoji.emojilengthLike || 0;
          aggregatedEmojiLengths[commentId].emojilengthHaha +=
            emoji.emojilengthHaha || 0;
          aggregatedEmojiLengths[commentId].emojilengthWow +=
            emoji.emojilengthWow || 0;
          aggregatedEmojiLengths[commentId].emojilengthAngry +=
            emoji.emojilengthAngry || 0;
          aggregatedEmojiLengths[commentId].emojilengthLove +=
            emoji.emojilengthLove || 0;
            aggregatedEmojiLengths[commentId].emojilengthSad +=
            emoji.emojilengthSad || 0;
          });

          // Chuyển aggregatedEmojiLengths thành Array
          const aggregatedEmojiArray = Object.keys(aggregatedEmojiLengths).map(
            (commentId) => ({
              commentId,
              ...aggregatedEmojiLengths[commentId],
            })
          );
          setAggregatedEmojiArray(aggregatedEmojiArray);
        }
        if (emojiData) {
          setSelectedEmoji(emojiData.emoji);
        }
        //Set cho modal
        setEmojiUserIdModal(response.data.filter(
          (emoji: any) => emoji.commentId === commentId
        ));
      } catch (error) {
        console.error("Failed to fetch emojis:", error);
      }
    };
    updateEmojis();
  }, [commentId, userId, productId]);

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleCopy = (url: string, product: string) => {
    const productUrl = `${url} - Sản phẩm: ${product}`;
    navigator.clipboard.writeText(productUrl).then(() => {});
  };

  const handleCopyLinkToast = (url: string, product: string) => {
    const productUrl = `${url} - Sản phẩm: ${product}`;
    navigator.clipboard.writeText(productUrl).then(() => {
      toast.success("Đã sao chép liên kết!");
    });
  };

  const handleShowResponseComment = () => {
    setShowResponseForm(null);
    setEditingResponseId(null);
    setResponseDescriptions("");
    setErrorResponse("");
    setShowResponseComments((prevCommentId) =>
      prevCommentId === commentId ? null : commentId
    );
  };

  const handleResponse = () => {
    setShowResponseForm((prev) => (prev === commentId ? null : commentId));
  };

  const mapEmojiToComponent = () => {
    //aggregatedEmojiArray lấy ra từng count của emoji để xếp hạng xem emoji nào nhiều nhất thì xếp hạng 1 ... 
    const emojisForComment = aggregatedEmojiArray.find(
      (emojiData: any) => emojiData.commentId === commentId
    );

    if (emojisForComment) {
      const emojiCounts = [
        { type: "like", count: emojisForComment.emojilengthLike },
        { type: "haha", count: emojisForComment.emojilengthHaha },
        { type: "wow", count: emojisForComment.emojilengthWow },
        { type: "angry", count: emojisForComment.emojilengthAngry },
        { type: "love", count: emojisForComment.emojilengthLove },
        { type: "sad", count: emojisForComment.emojilengthSad },
      ];

      emojiCounts.sort((a, b) => b.count - a.count);

      return emojiCounts
        .slice(0, 3)
        .map((emojiData, index) =>
          emojiData.count > 0 ? (
            <div key={index}>{getEmojiComponent(emojiData.type)}</div>
          ) : null
        );
    }

    return null;
  };

  const getEmojiComponent = (emoji: string) => {
    switch (emoji) {
      case "like":
        return (
          <div>
            <Image
              src="/icon-image/like-icon.png"
              alt=""
              width="19"
              height="19"
            />
          </div>
        );
      case "love":
        return (
          <div>
            <Image src="/icon-image/love.png" alt="" width="17" height="17" />
          </div>
        );
      case "haha":
        return (
          <div>
            <Image src="/icon-image/haha.png" alt="" width="18" height="18" />
          </div>
        );
      case "wow":
        return (
          <div>
            <Image
              src="/icon-image/wow-icon.png"
              alt=""
              width="17"
              height="17"
            />
          </div>
        );
      case "sad":
        return (
          <div>
            <Image src="/icon-image/sad.png" alt="" width="17" height="17" />
          </div>
        );
      case "angry":
        return (
          <div>
            <Image src="/icon-image/angry.png" alt="" width="17" height="17" />
          </div>
        );
      default:
        return null;
    }
  };

  const mapEmojiChangeText = () => {
    if (selectedEmoji) {
      return (
        <div
          key={0}
          className="flex justify-center items-center text-gray-800 text-opacity-60"
          onClick={() => handleEmojiDelete(selectedEmoji)}
        >
          {getEmojiChangeText(selectedEmoji)}
        </div>
      );
    }

    return (
      <div
        className="flex justify-center items-center text-gray-800 text-opacity-60"
        onClick={() => handleEmojiClick("like")}
      >
        <ThumbsUp className="w-5 h-5" />
        <kbd className="mx-1">Thích</kbd>
      </div>
    );
  };

  const getEmojiChangeText = (emoji: string) => {
    let emojiInfo;

    switch (emoji) {
      case "like":
        emojiInfo = {
          imageSrc: "/icon-image/like-icon.png",
          altText: "Thích",
          width: 27,
          height: 27,
          textColor: "#5890ff",
        };
        break;
      case "love":
        emojiInfo = {
          imageSrc: "/icon-image/love.png",
          altText: "Yêu",
          width: 25,
          height: 25,
          textColor: "#f25268",
        };
        break;
      case "haha":
        emojiInfo = {
          imageSrc: "/icon-image/haha.png",
          altText: "Haha",
          width: 26,
          height: 26,
          textColor: "#ffd972",
        };
        break;
      case "wow":
        emojiInfo = {
          imageSrc: "/icon-image/wow-icon.png",
          altText: "Wow",
          width: 25,
          height: 25,
          textColor: "#ffd972",
        };
        break;
      case "sad":
        emojiInfo = {
          imageSrc: "/icon-image/sad.png",
          altText: "Buồn",
          width: 25,
          height: 25,
          textColor: "#ffd972",
        };
        break;
      case "angry":
        emojiInfo = {
          imageSrc: "/icon-image/angry.png",
          altText: "Phẫn nộ",
          width: 25,
          height: 25,
          textColor: "orange", // Màu văn bản
        };
        break;
      default:
        return null;
    }

    return (
      <div
        key={emoji}
        style={{ color: emojiInfo.textColor }}
        className="flex justify-center items-center"
      >
        <Image
          src={emojiInfo.imageSrc}
          alt={emojiInfo.altText}
          width={emojiInfo.width}
          height={emojiInfo.height}
        />
        <kbd className="ml-2">{emojiInfo.altText}</kbd>
      </div>
    );
  };

  return (
    <>
      <ShowInfoEmojiModal
        isOpen={open}
        onClose={() => setOpen(false)}
        emojiUserIdModal={emojiUserIdModal}
      />
      <div className="flex ml-12 items-center mb-2 border-b-2">
        <div
          className="hover:underline flex items-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {mapEmojiToComponent()}
          <p className="ml-1 text-[#7f8286]"> {selectedEmojiLength}</p>
        </div>
        <div className="ml-3 flex item-center text-[#7f8286]">
          {responsesLength} phản hồi
        </div>
      </div>
      <div className="flex items-center max-w-7xl flex-wrap justify-center space-y-3 md:justify-start md:space-y-0">
        <div className="Like ml-0 md:ml-12">
          <a className="mr-1 Like__link js-hover">{mapEmojiChangeText()}</a>
          <div className="Emojis">
            <div
              className="Emoji Emoji--like"
              onClick={() => handleEmojiClick("like")}
            >
              <div className="icon icon--like"></div>
            </div>
            <div
              className="Emoji Emoji--love "
              onClick={() => handleEmojiClick("love")}
            >
              <div className="icon icon--heart"></div>
            </div>
            <div
              className="Emoji Emoji--haha"
              onClick={() => handleEmojiClick("haha")}
            >
              <div className="icon icon--haha"></div>
            </div>
            <div
              className="Emoji Emoji--wow"
              onClick={() => handleEmojiClick("wow")}
            >
              <div className="icon icon--wow"></div>
            </div>
            <div
              className="Emoji Emoji--sad"
              onClick={() => handleEmojiClick("sad")}
            >
              <div className="icon icon--sad"></div>
            </div>
            <div
              className="Emoji Emoji--angry"
              onClick={() => handleEmojiClick("angry")}
            >
              <div className="icon icon--angry"></div>
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="h-8 border-slate-200" />
        <button
          disabled={loading}
          onClick={handleResponse}
          className="flex items-center whitespace-nowrap text-gray-800 text-opacity-60 mx-1 hover:text-gray-900 hover:bg-[#a9a9a94d] hover:rounded-md hover:py-2 px-8 "
        >
          <MessageCircle className="w-5 h-5 mr-1" /> Phản hồi
        </button>

        {responseComment > 0 && (
          <>
            <div className="hidden md:block">
              <Separator
                orientation="vertical"
                className="h-8 border-slate-200"
              />
            </div>
            <button
              disabled={loading}
              onClick={handleShowResponseComment}
              className="flex items-center text-gray-800 text-opacity-60 ml-2 hover:text-gray-900 hover:bg-[#a9a9a94d] hover:rounded-md hover:py-2 px-3 md:px-8"
            >
              {showResponseComments === commentId ? (
                <span className="flex items-center whitespace-nowrap">
                  <EyeOff className="w-5 h-5 mr-1" />
                  Ẩn phản hồi
                </span>
              ) : (
                <span className="flex items-center whitespace-nowrap">
                  <Eye className="w-5 h-5 mr-1" />
                  Xem phản hồi
                </span>
              )}
            </button>
          </>
        )}

        {responseComment > 0 && (
          <Separator orientation="vertical" className="h-8 border-slate-200" />
        )}
        <div className="relative">
          <button
            disabled={loading}
            onClick={handleShareClick}
            className="flex items-center cursor-pointer whitespace-nowrap text-gray-800 text-opacity-60 mx-1 hover:text-gray-900 hover:bg-[#a9a9a94d] hover:rounded-md hover:py-2 px-8"
          >
            <Share className="w-5 h-5 mr-1" /> Chia sẻ
          </button>

          {showShareOptions && (
            <div
              ref={shareOptionsRef}
              className="absolute bottom-10 mt-1 w-52 bg-white border border-gray-300 shadow-lg rounded-lg p-1 space-y-2 z-50"
            >
              <Link
                href={`https://www.facebook.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-nowrap gap-1 p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(window.location.href, product);
                  window.open(`https://www.facebook.com/`, "_blank");
                }}
              >
                <Image
                  width="35"
                  height="35"
                  className="object-fit"
                  src="/images/facebook.png"
                  alt="error"
                />
                Gửi đến Facebook
              </Link>
              <Link
                href={`https://www.instagram.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-nowrap gap-1 p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(window.location.href, product);
                  window.open(`https://www.instagram.com/`, "_blank");
                }}
              >
                <Image
                  width="35"
                  height="35"
                  className="object-fit"
                  src="/images/instagram.png"
                  alt="error"
                />
                Gửi đến Instagram
              </Link>
              <Link
                href={`https://www.tiktok.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-nowrap gap-1 p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(window.location.href, product);
                  window.open(`https://www.tiktok.com/`, "_blank");
                }}
              >
                <Image
                  width="35"
                  height="35"
                  className="object-fit"
                  src="/images/tiktok.png"
                  alt="error"
                />
                Gửi đến TikTok
              </Link>
              <Link
                href={`https://zalo.me/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-nowrap gap-1 p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(window.location.href, product);
                  window.open(`https://zalo.me/`, "_blank");
                }}
              >
                <Image
                  width="35"
                  height="35"
                  className="object-fit"
                  src="/images/zalo.png"
                  alt="error"
                />
                Gửi đến Zalo
              </Link>
              <button
                disabled={loading}
                onClick={() =>
                  handleCopyLinkToast(window.location.href, product)
                }
                className="flex items-center whitespace-nowrap gap-1 p-2 text-gray-800 hover:bg-gray-100 rounded-md w-full"
              >
                <LinkIcon className="h-3 w-3" /> Sao chép liên kết
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmojiPage;
