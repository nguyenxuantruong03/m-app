"use client";
import { useState, useEffect, useTransition } from "react";
import {
  Ellipsis,
  User,
  Earth,
  Lock,
  SquarePen,
  Pencil,
  Trash,
  X,
  Users,
} from "lucide-react";
import { ImageReview, Follow, User as UserData, Review } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { ZoomImageAttendanceModal } from "@/components/modals/zoom-image-one-modal";
import { ZoomImageModal } from "@/components/modals/zoom-image-mutiple";
import { Hint } from "@/components/ui/hint";
import { useRouter } from "next/navigation";
import FormPost from "@/app/(profile)/me/[username]/_components/form-post";
import { post } from "@/actions/client/post";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import EmojiReview from "@/app/(profile)/me/[username]/_components/emoji";
import Link from "next/link";
import ImageCellOne from "@/components/image-cell-one";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "@/components/stream-player/video";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { cn } from "@/lib/utils";
import { LiveBadge } from "@/components/live-badge";
import CircleAvatar from "@/components/ui/circle-avatar";

interface postCardProps {
  self: any;
  avatarImage: string;
  user: any;
  showFunction?: boolean;
  postFilter: any;
}

interface ImageObject {
  url: string;
}

const PostCard = ({
  self,
  avatarImage,
  user,
  showFunction = true,
  postFilter,
}: postCardProps) => {
  const { update } = useSession();
  const router = useRouter();
  const { token, name, identity } = useViewerToken(user?.id || "");

  const [isOpenOneImage, setIsOpenOneImage] = useState(false);
  const [valueImage, setValueImage] = useState("");
  const [isOpenImageMultuple, setIsOpenMultipleImage] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<ImageObject[]>([]); // State to store the current images for the modal
  const [openPost, setOpenPost] = useState(false);
  const [openTabId, setOpenTabId] = useState<string | null>(null);
  const [idPost, setIdPost] = useState("");
  const [isOpenDeletePost, setIsOpenDeletePost] = useState(false);
  const [alertGuestModal, setAlertGuestModal] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (openPost) {
      document.body.style.overflow = "hidden"; // Ngăn chặn cuộn
    } else {
      document.body.style.overflow = "auto"; // Khôi phục cuộn
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openPost]);

  const handleTabClick = (id: string) => {
    setOpenTabId(id); // Toggle the tab based on the current ID
  };

  const openImageModal = (index: number, images: ImageReview[]) => {
    setSelectedIndex(index);
    setCurrentImages(images.map((image) => ({ url: image.url }))); // Create objects with the url property
    setIsOpenMultipleImage(true);
  };

  const handleImageClick = (imageUrl: string) => {
    setValueImage(imageUrl);
    setIsOpenOneImage(true);
  };

  const handleClickIdPost = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenTabId(null);
    setIdPost(id);
    setOpenPost(true);
  };

  const handleClickDeletePost = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenTabId(null);
    setIdPost(id);
    setIsOpenDeletePost(true);
  };

  const ratingMessages: { [key: number]: string } = {
    1: "🤩Rất hài lòng",
    2: "🥰Khá hài lòng",
    3: "🤨Không hài lòng",
    4: "😔Tệ",
  };

  //1.Logic follow hiện tại nếu như người dùng follow mình thì không thể xem được bài viết người theo dõi.
  // Phải đảm bảo rành mình phải theo dõi người đó lun thì mới thấy được
  //2.Giúp tránh người đó theo dõi xem ảnh xong rồi hủy. Dấu && là để đảm bao cả 2 phải theo dõi nhau

  // Lọc các bài viết theo điều kiện
  const filteredReviews = postFilter.filter(
    (
      item: Review & {
        user: UserData & { following: Follow[]; followedBy: Follow[] };
      }
    ) =>
      item.isPublic === "public" ||
      (item.isPublic === "individual" && self.id === user.id) ||
      (item.isPublic === "follow" &&
        ((item.user.following.some(
          (follow) => follow.followerId === item.userId
        ) &&
          item.user.followedBy.some(
            (follow) => follow.followerId === user.id
          )) ||
          self.id === user.id))
  );

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
      case "ongnhua":
        return "ongnhua";
      case "bongden":
        return "bongden";
      case "daydien":
        return "daydien";
      case "ocam":
        return "ocam";
      case "son":
        return "son";
      case "product":
        return "product0";
      case "product1":
        return "product1";
      case "product2":
        return "product2";
      case "product3":
        return "product3";
      case "product4":
        return "product4";
      case "product5":
        return "product5";
      case "product6":
        return "product6";
      case "product7":
        return "product7";
      case "product8":
        return "product8";
      case "product9":
        return "product9";
      case "product10":
        return "product10";
      case "product11":
        return "product11";
      default:
        return ""; // Handle the default case as needed
    }
  };

  const handleClick = (name: string, productType: string) => {
    const route = getRouteBasedOnProductType(productType);
    // // -----------Log the values for debugging----------------
    // console.log('Product Type:', data.productType);
    // console.log('Route:', route);
    if (route) {
      // Construct the complete URL
      const href = `/${route}/${name}`;
      // Use the Link component for navigation
      router.push(href);
    } else {
      console.error("Invalid route:", route);
    }
  };

  const onSubmit = () => {
    startTransition(() => {
      post(undefined, idPost)
        .then((data) => {
          if (data.success) {
            update();
            router.refresh();
            setIsOpenDeletePost(false);
            toast.success(`${data.success}`);
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <>
      <AlertModal
        isOpen={isOpenDeletePost}
        onClose={() => setIsOpenDeletePost(false)}
        onConfirm={onSubmit}
        loading={isPending}
      />
      <ZoomImageAttendanceModal
        isOpen={isOpenOneImage}
        onClose={() => setIsOpenOneImage(false)}
        imageUrl={valueImage}
      />
      <ZoomImageModal
        imageUrl={currentImages} // Pass the current images to the modal
        isOpen={isOpenImageMultuple}
        onClose={() => setIsOpenMultipleImage(false)}
        initialIndex={selectedIndex} // Optionally pass the selected index
      />
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />
      {openPost && (
        <>
          <div className="fixed inset-0 bg-black/80 h-full w-full z-40 flex items-center justify-center">
            <div className="h-[400px] md:h-[500px] overflow-y-auto w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground break-all line-clamp-2 text-white">
                  Chỉnh sửa bài viết
                </span>
                <span
                  onClick={() => setOpenPost(false)}
                  className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                >
                  <X className="h-5 w-5 text-white" />
                </span>
              </div>
              <FormPost
                setOpen={setOpenPost}
                self={self}
                id={idPost}
                userId={user?.id || ""}
              />
            </div>
          </div>
        </>
      )}

      {self.stream?.isLive && (
        <>
          <div className="mb-4">
            <LiveKitRoom
              token={token}
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
              className="h-full"
            >
              <Video
                hostName={self.stream.user.nameuser || ""}
                hostIdentity={self.stream.user.id}
                name={self.stream.name}
                followedByCount={self.stream.user._count.followedBy}
                imageUrl={
                  self.stream.user.imageCredential[0].url ||
                  self.stream.user.image ||
                  ""
                }
                frameAvatar={self.stream.frameAvatar}
                isLive={self.stream.isLive}
                isCitizen={self.stream.user.isCitizen}
                role={self.stream.user.role}
                showInfo={true}
                showExtension={false}
              />
            </LiveKitRoom>
          </div>
        </>
      )}

      {filteredReviews.map((item: any) => (
        <>
          <div key={item.id} className="bg-slate-900 rounded-md p-2 text-white">
          <div className={`flex items-center justify-between ${self.stream?.isLive ? "ml-[4.5rem]" : ""}`}>
              <div className="space-x-2 flex">
              {self.stream?.isLive ? (
                  <Link href={`/live/${self.nameuser}`}>
                    <CircleAvatar
                      nameuser={self.nameuser || ""}
                      srcAvatar={avatarImage}
                      isLive={self.stream?.isLive}
                      srcFrame={self.frameAvatar || ""}
                      role={self.role}
                      isCitizen={self.isCitizen || undefined}
                      isCustomCard={true}
                    />
                  </Link>
                ) : (
                  <Link href={`/user/${self.nameuser}`}>
                    <CircleAvatar
                      nameuser={self.nameuser || ""}
                      srcAvatar={avatarImage}
                      isLive={self.stream?.isLive}
                      srcFrame={self.frameAvatar || ""}
                      role={self.role}
                      isCitizen={self.isCitizen || undefined}
                      isCustomCard={true}
                    />
                  </Link>
                )}
                <div>
                  <Hint label={`${self.nameuser}`} side="bottom">
                    <p className="font-semibold truncate max-w-[7rem] md:max-w-md overflow-hidden">{self.name}</p>
                  </Hint>
                  <p className="text-sm text-gray-300">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <div
                  onClick={() =>
                    handleClick(item.product.name, item.product.productType)
                  }
                >
                  <Hint label="Xem sản phẩm">
                    <SquarePen className="h-7 w-7 p-1 text-white hover:text-opacity-70 cursor-pointer hover:p-1 hover:bg-slate-300 hover:bg-opacity-50 rounded-md" />
                  </Hint>
                </div>
                <div className="relative">
                  {self.id === user.id && showFunction && (
                    <>
                      <Ellipsis
                        className="h-7 w-7 p-1 text-white hover:text-opacity-70 cursor-pointer hover:p-1 hover:bg-slate-300 hover:bg-opacity-50 rounded-md"
                        onClick={() => {
                          handleTabClick(item.id);
                        }}
                      />

                      {openTabId === item.id && (
                        <div
                          className="absolute bg-gray-400 shadow-xl p-2 mt-2 w-40 rounded-md -left-8 z-50"
                          onMouseLeave={() => setOpenTabId(null)}
                        >
                          <div className="space-y-2">
                            <p
                              className="hover:bg-gray-500 hover:bg-opacity-50 cursor-pointer p-2 rounded-md flex items-center"
                              onClick={(event) => {
                                handleClickIdPost(item.id, event);
                              }}
                            >
                              <Pencil className="w-5 h-5 mr-2" /> Cập nhật
                            </p>
                            <p
                              className="hover:bg-gray-500 hover:bg-opacity-50 cursor-pointer p-2 rounded-md flex items-center"
                              onClick={(event) =>
                                handleClickDeletePost(item.id, event)
                              }
                            >
                              <Trash className="w-5 h-5 mr-2" />
                              Xóa bài viết
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 whitespace-normal break-words max-w-3xl ml-[4.5rem] flex flex-wrap space-x-2">
              <span>
                {ratingMessages[item.rating] && (
                  <span>{ratingMessages[item.rating]}</span>
                )}
              </span>
              <span>Loại hàng: {item.categoryName}</span>
              <span>Sản phẩm: {item.product.heading}</span>
              <span className="flex items-center">
                {item.isPublic === "public" && (
                  <span className="flex items-center">
                    <Earth className="mr-1 h-3 w-3" /> Công khai
                  </span>
                )}
                {item.isPublic === "individual" && (
                  <span className="flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> Cá nhân
                  </span>
                )}
                {item.isPublic === "follow" && (
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" /> Người theo dõi
                  </span>
                )}
              </span>
            </div>

            <p className="mb-1">{item.content}</p>
            {item.imageReview.length <= 1 ? (
              <>
                {item.imageReview.map((image: ImageReview) => (
                  <div
                    key={image.id}
                    className="max-w-[49rem] w-full h-[500px] relative cursor-pointer"
                    onClick={() => handleImageClick(image.url)}
                  >
                    <Image
                      src={image.url}
                      alt="404"
                      fill
                      className="object-contain cursor-pointer"
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-w-[49rem] w-full justify-center">
                {item.imageReview.map((image: ImageReview, index: number) => (
                  <div
                    key={image.id}
                    className="w-full h-full cursor-pointer"
                    onClick={() => openImageModal(index, item.imageReview)} // Open modal with the relevant images
                  >
                    <Image
                      src={image.url}
                      alt="404"
                      width="300"
                      height="300"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
            <EmojiReview
              setAlertGuestModal={setAlertGuestModal}
              reviewId={item.id}
              role={user?.role}
              userId={user?.id}
              product={item.product}
              productId={item.product.id}
              loading={isPending}
            />
          </div>
        </>
      ))}
    </>
  );
};

export default PostCard;
