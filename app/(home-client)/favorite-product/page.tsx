"use client";
import { useEffect, useState } from "react";
import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowDownZA,
  ArrowUpNarrowWide,
  Heart,
  Percent,
} from "lucide-react";
import useFavorite from "@/hooks/client/db/use-favorite";
import FavoriteItem from "./components/favorite-item";
import { SortButton } from "@/components/ui/sortButton";
import SortPriceRange from "./components/sort-price-change-favorite-item";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import { useRouter } from "next/navigation";
import {
  translateHeart,
  translateNoItemsLiked,
  getToastError,
  translateSortHighToLow,
  translateSortLowToHigh,
  translateSortNameAToZ,
  translateSortNameZToA,
  translateHotDeals,
} from "@/translate/translate-client";
import toast from "react-hot-toast";

const LikePage = () => {
  const favorite = useFavorite();
  const user = useCurrentUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [alertGuestModal, setAlertGuestModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const toastErrorMessage = getToastError(languageToUse);
  const heartMessage = translateHeart(languageToUse);
  const noItemLikeMessage = translateNoItemsLiked(languageToUse);
  const sortHighToLowMessage = translateSortHighToLow(languageToUse);
  const sortLowtoHighMessage = translateSortLowToHigh(languageToUse);
  const sortNameAToZMessage = translateSortNameAToZ(languageToUse);
  const sortNameZToAMessage = translateSortNameZToA(languageToUse);
  const hotDealsMessage = translateHotDeals(languageToUse);

  const sortButtons = [
    {
      label: sortHighToLowMessage,
      sortType: "priceHighToLow",
      icon: <ArrowDownWideNarrow className="w-5 h-5" />,
    },
    {
      label: sortLowtoHighMessage,
      sortType: "priceLowToHigh",
      icon: <ArrowUpNarrowWide className="w-5 h-5 " />,
    },
    {
      label: sortNameAToZMessage,
      sortType: "nameAToZ",
      icon: <ArrowDownAZ className="w-5 h-5 " />,
    },
    {
      label: sortNameZToAMessage,
      sortType: "nameZToA",
      icon: <ArrowDownZA className="w-5 h-5" />,
    },
    {
      label: hotDealsMessage,
      sortType: "percentPromotionHighToLow",
      icon: <Percent className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    if (user?.role !== "GUEST" && user?.id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await favorite.fetchFavoriteItems(user?.id || "", languageToUse);
        } catch (error) {
          toast.error(toastErrorMessage);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setAlertGuestModal(true);
      router.push("/home-product");
    }
  }, []);

  //Handle sort product
  const handleSortChange = (sortType: any) => {
    if (!sortType) {
      toast.error(toastErrorMessage);
      return;
    }

    setSortType(sortType);
    favorite.setSortType(sortType);

    const sortedItems = favorite.getSortedItems();
    favorite.setFilteredItems(sortedItems);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
        languageToUse={languageToUse}
      />
      <div className="mt-16 mx-auto max-w-7xl px-2 pt-16 sm:px-6 lg:px-8">
        <div className="lg:grid-cols-12 lg:items-start gap-x-12 lg:col-span-7">
          {favorite.items.length === 0 && (
            <>
              <div className="text-3xl font-semibold dark:text-slate-200 text-slate-900">
                {heartMessage}
              </div>
              <div className="flex items-center pb-2 font-bold dark:text-slate-200 text-slate-900 space-x-2">
                {noItemLikeMessage}
                <Heart className="fill-red-500 text-red-500" />
              </div>
            </>
          )}
          {favorite.items.length > 0 && (
            <div className="space-y-2 mb-2">
              <div className="flex items-center space-x-2 text-3xl font-semibold dark:text-slate-200 text-slate-900">
                {heartMessage} <Heart className="fill-red-500 text-red-500" />
              </div>
              <SortPriceRange languageToUse={languageToUse} />
              <div className="flex justify-start items-center w-full overflow-x-auto">
                <div className="flex space-x-2">
                  {sortButtons.map((button, index) => (
                    <SortButton
                      key={index}
                      onClick={() => handleSortChange(button.sortType)}
                      active={sortType === button.sortType}
                      label={button.label}
                      icon={button.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 lg:col-span-4 lg:mt-0 m-4">
            {favorite.filteredItems.map((item) => (
              <FavoriteItem
                key={item.productId}
                data={item}
                loading={loading}
                setLoading={setLoading}
                languageToUse={languageToUse}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikePage;
