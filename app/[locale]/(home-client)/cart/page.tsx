"use client";
import useCart from "@/hooks/client/use-cart";
import CartItem from "./components/localStorage/cart-item";
import Sumary from "./components/localStorage/sumary";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import CartItemDatabase from "./components/db/cart-item-db";
import SumaryDb from "./components/db/sumary-db";
import toast from "react-hot-toast";
import LoadingPageComponent from "@/components/ui/loading";
import useCartdb from "@/hooks/client/db/use-cart-db";
import {
  getColorPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const cart = useCart();
  const cartdb = useCartdb();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingChangeData, setLoadingChangeData] = useState(false);
  const [loadingChangeLocal, setLoadingChangeLocal] = useState(false);
  const [loadingfetchData, setLoadingfetchData] = useState(false);
  const t = useTranslations();

  const handleBuyNow = () => {
    router.push("/home-product");
  };

  //Sort Item CartDb nếu quantity nào bằng 0 thì nằm cuối
  const sortItemCartDb = cartdb.items.sort((a, b) => {
    const getQuantityMatchColorandSize = (item: any) => {
      const { price: priceSize, percentpromotion: percentpromotionSize } =
        getSizePrice(item.product, item.size);
      const { price: priceColor, percentpromotion: percentpromotionColor } =
        getColorPrice(item.product, item.color);
      const highestPrice = Math.max(priceSize, priceColor);

      if (
        highestPrice ===
        item?.product?.productdetail?.price5 *
          ((100 - item?.product?.productdetail?.percentpromotion5) / 100)
      ) {
        return item?.product?.productdetail?.quantity5;
      }
      if (
        highestPrice ===
        item?.product?.productdetail?.price4 *
          ((100 - item?.product?.productdetail?.percentpromotion4) / 100)
      ) {
        return item?.product?.productdetail?.quantity4;
      }
      if (
        highestPrice ===
        item?.product?.productdetail?.price3 *
          ((100 - item?.product?.productdetail?.percentpromotion3) / 100)
      ) {
        return item?.product?.productdetail?.quantity3;
      }
      if (
        highestPrice ===
        item?.product?.productdetail?.price2 *
          ((100 - item?.product?.productdetail?.percentpromotion2) / 100)
      ) {
        return item?.product?.productdetail?.quantity2;
      }
      return item?.product?.productdetail?.quantity1;
    };

    const quantityA = getQuantityMatchColorandSize(a);
    const quantityB = getQuantityMatchColorandSize(b);

    // Sắp xếp theo số lượng giảm dần, nếu số lượng bằng nhau thì giữ nguyên thứ tự
    return quantityB - quantityA;
  });

  //Sort Item Cart Local nếu quantity nào bằng 0 thì nằm cuối
  const sortItemCartLocal = cart.items.sort((a, b) => {
    const getQuantityMatchColorandSize = (item: any) => {
      const { price: priceSize, percentpromotion: percentpromotionSize } =
        getSizePrice(item.product, item.size);
      const { price: priceColor, percentpromotion: percentpromotionColor } =
        getColorPrice(item.product, item.color);
      const highestPrice = Math.max(priceSize, priceColor);

      if (
        highestPrice ===
        item?.product?.productdetail?.price5 *
          ((100 - item?.product?.productdetail?.percentpromotion5) / 100)
      ) {
        return item?.product?.productdetail?.quantity5;
      }
      if (
        highestPrice ===
        item?.product?.productdetail?.price4 *
          ((100 - item?.product?.productdetail?.percentpromotion4) / 100)
      ) {
        return item?.product?.productdetail?.quantity4;
      }
      if (
        highestPrice ===
        item?.product?.productdetail?.price3 *
          ((100 - item?.product?.productdetail?.percentpromotion3) / 100)
      ) {
        return item?.product?.productdetail?.quantity3;
      }
      if (
        highestPrice ===
        item?.product?.productdetail?.price2 *
          ((100 - item?.product?.productdetail?.percentpromotion2) / 100)
      ) {
        return item?.product?.productdetail?.quantity2;
      }
      return item?.product?.productdetail?.quantity1;
    };

    const quantityA = getQuantityMatchColorandSize(a);
    const quantityB = getQuantityMatchColorandSize(b);

    // Sắp xếp theo số lượng giảm dần, nếu số lượng bằng nhau thì giữ nguyên thứ tự
    return quantityB - quantityA;
  });

  useEffect(() => {
    if (currentUser?.role !== "GUEST" && currentUser?.id) {
      const fetchData = async () => {
        try {
          await cartdb.fetchCartItems(currentUser?.id || "");
        } catch (error) {
          toast.error(t("toastError.somethingWentWrong"));
        } finally {
          setLoading(false);
        }
        fetchData();
      };
    }
  }, []);

  useEffect(() => {
    if (loading || loadingChangeData || loadingChangeLocal || loadingfetchData) {
      document.title = t("loading.loading");
    } else {
      document.title = t("cart.cart")
    }
  }, [loading,loadingChangeData,loadingChangeLocal,loadingfetchData]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  if (loading) {
    return <LoadingPageComponent />;
  }

  return (
    <div className="mt-16 mx-auto max-w-7xl px-2 pt-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-200">
        {t("cart.cart")}
      </h1>
      <div className="mt-4 lg:grid-cols-12 lg:items-start gap-x-12 lg:col-span-7">
        {currentUser?.role === "GUEST" || !currentUser?.id ? (
          <>
            {cart.items.length === 0 && (
              <>
                <div className="flex justify-center">
                  <Image
                    src="/images/no-cart.png"
                    alt=""
                    width="108"
                    height="98"
                  />
                </div>
                <div className="flex justify-center my-2">
                  <p className="text-slate-900 dark:text-slate-200">
                    {t("cart.emptyCart")}
                  </p>
                </div>
                <div className="flex justify-center my-2">
                  <Button onClick={handleBuyNow} className="hover:underline">
                    {t("cart.buyNow")}
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {cartdb.items.length === 0 && (
              <>
                <div className="flex justify-center">
                  <Image
                    src="/images/no-cart.png"
                    alt=""
                    width="108"
                    height="98"
                  />
                </div>
                <div className="flex justify-center my-2">
                  <p className="text-slate-900 dark:text-slate-200">
                    {t("cart.emptyCart")}
                  </p>
                </div>
                <div className="flex justify-center my-2">
                  <Button onClick={handleBuyNow} className="hover:underline">
                    {t("cart.buyNow")}
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {currentUser?.role === "GUEST" || !currentUser?.id ? (
          <ul>
            {sortItemCartLocal.map((item) => (
              <CartItem
                setLoadingChange={setLoadingChangeLocal}
                loadingChange={loadingChangeLocal}
                key={item.id}
                data={item}
                userId={currentUser?.id || ""}
              />
            ))}
          </ul>
        ) : (
          <>
            <ul>
              {sortItemCartDb.map((item) => (
                <CartItemDatabase
                  setLoadingChange={setLoadingChangeData}
                  loadingChange={loadingChangeData}
                  key={item.id}
                  data={item}
                  userId={currentUser?.id || ""}
                />
              ))}
            </ul>
          </>
        )}

        {currentUser?.role === "GUEST" || !currentUser?.id ? (
          <>
            <Sumary
              userId={currentUser?.id || ""}
              setLoadingChange={setLoadingChangeLocal}
              loadingChange={loadingChangeLocal}
            />
          </>
        ) : (
          <>
            <SumaryDb
              userId={currentUser?.id || ""}
              role={currentUser?.role || ""}
              setLoadingChange={setLoadingChangeData}
              loadingChange={loadingChangeData}
              setLoadingfetchData={setLoadingfetchData}
              loadingfetchData={loadingfetchData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
