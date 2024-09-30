"use client";
import { useState, useEffect, useRef, useTransition } from "react";
import {
  Ellipsis,
  User,
  Earth,
  Lock,
  SquarePen,
  Pencil,
  Trash,
  X,
} from "lucide-react";
import ImageCellOne from "./image-cell-one";
import { AvatarFallback, Avatar } from "./ui/avatar";
import { ImageReview } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { ZoomImageAttendanceModal } from "./modals/zoom-image-one-modal";
import { ZoomImageModal } from "./modals/zoom-image-mutiple";
import { Hint } from "./ui/hint";
import { useRouter } from "next/navigation";
import FormPost from "@/app/(profile)/(me)/u/[username]/_components/form-post";
import { post } from "@/actions/client/post";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AlertModal } from "./modals/alert-modal";
import { AlertGuestModal } from "./modals/alert-guest-login-modal";
import EmojiReview from "@/app/(profile)/(me)/u/[username]/_components/emoji";

interface postCardProps {
  self: any;
  avatarImage: string;
  user: any;
}

interface ImageObject {
  url: string;
}

const PostCard = ({ self, avatarImage, user }: postCardProps) => {
  const { update } = useSession();
  const router = useRouter();

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

  // Lọc các bài viết theo điều kiện
  const filteredReviews = self.review.filter(
    (item: any) =>
      item.isPublic === true || (item.isPublic === false && self.id === user.id)
  );

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
      case "ongnhua":
        return "ongnhua";
      case "quat":
        return "quat";
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
      {filteredReviews.length === 0 ? (
        <p className="text-center text-gray-400 font-semibold text-xl">
          Không có bài viết
        </p>
      ) : (
        filteredReviews.map((item: any) => (
          <div key={item.id} className="bg-slate-900 rounded-md p-2 text-white">
            <div className="flex items-center justify-between">
              <div className="space-x-2 flex">
                <Avatar>
                  {avatarImage ? (
                    <ImageCellOne imageUrl={avatarImage} />
                  ) : (
                    <AvatarFallback className="bg-sky-500">
                      <User className="text-white" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold">{self.name}</p>
                  <p className="text-sm text-gray-300">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center mr-3 space-x-5">
                <Hint label="Xem sản phẩm">
                  <SquarePen
                    onClick={() =>
                      handleClick(item.product.name, item.product.productType)
                    }
                    className="h-5 w-5 text-white hover:text-opacity-70 cursor-pointer"
                  />
                </Hint>
                <div className="relative">
                  {self.id === user.id && (
                    <>
                    <Ellipsis
                      className="h-5 w-5 text-white hover:text-opacity-70 cursor-pointer"
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
            <div className="text-xs text-gray-400 whitespace-normal break-words max-w-3xl ml-10 flex flex-wrap space-x-2">
              <span>
                {ratingMessages[item.rating] && (
                  <span>{ratingMessages[item.rating]}</span>
                )}
              </span>
              <span>Loại hàng: {item.categoryName}</span>
              <span>Sản phẩm: {item.product.heading}</span>
              <span className="flex items-center">
                {item.isPublic ? (
                  <span className="flex items-center">
                    <Earth className="mr-1 h-3 w-3" /> Công khai
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> Cá nhân
                  </span>
                )}
              </span>
            </div>

            <p>{item.content}</p>
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
        ))
      )}
    </>
  );
};

export default PostCard;
