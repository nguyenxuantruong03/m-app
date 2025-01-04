"use client";
import { useState, useEffect, useTransition } from "react";
import {
  Ellipsis,
  Earth,
  Lock,
  SquarePen,
  Pencil,
  Trash,
  X,
  Users,
} from "lucide-react";
import {
  ImageReview,
  Follow,
  User as UserData,
  Review,
  Block,
} from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { ZoomImageAttendanceModal } from "@/components/modals/zoom-image-one-modal";
import { ZoomImageModal } from "@/components/modals/zoom-image-mutiple";
import { Hint } from "@/components/ui/hint";
import { useRouter } from "next/navigation";
import { post } from "@/actions/client/post";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import Link from "next/link";
import FormPostExplore from "./form-post-explore";
import CircleAvatar from "@/components/ui/circle-avatar";
import vi from 'date-fns/locale/vi';
import en from 'date-fns/locale/en-US';
import EmojiReview from "@/app/[locale]/(profile)/me/[username]/_components/emoji";
import { useTranslations } from "next-intl";

const locales = {
  vi,
  en,
};

interface ExploreCard {
  review: any;
  user: any;
}

interface ImageObject {
  url: string;
}

const ExploreCard = ({ review, user }: ExploreCard) => {
  const { update } = useSession();
  const t = useTranslations()
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

  const languageToUse = user?.language ||  "vi";

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
    1: t("profile.verySatisfied"),
    2: t("profile.quiteSatisfied"),
    3: t("profile.notSatisfied"),
    4: t("profile.bad"),
  };

  //1.Logic follow hiện tại nếu như người dùng follow mình thì không thể xem được bài viết người theo dõi.
  // Phải đảm bảo rành mình phải theo dõi người đó lun thì mới thấy được
  //2.Giúp tránh người đó theo dõi xem ảnh xong rồi hủy. Dấu && là để đảm bao cả 2 phải theo dõi nhau

  // Lọc các bài viết theo điều kiện
  const filteredReviews = review.filter(
    (
      item: Review & {
        user: UserData & {
          following: Follow[];
          followedBy: Follow[];
          blocking: Block[];
          blocked: Block[];
        };
      }
    ) =>
      item.isPublic === "public" ||
      (item.isPublic === "individual" && item.user.id === user.id) ||
      (item.isPublic === "follow" &&
        ((item.user.following.some(
          (follow) => follow.followerId === item.userId
        ) &&
          item.user.followedBy.some(
            (follow) => follow.followerId === user.id
          )) ||
          item.user.id === user.id))
  );

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
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
      toast.error(t("toastError.somethingWentWrong"));
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
          toast.error(t("toastError.somethingWentWrong"));
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
                  {t("profile.editPost")}
                </span>
                <span
                  onClick={() => setOpenPost(false)}
                  className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                >
                  <X className="h-5 w-5 text-white" />
                </span>
              </div>
              <FormPostExplore
                setOpen={setOpenPost}
                reviews={review}
                id={idPost}
                userId={user?.id || ""}
              />
            </div>
          </div>
        </>
      )}
      {filteredReviews.map((item: any) => {
        // If imageCredentials is an array, take the first image's url
        const imageCredentials = Array.isArray(item?.user.imageCredential)
          ? item.user.imageCredential[0]?.url
          : item?.user.imageCredential || undefined;

        // Use the first image from imageCredential, fallback to item?.image, or use null as a last option
        const avatarImage = imageCredentials || item?.user.image || null;
        return (
          <div key={item.id} className="bg-slate-900  rounded-md p-2 text-white ">
            <div
              className={`flex items-center justify-between ${
                item.user.stream?.isLive ? "ml-[4.5rem]" : ""
              }`}
            >
              <div className="space-x-2 flex">
                {item.user.stream?.isLive ? (
                  <Link href={`/live/${item.user.nameuser}`}>
                    <CircleAvatar
                      nameuser={item.user.nameuser || ""}
                      srcAvatar={avatarImage}
                      isLive={item.user.stream?.isLive}
                      srcFrame={item.user.frameAvatar || ""}
                      role={item.user.role}
                      isCitizen={item.user.isCitizen || undefined}
                      isCustomCard={true}
                    />
                  </Link>
                ) : (
                  <Link href={`/user/${item.user.nameuser}`}>
                    <CircleAvatar
                      nameuser={item.user.nameuser || ""}
                      srcAvatar={avatarImage}
                      isLive={item.user.stream?.isLive}
                      srcFrame={item.user.frameAvatar || ""}
                      role={item.user.role}
                      isCitizen={item.user.isCitizen || undefined}
                      isCustomCard={true}
                    />
                  </Link>
                )}
                <div>
                  <Link
                    href={`${
                      item.user.stream?.isLive
                        ? `/live/${item.user.nameuser}`
                        : `/user/${item.user.nameuser}`
                    }`}
                  >
                    <p className="font-semibold truncate max-w-[7rem] md:max-w-md overflow-hidden">
                      {item.user.name}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-300">
                  {formatDistanceToNowStrict(new Date(item.createdAt), {
                      locale: locales[languageToUse as keyof typeof locales],
                      addSuffix: true,
                  })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <Hint label={t("profile.viewProduct")}>
                  <SquarePen
                    onClick={() =>
                      handleClick(item.product.name, item.product.productType)
                    }
                    className="h-7 w-7 p-1 text-white hover:text-opacity-70 cursor-pointer hover:p-1 hover:bg-slate-300 hover:bg-opacity-50 rounded-md"
                  />
                </Hint>
                <div className="relative">
                  {item.user.id === user.id && (
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
                              <Pencil className="w-5 h-5 mr-2" />{" "}
                              {t("action.update")}
                            </p>
                            <p
                              className="hover:bg-gray-500 hover:bg-opacity-50 cursor-pointer p-2 rounded-md flex items-center"
                              onClick={(event) =>
                                handleClickDeletePost(item.id, event)
                              }
                            >
                              <Trash className="w-5 h-5 mr-2" />
                              {t("profile.deletePost")}
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
              <span>
                {t("profile.itemType")}: {item.categoryName}
              </span>
              <span>
                {t("product.product")}: {item.product.heading}
              </span>
              <span className="flex items-center">
                {item.isPublic === "public" && (
                  <span className="flex items-center">
                    <Earth className="mr-1 h-3 w-3" /> {t("profile.public")}
                  </span>
                )}
                {item.isPublic === "individual" && (
                  <span className="flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> {t("profile.personal")}
                  </span>
                )}
                {item.isPublic === "follow" && (
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" /> {t("profile.follower")}
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
        );
      })}
    </>
  );
};

export default ExploreCard;
