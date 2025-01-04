"use client";
import { Dispatch, SetStateAction } from "react";
import ApiProvinces from "./api-provinces";
import { Provinces } from "@/types/type";
import { useTranslations } from "next-intl";
type DeliveryOption = "delivery" | "pickup";

interface DeliveryProps {
  deliveryOption: string;
  setDeliveryOption: Dispatch<SetStateAction<string>>;
  selectedProvince: Provinces | null;
  setSelectedProvince: Dispatch<SetStateAction<Provinces | null>>;
  selectedDistrict: Provinces | null;
  setSelectedDistrict: Dispatch<SetStateAction<Provinces | null>>;
  selectedWard: Provinces | null;
  setSelectedWard: Dispatch<SetStateAction<Provinces | null>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  addressOther: string;
  setAddressOther: Dispatch<SetStateAction<string>>;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  setSelectedProvinceError: Dispatch<SetStateAction<string>>;
  selectedProvinceError: string;
  setSelectedDistrictError: Dispatch<SetStateAction<string>>;
  selectedDistrictError: string;
  setSelectedWardError: Dispatch<SetStateAction<string>>;
  selectedWardError: string;
  setAddressError: Dispatch<SetStateAction<string>>;
  addressError: string;
  setAddressOtherError: Dispatch<SetStateAction<string>>;
  addressOtherError: string;
  setNoteError: Dispatch<SetStateAction<string>>;
  noteError: string;
  isNoneSelect: boolean;
  isNoneSelectDb: boolean;
  userRole: string;
  userId: string;
  loading: boolean;
}
const Delivery: React.FC<DeliveryProps> = ({
  deliveryOption,
  setDeliveryOption,
  selectedProvince,
  setSelectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  selectedWard,
  setSelectedWard,
  address,
  setAddress,
  addressOther,
  setAddressOther,
  note,
  setNote,
  setSelectedProvinceError,
  selectedProvinceError,
  setSelectedDistrictError,
  selectedDistrictError,
  setSelectedWardError,
  selectedWardError,
  setAddressError,
  addressError,
  setAddressOtherError,
  addressOtherError,
  setNoteError,
  noteError,
  isNoneSelect,
  isNoneSelectDb,
  userRole,
  userId,
  loading,
}) => {
  const t = useTranslations()

  const handleOptionChange = (option: DeliveryOption) => {
    setDeliveryOption(option);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-600 rounded-md shadow-lg p-4 mb-2">
      <h1 className="font-bold text-blue-500">{t("info.deliveryMethod")}</h1>
      <div className="flex mt-4 items-center">
        <div>
          <input
            type="radio"
            id="delivery"
            name="deliveryOption"
            value="delivery"
            checked={deliveryOption === "delivery"}
            onChange={() => handleOptionChange("delivery")}
            required
            disabled={
              loading ||
              (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)
            }
          />
          <label htmlFor="male" className="ml-2">
            {t("info.homeDelivery")}
          </label>
        </div>
        <div className="ml-4">
          <input
            type="radio"
            id="pickup"
            name="deliveryOption"
            value="pickup"
            checked={deliveryOption === "pickup"}
            onChange={() => handleOptionChange("pickup")}
            required
            disabled={
              loading ||
              (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)
            }
          />
          <label htmlFor="female" className="ml-2">
            {t("info.storePickup")}
          </label>
        </div>
      </div>
      {deliveryOption === "delivery" && (
        <ApiProvinces
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
          userRole={userRole}
          userId={userId}
          loading={loading}
        />
      )}
      {deliveryOption === "pickup" && (
        <div className="">
          <p className="p-4 font-bold text-xl">{t("info.pickupLocation")}</p>
          <p className=" px-4 text-red-500 font-bold text-xl">
            {" "}
            {t("info.phoneNumber")}: 0352261103
          </p>
        </div>
      )}
    </div>
  );
};

export default Delivery;
