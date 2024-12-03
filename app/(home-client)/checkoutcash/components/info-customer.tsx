"use client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import "../checkoutcash.css";
import {
  getCustomerInfoMessage,
  getEnterZeroFirstMessage,
  getFullNameMessage,
  getGenderFemaleMessage,
  getGenderMaleMessage,
  getGenderOtherMessage,
  getInvalidEmailMessage,
  getMaxCharacterMessage,
  getNoIndentationMessage,
  getOnlyNumbersMessage,
  getPhoneNumberMessage,
} from "@/translate/translate-client";

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
  loading: boolean;
  language: string;
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
  loading,
  language,
}) => {
  //language
  const onlyNumbersMessage = getOnlyNumbersMessage(language);
  const enterZoroFirstMessage = getEnterZeroFirstMessage(language);
  const maxCharacter20Message = getMaxCharacterMessage(language, 20);
  const maxCharacter64Message = getMaxCharacterMessage(language, 64);
  const noIdentationMessage = getNoIndentationMessage(language);
  const invalidEmailMessage = getInvalidEmailMessage(language);
  const customerInfoMessage = getCustomerInfoMessage(language);
  const genderMaleMessage = getGenderMaleMessage(language);
  const genderFemaleMessage = getGenderFemaleMessage(language);
  const genderOtherMessage = getGenderOtherMessage(language);
  const fullnameMessage = getFullNameMessage(language);
  const phoneNumberMessage = getPhoneNumberMessage(language);

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      setPhoneNumberError("");
    }

    // Check if the input is numeric
    if (!/^\d+$/.test(value)) {
      setPhoneNumberError(onlyNumbersMessage);
      return;
    }

    // Kiểm tra số đầu tiên là số 0
    if (value.length === 1 && value !== "0") {
      setPhoneNumberError(enterZoroFirstMessage);
      return;
    }

    // Giới hạn độ dài của {phoneNumberMessage} không quá 11 số
    const limitedPhoneNumber = value.slice(0, 11);

    // Cập nhật giá trị {phoneNumberMessage} trong state và reset lỗi
    setPhoneNumber(limitedPhoneNumber);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedGender = event.target.value;
    if (selectedGender) {
      setGenderError("");
    }
    setGender(selectedGender);
  };

  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      setFullNameError("");
    }

    // Check if the length of the input exceeds 20 characters
    if (value.length > 20) {
      setFullNameError(maxCharacter20Message);
      return;
    }

    // Check if the input starts with a space
    if (value.startsWith(" ")) {
      setFullNameError(noIdentationMessage);
      return;
    }

    // Set the full name and reset the error
    setFullName(value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      setEmailError("");
    }

    // Check if the length of the input exceeds 20 characters
    if (value.length > 64) {
      setFullNameError(maxCharacter64Message);
      return;
    }

    // Check if the input starts with a space
    if (value.startsWith(" ")) {
      setEmailError(noIdentationMessage);
      return;
    }
    // Set the email and reset the error
    // Email validation
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      value
    );

    if (!isValidEmail) {
      setEmailError(invalidEmailMessage);
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-600 rounded-md shadow-lg p-4 mb-2">
      <h1 className="font-bold text-blue-500">
        {customerInfoMessage}
        <span className="text-red-500">*</span>
      </h1>
      <div className="flex mt-4 items-center pl-[30px]">
        <div>
          <input
            type="radio"
            id="male"
            value="male"
            checked={gender === "male"}
            onChange={handleRadioChange}
            required
            disabled={
              loading ||
              (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)
            }
          />
          <label
            htmlFor="male"
            className={`ml-2 ${genderError && "error-label"}`}
          >
            {genderMaleMessage}
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
            disabled={
              loading ||
              (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)
            }
          />
          <label
            htmlFor="female"
            className={`ml-2 ${genderError && "error-label"}`}
          >
            {genderFemaleMessage}
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
            disabled={
              loading ||
              (userRole === "GUEST" || !userId ? isNoneSelect : isNoneSelectDb)
            }
          />
          <label
            htmlFor="other"
            className={`ml-2 ${genderError && "error-label"}`}
          >
            {genderOtherMessage}
          </label>
        </div>
      </div>
      {genderError && <p className="text-red-500">{genderError}</p>}

      <div className="grid grid-rows-3 md:flex mt-2 items-center">
        <div className="lg:px-8">
          <div className="field field_v3">
            <label className="ha-screen-reader">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="field__input "
              placeholder="truong@gmail.com"
              value={email}
              onChange={handleEmailChange}
              type="email"
              disabled={
                loading ||
                (userRole === "GUEST" || !userId
                  ? isNoneSelect
                  : isNoneSelectDb)
              }
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
            <label className="ha-screen-reader">
              {fullnameMessage} <span className="text-red-500">*</span>
            </label>
            <input
              className="field__input"
              placeholder="Nguyen Van A"
              value={fullName}
              onChange={handleFullNameChange}
              disabled={
                loading ||
                (userRole === "GUEST" || !userId
                  ? isNoneSelect
                  : isNoneSelectDb)
              }
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span
                className={`field__label ${fullNameError && "error-label"}`}
              >
                {fullnameMessage} <span className="text-red-500">*</span>
              </span>
            </span>
          </div>
          {fullNameError && <p className="text-red-500">{fullNameError}</p>}
        </div>

        <div className="md:ml-2 py-2 lg:px-8">
          <div className="field field_v3">
            <label className="ha-screen-reader">
              {phoneNumberMessage} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              className="field__input "
              placeholder="0912385***"
              value={phoneNumber}
              pattern="0[0-9]{9,10}"
              onChange={handlePhoneNumberChange}
              disabled={
                loading ||
                (userRole === "GUEST" || !userId
                  ? isNoneSelect
                  : isNoneSelectDb)
              }
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span
                className={`field__label ${phoneNumberError && "error-label"}`}
              >
                {phoneNumberMessage} <span className="text-red-500">*</span>
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
