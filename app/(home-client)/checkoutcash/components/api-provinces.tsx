"use client";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import axios from "axios";
import Select from "react-select";
import "../checkoutcash.css";
import { Provinces } from "@/types/type";

interface DeliveryProps {
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
  isNoneSelect:boolean;
  isNoneSelectDb: boolean;
  userRole: string;
  userId: string;
  loading: boolean
}

const host = "https://provinces.open-api.vn/api/";
const ApiProvinces: React.FC<DeliveryProps> = ({
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
  loading
}) => {
  const [provinces, setProvinces] = useState<Provinces[]>([]);
  const [districts, setDistricts] = useState<Provinces[]>([]);
  const [wards, setWards] = useState<Provinces[]>([]);

  const callAPI = (api: string) => {
    return axios.get(api).then((response) => {
      const formattedProvinces = response.data.map((province: any) => ({
        value: province.code,
        label: province.name,
      }));
      setProvinces(formattedProvinces);
    });
  };

  useEffect(() => {
    callAPI(`${host}?depth=1`);
  }, []);

  const callApiDistrict = (api: string) => {
    return axios.get(api).then((response) => {
      const formattedDistricts = response.data.districts.map(
        (district: any) => ({
          value: district.code,
          label: district.name,
        })
      );
      setDistricts(formattedDistricts);
    });
  };

  const callApiWard = (api: string) => {
    return axios.get(api).then((response) => {
      const formattedWards = response.data.wards.map((ward: any) => ({
        value: ward.code,
        label: ward.name,
      }));
      setWards(formattedWards);
    });
  };

  useEffect(() => {
    if (selectedProvince) {
      callApiDistrict(`${host}p/${selectedProvince.value}?depth=2`);
      setSelectedDistrict(null); // Clear selected district when province changes
      setSelectedWard(null); // Clear selected ward when province changes
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      callApiWard(`${host}d/${selectedDistrict.value}?depth=2`);
      setSelectedWard(null); // Clear selected ward when district changes
    }
  }, [selectedDistrict]);

  const handleSelectChange = (
    setter: React.Dispatch<React.SetStateAction<Provinces | null>>,
    value: any,
    clearError: Dispatch<SetStateAction<string>>
  ) => {

    if (value) {
      clearError("");
    }
    setter(value);
  };
  
  const handleAdressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if(value){
      setAddressError("")
    }
    // Check if the length of the input exceeds 20 characters
    if (value.length > 120) {
      setAddressError("Không được nhập quá 120 ký tự!");
      return;
    }
    setAddress(value);
  };

  const handleAdressOtherChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if(value){
      setAddressOtherError("")
    }
    if (value.length > 120) {
      setAddressOtherError("Không được nhập quá 120 ký tự!");
      return;
    }
    setAddressOther(value);
  };

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if(value){
      setNoteError("")
    }
    if (value.length > 120) {
      setNoteError("Không được nhập quá 120 ký tự!");
      return;
    }
    setNote(value);
  };

  return (
    <div className="mx-auto p-4">
      <div className="mb-4">
        <label className={`block text-sm font-bold ${selectedProvinceError && "error-label"}`}>Chọn Thành phố <span className="text-red-500">*</span></label>
        <Select
          id="province"
          options={provinces}
          onChange={(value) => handleSelectChange(setSelectedProvince, value, setSelectedProvinceError)}
          value={selectedProvince}
          placeholder="Chọn thành phố"
          className="react-select-container"
          classNamePrefix="react-select"
          noOptionsMessage={() => "Không tìm thấy!"}
          isDisabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
          styles={{
            control: (base, state) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: state.isFocused
                  ? (isDarkMode ? "#0f172a" : base.backgroundColor)
                  : (isDarkMode ? "#0f172a" : "#ffffff"), // Nền tối cho dark, nền sáng cho light
                color: isDarkMode ? "#e2e8f0" : base.color, // Màu chữ sáng tối
                borderColor: isDarkMode ? "#4b5563" : base.borderColor, // Màu viền cho dark/light mode
              };
            },
            singleValue: (base) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                color: isDarkMode ? "#e2e8f0" : base.color, // Màu chữ của giá trị đã chọn
              };
            },
            menu: (base) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: isDarkMode ? "#0f172a" : "#ffffff", // Nền của menu
              };
            },
            option: (base, state) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: isDarkMode
                  ? (state.isSelected ? "#1e293b" : "#0f172a")
                  : (state.isSelected ? "#f0f0f0" : "#ffffff"), // Màu nền tùy chọn
                color: isDarkMode ? "#e2e8f0" : "#333", // Màu chữ
                "&:hover": {
                  backgroundColor: isDarkMode ? "#1e293b" : "#f0f0f0", // Màu nền khi hover
                },
                "&:active": {
                  backgroundColor: "#1e293b", // Màu nền khi được chọn
                },
              };
            },
          }}
        />
        {selectedProvinceError && (
          <p className="text-red-500">{selectedProvinceError}</p>
        )}
      </div>

      <div className="mb-4">
        <label className={`block text-sm font-bold ${selectedDistrictError && "error-label"}`}>Chọn Quận/Huyện <span className="text-red-500">*</span></label>
        <Select
          id="district"
          options={districts}
          onChange={(value) => handleSelectChange(setSelectedDistrict, value, setSelectedDistrictError)}
          value={selectedDistrict}
          placeholder="Chọn Quận/Huyện"
          className="react-select-container"
          classNamePrefix="react-select"
          isDisabled={loading || !selectedProvince || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
          noOptionsMessage={() => "Không tìm thấy!"}
          styles={{
            control: (base, state) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: state.isFocused
                  ? (isDarkMode ? "#0f172a" : base.backgroundColor)
                  : (isDarkMode ? "#0f172a" : "#ffffff"), // Nền tối cho dark, nền sáng cho light
                color: isDarkMode ? "#e2e8f0" : base.color, // Màu chữ sáng tối
                borderColor: isDarkMode ? "#4b5563" : base.borderColor, // Màu viền cho dark/light mode
              };
            },
            singleValue: (base) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                color: isDarkMode ? "#e2e8f0" : base.color, // Màu chữ của giá trị đã chọn
              };
            },
            menu: (base) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: isDarkMode ? "#0f172a" : "#ffffff", // Nền của menu
              };
            },
            option: (base, state) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: isDarkMode
                  ? (state.isSelected ? "#1e293b" : "#0f172a")
                  : (state.isSelected ? "#f0f0f0" : "#ffffff"), // Màu nền tùy chọn
                color: isDarkMode ? "#e2e8f0" : "#333", // Màu chữ
                "&:hover": {
                  backgroundColor: isDarkMode ? "#1e293b" : "#f0f0f0", // Màu nền khi hover
                },
                "&:active": {
                  backgroundColor: "#1e293b", // Màu nền khi được chọn
                },
              };
            },
          }}
        />
        {selectedDistrictError && (
          <p className="text-red-500">{selectedDistrictError}</p>
        )}
      </div>

      <div className="mb-4">
        <label className={`block text-sm font-bold ${selectedWardError && "error-label"}`}>Chọn Phường Xã <span className="text-red-500">*</span></label>
        <Select
          id="ward"
          options={wards}
          onChange={(value) => handleSelectChange(setSelectedWard, value, setSelectedWardError)}
          value={selectedWard}
          placeholder="Chọn Phường/Xã"
          className="react-select-container"
          classNamePrefix="react-select"
          isDisabled={loading || !selectedDistrict || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
          noOptionsMessage={() => "Không tìm thấy!"}
          styles={{
            control: (base, state) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: state.isFocused
                  ? (isDarkMode ? "#0f172a" : base.backgroundColor)
                  : (isDarkMode ? "#0f172a" : "#ffffff"), // Nền tối cho dark, nền sáng cho light
                color: isDarkMode ? "#e2e8f0" : base.color, // Màu chữ sáng tối
                borderColor: isDarkMode ? "#4b5563" : base.borderColor, // Màu viền cho dark/light mode
              };
            },
            singleValue: (base) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                color: isDarkMode ? "#e2e8f0" : base.color, // Màu chữ của giá trị đã chọn
              };
            },
            menu: (base) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: isDarkMode ? "#0f172a" : "#ffffff", // Nền của menu
              };
            },
            option: (base, state) => {
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
              return {
                ...base,
                backgroundColor: isDarkMode
                  ? (state.isSelected ? "#1e293b" : "#0f172a")
                  : (state.isSelected ? "#f0f0f0" : "#ffffff"), // Màu nền tùy chọn
                color: isDarkMode ? "#e2e8f0" : "#333", // Màu chữ
                "&:hover": {
                  backgroundColor: isDarkMode ? "#1e293b" : "#f0f0f0", // Màu nền khi hover
                },
                "&:active": {
                  backgroundColor: "#1e293b", // Màu nền khi được chọn
                },
              };
            },
          }}
        />
        {selectedWardError && (
          <p className="text-red-500">{selectedWardError}</p>
        )}
      </div>

      <div className="flex items-center">
        <div className="lg:px-8">
          <div className="field field_v3">
            <label className="ha-screen-reader">Địa chỉ <span className="text-red-500">*</span></label>
            <input
              className="field__input"
              placeholder="Vd: 4xx Lê Văn Q*"
              value={address}
              onChange={handleAdressChange}
              disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className={`field__label  ${addressError && "error-label"}`}>Địa chỉ <span className="text-red-500">*</span></span>
            </span>
          </div>
          {addressError && <p className="text-red-500 ">{addressError}</p>}
        </div>

        <div className="lg:px-8">
          <div className="field field_v3">
            <label className="ha-screen-reader ">Địa chỉ khác</label>
            <input
              className="field__input"
              placeholder="Vd: 4xx Lê Văn Q*"
              value={addressOther}
              onChange={handleAdressOtherChange}
              disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className={`field__label  ${addressOtherError && "error-label"}`}>Địa chỉ khác</span>
            </span>
          </div>
          {addressOtherError && (
            <p className="text-red-500 ">{addressOtherError}</p>
          )}
        </div>

        <div className="ml-2 py-2 lg:px-8">
          <div className="field field_v3">
            <label className="ha-screen-reader ">Ghi chú</label>
            <input
              className="field__input"
              placeholder="Vd: Note thêm địa chỉ mới hoặc số điện thoại mới."
              value={note}
              onChange={handleNoteChange}
              disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className={`field__label  ${noteError && "error-label"}`}>Ghi chú</span>
            </span>
          </div>
          {noteError && <p className="text-red-500 ">{noteError}</p>}
        </div>
      </div>
    </div>
  );
};

export default ApiProvinces;
