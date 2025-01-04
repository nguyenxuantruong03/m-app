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
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const LikePage = () => {
  const t = useTranslations()
  const favorite = useFavorite();
  const user = useCurrentUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [alertGuestModal, setAlertGuestModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const sortButtons = [
    {
      label: t("action.sortHighToLow"),
      sortType: "priceHighToLow",
      icon: <ArrowDownWideNarrow className="w-5 h-5" />,
    },
    {
      label: t("action.sortLowToHigh"),
      sortType: "priceLowToHigh",
      icon: <ArrowUpNarrowWide className="w-5 h-5 " />,
    },
    {
      label: t("action.sortNameAToZ"),
      sortType: "nameAToZ",
      icon: <ArrowDownAZ className="w-5 h-5 " />,
    },
    {
      label: t("action.sortNameZToA"),
      sortType: "nameZToA",
      icon: <ArrowDownZA className="w-5 h-5" />,
    },
    {
      label: t("action.hotDeal"),
      sortType: "percentPromotionHighToLow",
      icon: <Percent className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    if (user?.role !== "GUEST" && user?.id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await favorite.fetchFavoriteItems(user?.id || "");
        } catch (error) {
          toast.error(t("toastError.somethingWentWrong"));
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

  useEffect(() => {
    if (loading) {
      document.title = t("loading.loading");
    } else {
      document.title = t("product.favoriteProduct");
    }
  }, [loading]);

  //Handle sort product
  const handleSortChange = (sortType: any) => {
    if (!sortType) {
      toast.error(t("toastError.somethingWentWrong"));
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
      />
      <div className="mt-16 mx-auto max-w-7xl px-2 pt-16 sm:px-6 lg:px-8">
        <div className="lg:grid-cols-12 lg:items-start gap-x-12 lg:col-span-7">
          {favorite.items.length === 0 && (
            <>
              <div className="text-3xl font-semibold dark:text-slate-200 text-slate-900">
                {t("action.heart")}
              </div>
              <div className="flex items-center pb-2 font-bold dark:text-slate-200 text-slate-900 space-x-2">
                {t("product.noItemsLiked")}
                <Heart className="fill-red-500 text-red-500" />
              </div>
            </>
          )}
          {favorite.items.length > 0 && (
            <div className="space-y-2 mb-2">
              <div className="flex items-center space-x-2 text-3xl font-semibold dark:text-slate-200 text-slate-900">
                {t("action.heart")} <Heart className="fill-red-500 text-red-500" />
              </div>
              <SortPriceRange />
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
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikePage;
