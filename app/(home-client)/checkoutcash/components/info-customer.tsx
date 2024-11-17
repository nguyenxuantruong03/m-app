"use client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import "../checkoutcash.css";

interface InfoCustomerProps {
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  genderError: string;
  setGenderError: Dispatch<SetStateAction<string>>;
  phoneNumberError: string;
  setPhoneNumberError: Dispatch<SetStateAction<string>>;
  fullNameError: string;
  setFullNameError: Dispatch<SetStateAction<string>>;
  emailError: string;
  setEmailError: Dispatch<SetStateAction<string>>;
  isNoneSelect: boolean;
  isNoneSelectDb: boolean;
  userRole: string;
  userId: string;
  loading: boolean
}

const InfoCustomer: React.FC<InfoCustomerProps> = ({
  gender,
  setGender,
  phoneNumber,
  setPhoneNumber,
  fullName,
  setFullName,
  email,
  setEmail,
  genderError,
  setGenderError,
  phoneNumberError,
  fullNameError,
  setEmailError,
  emailError,
  setPhoneNumberError,
  setFullNameError,
  isNoneSelect,
  isNoneSelectDb,
  userRole,
  userId,
  loading
}) => {
  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    if(value){
      setPhoneNumberError("")
    }
    
    
    // Check if the input is numeric
    if (!/^\d+$/.test(value)) {
      setPhoneNumberError("Vui lòng chỉ nhập số!");
      return;
    }
    
    // Kiểm tra số đầu tiên là số 0
    if (value.length === 1 && value !== "0") {
     setPhoneNumberError("Hãy nhập 0 trước!");
     return;
   }
    
    // Giới hạn độ dài của số điện thoại không quá 11 số
    const limitedPhoneNumber = value.slice(0, 11);

    // Cập nhật giá trị số điện thoại trong state và reset lỗi
    setPhoneNumber(limitedPhoneNumber);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedGender = event.target.value;
    if(selectedGender){
      setGenderError("")
    }
    setGender(selectedGender);
  };

  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if(value){
      setFullNameError("")
    }

    // Check if the length of the input exceeds 20 characters
    if (value.length > 20) {
      setFullNameError("Không được nhập quá 20 ký tự!");
      return;
    }

    // Check if the input starts with a space
    if (value.startsWith(" ")) {
      setFullNameError("Không được space!");
      return;
    }

    // Set the full name and reset the error
    setFullName(value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if(value){
      setEmailError("")
    }

    // Check if the length of the input exceeds 20 characters
    if (value.length > 64) {
      setFullNameError("Không được nhập quá 64 ký tự!");
      return;
    }

    // Check if the input starts with a space
    if (value.startsWith(" ")) {
      setEmailError("Không được cách đầu dòng");
      return;
    }
    // Set the email and reset the error
    // Email validation
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      value
    );

    if (!isValidEmail) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-600 rounded-md shadow-lg p-4 mb-2">
      <h1 className="font-bold text-blue-500">Thông tin khách hàng <span className="text-red-500">*</span></h1>
      <div className="flex mt-4 items-center pl-[30px]">
        <div>
          <input
            type="radio"
            id="male"
            value="male"
            checked={gender === "male"}
            onChange={handleRadioChange}
            required
            disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
          />
          <label htmlFor="male" className={`ml-2 ${genderError && "error-label"}`}>
            Nam
          </label>
        </div>
        <div className="ml-4">
          <input
            type="radio"
            id="female"
            value="female"
            checked={gender === "female"}
            onChange={handleRadioChange}
            required
            disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
          />
          <label
            htmlFor="female"
            className={`ml-2 ${genderError && "error-label"}`}
          >
            Nữ
          </label>
        </div>

        <div className="ml-4">
          <input
            type="radio"
            id="other"
            value="other"
            checked={gender === "other"}
            onChange={handleRadioChange}
            required
            disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
          />
          <label
            htmlFor="other"
            className={`ml-2 ${genderError && "error-label"}`}
          >
            Khác
          </label>
        </div>
      </div>
      {genderError && <p className="text-red-500">{genderError}</p>}

      <div className="grid grid-rows-3 md:flex mt-2 items-center">
        <div className="lg:px-8">
          <div className="field field_v3">
            <label className="ha-screen-reader">Email <span className="text-red-500">*</span></label>
            <input
              className="field__input "
              placeholder="Ví dụ :truong@gmail.com"
              value={email}
              onChange={handleEmailChange}
              type="email"
              disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className={`field__label ${emailError && "error-label"}`}>
                Email <span className="text-red-500">*</span>
              </span>
            </span>
          </div>
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>

        <div className="lg:px-8 md:ml-2 py-2">
          <div className="field field_v3">
            <label className="ha-screen-reader">Họ và tên <span className="text-red-500">*</span></label>
            <input
              className="field__input"
              placeholder="Ví dụ : Nguyen Van A"
              value={fullName}
              onChange={handleFullNameChange}
              disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className={`field__label ${fullNameError && "error-label"}`}>
                Họ và tên <span className="text-red-500">*</span>
              </span>
            </span>
          </div>
          {fullNameError && <p className="text-red-500">{fullNameError}</p>}
        </div>

        <div className="md:ml-2 py-2 lg:px-8">
          <div className="field field_v3">
            <label className="ha-screen-reader">Số điện thoại <span className="text-red-500">*</span></label>
            <input
              type="tel"
              className="field__input "
              placeholder="Ví dụ :0912385***"
              value={phoneNumber}
              pattern="0[0-9]{9,10}"
              onChange={handlePhoneNumberChange}
              disabled={loading || (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className={`field__label ${phoneNumberError && "error-label"}`}>
                Số điện thoại <span className="text-red-500">*</span>
              </span>
            </span>
          </div>
          {phoneNumberError && (
            <p className="text-red-500">{phoneNumberError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCustomer;
