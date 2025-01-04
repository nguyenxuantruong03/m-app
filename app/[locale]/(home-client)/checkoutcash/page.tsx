"use client";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import InfoProductPayment from "./components/info-product-payment";
import useCart from "@/hooks/client/use-cart";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import "./checkoutcash.css";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import InfoCustomer from "./components/info-customer";
import Delivery from "./components/delivery";
import useCartdb from "@/hooks/client/db/use-cart-db";
import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import { Order, Provinces } from "@/types/type";
import CryptoJS from "crypto-js";
import { Check, X } from "lucide-react";
import cuid from "cuid";
import InfoProductPaymentDb from "./components/db/info-product-payment-db";
import { PaymentSuccessCheckoutCashModal } from "@/components/(client)/modal/payment-success-checkoutCash";
import { useTranslations } from "next-intl";
interface ErrorMessages {
  gender?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  selectedProvince?: string;
  selectedDistrict?: string;
  selectedWard?: string;
  address?: string;
}

const CheckoutCash = () => {
  const t = useTranslations()
  const cart = useCart();
  const cartdb = useCartdb();
  const param = useParams();
  const user = useCurrentUser();
  const router = useRouter();
  //local
  const items = useCart((state) => state.items);
  //Database
  const itemsDb = useCartdb((state) => state.items);
  const [isMounted, setIsMounted] = useState(false);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [loadingChangeLocal, setLoadingChangeLocal] = useState(false);
  const [gender, setGender] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [selectedProvince, setSelectedProvince] = useState<Provinces | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<Provinces | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<Provinces | null>(null);
  const [address, setAddress] = useState("");
  const [addressOther, setAddressOther] = useState("");
  const [note, setNote] = useState("");
  //Check Error
  const [genderError, setGenderError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [selectedProvinceError, setSelectedProvinceError] = useState("");
  const [selectedDistrictError, setSelectedDistrictError] = useState("");
  const [selectedWardError, setSelectedWardError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [addressOtherError, setAddressOtherError] = useState("");
  const [noteError, setNoteError] = useState("");
  //BarProcess
  const [barProcess, setBarProcess] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Order | null>(null);

  //Total Coins
  useEffect(() => {
    if (user?.role !== "GUEST" && user?.id) {
      // Load totalCoins from the server using GET request
      axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
        setTotalCoins(response.data.totalCoins);
      });
    }
  }, []);

  useEffect(() => {
    if (loading || loadingChangeLocal ) {
      document.title = t("loading.loading");
    } else {
      document.title = t("cart.cashPayment");
    }
  }, [loading,loadingChangeLocal]);

  const handleBuyNow = () => {
    router.push("/home-product");
  };

  //Local
  const selectedItems = items.filter((item) =>
    cart.selectedItems.includes(item.cartId)
  );

  //Database
  const selectedItemsDb = itemsDb.filter((item) =>
    cartdb.selectedItems.includes(item.id)
  );

  // Check if selectedItems is empty "Local"
  const isNoneSelect = selectedItems.length === 0;

  // Check if selectedItemsDb is empty "Database"
  const isNoneSelectDb = selectedItemsDb.length === 0;

  const handleTrackProduct = () => {
    if (data?.id) {
      navigator.clipboard
        .writeText(data.id)
        .then(() => {
          toast.success(`${t("action.copiedToClipboard")}:${data.id}`);
        })
        .catch((error) => {
          toast.error(t("toastError.somethingWentWrong"));
        });
      // Navigate to /warehouse/package-product
      router.push("/warehouse/package-product");
    }
  };

  //-------Sort Sản phẩm ------------
  //Sort Item CartDb nếu quantity nào bằng 0 thì nằm cuối
  const sortItemCartDb = cartdb.items
    .filter((item) => cartdb.selectedItems.includes(item.id)) // Filter for selected items
    .sort((a, b) => {
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

      // Sort by quantity in descending order, keeping original order if quantities are equal
      return quantityB - quantityA;
    });

  //Sort Item Cart Local nếu quantity nào bằng 0 thì nằm cuối
  // Filter and Sort Item Cart Local nếu quantity nào bằng 0 thì nằm cuối và chỉ hiển thị các sản phẩm đã được chọn
  const sortItemCartLocal = cart.items
    .filter((item) => cart.selectedItems.includes(item.cartId)) // Filter for selected items
    .sort((a, b) => {
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

  //-----------------------Local----------------------
  const totalAmounts = selectedItems.reduce(
    (total, item) => {
      const itemInCart = items.find(
        (cartItem) => cartItem.cartId === item.cartId
      );
      const quantity = itemInCart?.quantity || 1;

      if (!itemInCart || !itemInCart) {
        // Nếu itemInCart hoặc itemInCart.product là undefined, bỏ qua item này
        toast.error(t("product.productNotFound"));
        return total;
      }
      //GetPrice dựa vào size
      const getPriceMatchColorandSize = () => {
        const { price: priceSize, percentpromotion: percentpromotionSize } =
          getSizePrice(itemInCart || "", itemInCart?.size);
        const { price: priceColor, percentpromotion: percentpromotionColor } =
          getColorPrice(itemInCart, itemInCart?.color);
        return Math.ceil(Math.max(priceSize, priceColor));
      };

      //GetPriceOld dựa vào color
      const getPriceOldMatchColorandSize = () => {
        const sizeOldPrice = getSizeOldPrice(itemInCart, itemInCart?.size);
        const colorOldPrice = getColorOldPrice(itemInCart, itemInCart?.color);
        return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
      };

      const itemTotalPrice = getPriceMatchColorandSize() * quantity;
      const itemTotalPriceOld = getPriceOldMatchColorandSize() * quantity;

      return {
        totalPrice: total.totalPrice + itemTotalPrice,
        totalPriceOld: total.totalPriceOld + itemTotalPriceOld,
      };
    },
    { totalPrice: 0, totalPriceOld: 0 }
  );
  // Tiền bảo hiểm
  const totalWarrantyAmount = selectedItems.reduce((total, item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    const quantity = itemInCart?.quantity || 1;

    const selectedWarranty = String(itemInCart?.warranty || "0");
    const warrantyAmount = selectedWarranty ? parseFloat(selectedWarranty) : 0;

    return total + warrantyAmount * quantity;
  }, 0);

  const totalAmount = totalAmounts.totalPrice + totalWarrantyAmount;

  // Tạo mảng riêng cho size và color và quantity
  //size
  const selectedSizes = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.size;
  });

  //color
  const selectedColors = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.color;
  });

  //quantity
  const selectedQuantities = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.quantity || 1;
  });
  //Dựa vào cartId lấy ra id của sản phẩm
  const selectedProductIds = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.id || 1;
  });

  // ----------------------Database---------------------------
  const totalAmountsDb = selectedItemsDb.reduce(
    (total, item) => {
      const itemInCart = itemsDb.find((cartItem) => cartItem.id === item.id);
      const quantity = itemInCart?.quantity || 1;

      if (!itemInCart || !itemInCart.product) {
        // Nếu itemInCart hoặc itemInCart.product là undefined, bỏ qua item này
        toast.error(t("product.productNotFound"));
        return total;
      }
      //GetPrice dựa vào size
      const getPriceMatchColorandSize = () => {
        const { price: priceSize, percentpromotion: percentpromotionSize } =
          getSizePrice(itemInCart?.product || "", itemInCart?.size);
        const { price: priceColor, percentpromotion: percentpromotionColor } =
          getColorPrice(itemInCart.product, itemInCart?.color);
        return Math.ceil(Math.max(priceSize, priceColor));
      };

      //GetPrice dựa vào color
      const getPriceOldMatchColorandSize = () => {
        const sizeOldPrice = getSizeOldPrice(
          itemInCart?.product,
          itemInCart?.size
        );
        const colorOldPrice = getColorOldPrice(
          itemInCart.product,
          itemInCart?.color
        );
        return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
      };

      const itemTotalPrice = getPriceMatchColorandSize() * quantity;
      const itemTotalPriceOld = getPriceOldMatchColorandSize() * quantity;

      return {
        totalPrice: total.totalPrice + itemTotalPrice,
        totalPriceOld: total.totalPriceOld + itemTotalPriceOld,
      };
    },
    { totalPrice: 0, totalPriceOld: 0 }
  );
  // Tiền bảo hiểm
  const totalWarrantyAmountDb = selectedItemsDb.reduce((total, item) => {
    const itemInCart = itemsDb.find((cartItem) => cartItem.id === item.id);
    const quantity = itemInCart?.quantity || 1;
    const selectedWarranty = String(itemInCart?.warranty || "0");

    const warrantyAmount = selectedWarranty ? parseFloat(selectedWarranty) : 0;

    return total + warrantyAmount * quantity;
  }, 0);

  const totalAmountDb = totalAmountsDb.totalPrice + totalWarrantyAmountDb;
  const TotalAmountCoins = Math.ceil(totalAmountDb - totalCoins);

  const totalAmountOldDb = totalAmountsDb.totalPriceOld + totalWarrantyAmountDb;
  const totalAmountOldCoin = Math.ceil(totalAmountOldDb - totalCoins);

  // Tạo mảng riêng cho size và color và quantity
  //size
  const selectedSizesDb = selectedItemsDb.map((item) => {
    const itemInCart = itemsDb.find((cartItem) => cartItem.id === item.id);
    return itemInCart?.size;
  });

  //color
  const selectedColorsDb = selectedItemsDb.map((item) => {
    const itemInCart = itemsDb.find((cartItem) => cartItem.id === item.id);
    return itemInCart?.color;
  });

  //quantity
  const selectedQuantitiesDb = selectedItemsDb.map((item) => {
    const itemInCart = itemsDb.find((cartItem) => cartItem.id === item.id);
    return itemInCart?.quantity || 1;
  });

  //Dựa vào cartItemId lấy ra id của sản phẩm
  const selectedProductIdsDb = selectedItemsDb.map((item) => {
    const itemInCart = itemsDb.find((cartItem) => cartItem.id === item.id);
    return itemInCart?.product.id || 1;
  });

  const fetchDataOrder = async (responseIdOrderCurrent: string) => {
    try {
      // Fetch the order data patch đây không phải là cập nhật mà nó là get bởi vì get ko thể trả dữ liệu về bên server nên phải dùng patch
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkoutcash`,
        { responseIdOrderCurrent: responseIdOrderCurrent }
      );

      // Extract the data from the response
      const orders = response.data;

      if (orders.id === responseIdOrderCurrent) {
        // If a matching order is found, update the state
        setData(orders);

        if (user?.role === "GUEST" && !user?.id) {
          await cart.removeSelectedItems();
        } else {
          await cartdb.removeSelectedItems(user?.id || "");
        }

        setOpen(true);
      } else {
        // If no matching order is found, show an error
        toast.error(t("toastError.somethingWentWrong"));
      }
    } catch (error) {
      // Handle error
      toast.error(t("toastError.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  //---------Submit----------
  const handleSubmitCheckoutCash = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setGenderError("");
    setEmailError("");
    setFullNameError("");
    setPhoneNumberError("");
    setSelectedProvinceError("");
    setSelectedDistrictError("");
    setSelectedWardError("");
    setAddressError("");
    setAddressOtherError("");
    setNoteError("");

    const errors: Partial<ErrorMessages> = {};

    // Common validations
    if (!gender) {
      errors.gender = t("info.selectGender");
    }

    if (!email) {
      errors.email = t("info.enterEmail");
    } else if (email.startsWith(" ")) {
      errors.email = t("info.noIndentation");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = t("info.invalidEmail");
    }

    if (!fullName) {
      errors.fullName = t("info.enterName");
    } else if (fullName.startsWith(" ")) {
      errors.fullName = t("info.noIndentation");
    }

    if (!phoneNumber) {
      errors.phoneNumber = t("info.enterPhoneNumber");
    }

    // Additional validations for non-pickup
    if (deliveryOption !== "pickup") {
      if (!selectedProvince?.value || !selectedProvince?.label) {
        errors.selectedProvince = t("info.selectProvince");
      }

      if (!selectedDistrict?.value || !selectedDistrict?.label) {
        errors.selectedDistrict = t("info.selectDistrict");
      }

      if (!selectedWard?.value || !selectedWard?.label) {
        errors.selectedWard = t("info.selectWard");
      }

      if (!address) {
        errors.address = t("info.enterAddress");
      }
    }

    if (Object.keys(errors).length > 0) {
      // Hiển thị tất cả các lỗi
      toast.error(t("info.incompleteInfo"));

      // Cập nhật state cho từng lỗi tương ứng
      setGenderError(errors.gender || "");
      setEmailError(errors.email || "");
      setFullNameError(errors.fullName || "");
      setPhoneNumberError(errors.phoneNumber || "");
      setSelectedProvinceError(errors.selectedProvince || "");
      setSelectedDistrictError(errors.selectedDistrict || "");
      setSelectedWardError(errors.selectedWard || "");
      setAddressError(errors.address || "");

      // Dừng thực hiện tiếp nếu có lỗi
      return;
    }

    // Tạo uuid ở đây thay thế id bên trong data bởi vì làm cách
    // này để bên client khi response nó sẽ response đúng id này
    const requestId = cuid(); // Tạo Cuid tạm thời

    const data = {
      email: email,
      fullname: fullName,
      phoneNumber: phoneNumber,
      gender: gender,
      address:
        deliveryOption === "pickup"
          ? "Trống"
          : `${selectedProvince?.label || "Không có"}, ${
              selectedDistrict?.label || "Không có"
            }, ${selectedWard?.label || "Không có"}, ${address || "Không có"}`,
      addressOther: addressOther || "Không có",
      note: note || "Không có",
      deliveryOption: deliveryOption,
      pricesales:
        user?.role === "GUEST" || !user?.id ? totalAmount : TotalAmountCoins,
      priceold:
        user?.role === "GUEST" || !user?.id
          ? totalAmounts.totalPriceOld
          : totalAmountOldCoin,
      productIds:
        user?.role === "GUEST" || !user?.id
          ? selectedProductIds
          : selectedProductIdsDb,
      sizes:
        user?.role === "GUEST" || !user?.id ? selectedSizes : selectedSizesDb,
      colors:
        user?.role === "GUEST" || !user?.id ? selectedColors : selectedColorsDb,
      quantities:
        user?.role === "GUEST" || !user?.id
          ? selectedQuantities
          : selectedQuantitiesDb,
      userId: user?.role === "GUEST" || !user?.id ? "" : user?.id,
      warranty:
        user?.role === "GUEST" || !user?.id
          ? totalWarrantyAmount
          : totalWarrantyAmountDb,
      requestId: requestId,
    };

    // Encrypt the data using AES
    const secretKey = process.env.NEXT_PUBLIC_CRYPTO_PAYMENTCASH_KEY; // Replace with your own secret key

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkoutcash`,
        {
          encryptedData,
        },
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total !== undefined) {
              const percentCompleted = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setBarProcess(percentCompleted);
            } else {
              toast.error(t("toastError.somethingWentWrong"));
            }
          },
        }
      );
      //Get dữ liệu ra
      fetchDataOrder(response.data.id);
    } catch (error) {
      setBarProcess(0);
      setLoading(false);
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(t("toastError.somethingWentWrong"));
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <PaymentSuccessCheckoutCashModal
        isOpen={open}
        data={data}
        loading={loading}
      />
      <form onSubmit={handleSubmitCheckoutCash}>
        <div className="mx-auto md:max-w-3xl lg:max-w-3xl">
          <div className="bg-gray-50 dark:bg-slate-600 rounded-md shadow-lg p-4 mt-32 mb-2 ">
            {/* Check Role hiển thị */}
            {user?.role === "GUEST" || !user?.id ? (
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
                      <p className="text-gray-500 dark:text-slate-200">
                        {t("cart.emptyCart")}
                      </p>
                    </div>
                    <div className="flex justify-center my-2">
                      <Button
                        onClick={handleBuyNow}
                        className="bg-red-500 text-white dark:text-slate-900"
                      >
                        {t("cart.buyNow")}
                      </Button>
                    </div>
                  </>
                )}

                <ul>
                  <p className="text-blue-500 font-bold">
                    {t("product.infoProduct")}
                  </p>

                  {sortItemCartLocal.map((item) => (
                    <InfoProductPayment
                      key={item.id}
                      data={item}
                      userId={user?.id || ""}
                      loadingChange={loadingChangeLocal}
                      setLoadingChange={setLoadingChangeLocal}
                    />
                  ))}
                </ul>

                <div className=" flex justify-between border-t border-gray-400 py-4">
                  <div>{t("product.estimatedTotal", {itemCount: sortItemCartLocal.length})} </div>
                  <Currency
                    value={totalAmount}
                    valueold={totalAmounts.totalPriceOld}
                  />
                </div>
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
                      <p className="text-gray-500 dark:text-slate-200">
                        {t("cart.emptyCart")}
                      </p>
                    </div>
                    <div className="flex justify-center my-2">
                      <Button
                        onClick={handleBuyNow}
                        className="bg-red-500 text-white dark:text-slate-900"
                      >
                        {t("cart.buyNow")}
                      </Button>
                    </div>
                  </>
                )}

                <ul>
                  <p className="text-blue-500 font-bold">
                    {t("product.infoProduct")}
                  </p>

                  {sortItemCartDb.map((item) => (
                    <InfoProductPaymentDb
                      key={item.id}
                      data={item}
                      userId={user?.id || ""}
                      loadingChange={loadingChangeLocal}
                      setLoadingChange={setLoadingChangeLocal}
                      loading={loading}
                    />
                  ))}
                </ul>

                <div className=" flex justify-between border-t border-gray-400 py-4">
                  <div>{t("product.estimatedTotal", {itemCount: sortItemCartDb.length})}</div>
                  <Currency
                    value={TotalAmountCoins}
                    valueold={totalAmountOldCoin}
                  />
                </div>
              </>
            )}
          </div>

          {/* InfoCustomer */}
          <>
            <InfoCustomer
              gender={gender}
              setGender={setGender}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              setGenderError={setGenderError}
              genderError={genderError}
              setPhoneNumberError={setPhoneNumberError}
              phoneNumberError={phoneNumberError}
              setFullNameError={setFullNameError}
              fullNameError={fullNameError}
              setEmailError={setEmailError}
              emailError={emailError}
              isNoneSelect={isNoneSelect}
              isNoneSelectDb={isNoneSelectDb}
              userRole={user?.role || ""}
              userId={user?.id || ""}
              loading={loading}
            />
          </>
          {/* Delivery */}
          <>
            <Delivery
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              selectedWard={selectedWard}
              setSelectedWard={setSelectedWard}
              address={address}
              setAddress={setAddress}
              addressOther={addressOther}
              setAddressOther={setAddressOther}
              note={note}
              setNote={setNote}
              setSelectedProvinceError={setSelectedProvinceError}
              selectedProvinceError={selectedProvinceError}
              setSelectedDistrictError={setSelectedDistrictError}
              selectedDistrictError={selectedDistrictError}
              setSelectedWardError={setSelectedWardError}
              selectedWardError={selectedWardError}
              setAddressError={setAddressError}
              addressError={addressError}
              setAddressOtherError={setAddressOtherError}
              addressOtherError={addressOtherError}
              setNoteError={setNoteError}
              noteError={noteError}
              isNoneSelect={isNoneSelect}
              isNoneSelectDb={isNoneSelectDb}
              userRole={user?.role || ""}
              userId={user?.id || ""}
              loading={loading}
            />
          </>
          {/* Process Bar when submit */}
          <>
            {barProcess === 100 ? (
              <>
                {loading ? (
                  <>
                    <Button
                      disabled={
                        loading || user?.role === "GUEST" || !user?.id
                          ? isNoneSelect
                          : isNoneSelectDb
                      }
                      onClick={handleTrackProduct}
                      className="w-full text-center bg-red-500 hover:bg-red-600 text-white rounded-md my-2 cursor-pointer"
                    >
                      <p className="h-12 flex justify-center items-center font-bold">
                        <X className="size-12 mr-2" />{" "}
                        <span>{t("loading.loading")}</span>
                      </p>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      disabled={
                        loading || user?.role === "GUEST" || !user?.id
                          ? isNoneSelect
                          : isNoneSelectDb
                      }
                      onClick={handleTrackProduct}
                      className="w-full text-center bg-green-500 hover:bg-green-600 text-white rounded-md my-2 cursor-pointer"
                    >
                      <p className="h-12 flex justify-center items-center font-bold">
                        <Check className="size-12 mr-2" />{" "}
                        <span>{t("toastSuccess.successUperCase")}</span>
                      </p>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                {barProcess === 0 && (
                  <div className="my-2">
                    <Button
                      className="w-full bg-red-500 text-white dark:text-slate-900"
                      type="submit"
                      disabled={
                        loading || user?.role === "GUEST" || !user?.id
                          ? isNoneSelect
                          : isNoneSelectDb
                      }
                    >
                      {t("order.order")}
                    </Button>
                  </div>
                )}

                {barProcess > 0 && (
                  <>
                    <p className="font-semibold text-slate-400 text-sm text-center my-2">
                      {t("loading.loadingPayment")}
                    </p>
                    <div className="progress-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${barProcess}%` }}
                      >
                        {barProcess}%
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        </div>
      </form>
    </>
  );
};

export default CheckoutCash;
