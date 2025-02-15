"use client";
import { useTranslations } from "next-intl";
import Select, { MultiValue, StylesConfig } from "react-select";

type Option = {
  value: string;
  label: string;
};

type DayColors = {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
};

interface MutipleOptionProps {
  selectedOption: Option[];
  setSelectedOption: React.Dispatch<React.SetStateAction<Option[]>>;
  field: {
    onChange: (value: string | string[]) => void; // Chỉnh sửa kiểu dữ liệu của giá trị nhận vào là string hoặc mảng string
    value: string | string[];
  };
  disabled?: boolean;
}

const MutipleOption: React.FC<MutipleOptionProps> = ({
  selectedOption,
  setSelectedOption,
  field,
  disabled,
}) => {
  const t = useTranslations()

  const options: Option[] = [
    { value: "Monday", label: t("managestaff.form.Monday") },
    { value: "Tuesday", label: t("managestaff.form.Tuesday") },
    { value: "Wednesday", label: t("managestaff.form.Wednesday") },
    { value: "Thursday", label: t("managestaff.form.Thursday") },
    { value: "Friday", label: t("managestaff.form.Friday") },
    { value: "Saturday", label: t("managestaff.form.Saturday") },
    { value: "Sunday", label: t("managestaff.form.Sunday") },
  ];

  // Define the custom styles using strongly typed StylesConfig
  const customStyles: StylesConfig<Option, true> = {
    option: (provided, state) => {
      const dayColors: DayColors = {
        Monday: "#FFA500",
        Tuesday: "#DEB887",
        Wednesday: "#008000",
        Thursday: "#0ea5e9",
        Friday: "#800080",
        Saturday: "#008080",
        Sunday: "#FF0000",
      };

      const backgroundColors: Record<string, string> = {
        Monday: "rgba(255, 165, 0, 0.1)",
        Tuesday: "rgba(222, 184, 135, 0.1)",
        Wednesday: "rgba(0, 128, 0, 0.1)",
        Thursday: "rgba(14, 165, 233, 0.1)",
        Friday: "rgba(128, 0, 128, 0.1)",
        Saturday: "rgba(0, 128, 128, 0.1)",
        Sunday: "rgba(255, 0, 0, 0.1)",
      };

      const value = state.data.value;

      return {
        ...provided,
        backgroundColor: "transparent",
        color: dayColors[value as keyof DayColors],
        "&:hover": {
          backgroundColor: backgroundColors[value],
        },
      };
    },
    // Custom styles for multiValueLabel
    multiValueLabel: (provided, state) => {
      const dayColors: DayColors = {
        Monday: "#FFA500",
        Tuesday: "#DEB887",
        Wednesday: "#008000",
        Thursday: "#0ea5e9",
        Friday: "#800080",
        Saturday: "#008080",
        Sunday: "#FF0000",
      };

      const backgroundColors: Record<string, string> = {
        Monday: "rgba(255, 165, 0, 0.1)",
        Tuesday: "rgba(222, 184, 135, 0.1)",
        Wednesday: "rgba(0, 128, 0, 0.1)",
        Thursday: "rgba(14, 165, 233, 0.1)",
        Friday: "rgba(128, 0, 128, 0.1)",
        Saturday: "rgba(0, 128, 128, 0.1)",
        Sunday: "rgba(255, 0, 0, 0.1)",
      };

      const value = state.data.value;

      return {
        ...provided,
        color: dayColors[value as keyof DayColors],
        backgroundColor: backgroundColors[value],
      };
    },
    multiValueRemove: (provided, state) => ({
      ...provided,
      ":hover": {
        backgroundColor: "#f87171",
        color: "#ffffff",
      },
    }),
    multiValue: (provided, state) => {
      const backgroundColors: Record<string, string> = {
        Monday: "rgba(255, 165, 0, 0.1)",
        Tuesday: "rgba(222, 184, 135, 0.1)",
        Wednesday: "rgba(0, 128, 0, 0.1)",
        Thursday: "rgba(14, 165, 233, 0.1)",
        Friday: "rgba(128, 0, 128, 0.1)",
        Saturday: "rgba(0, 128, 128, 0.1)",
        Sunday: "rgba(255, 0, 0, 0.1)",
      };
      const value = state.data.value;
      return {
        ...provided,
        backgroundColor: backgroundColors[value],
      };
    },
    control: (provided) => ({
      ...provided,
      backgroundColor: "#0f172a",
      border: "1px solid #1f2937",
      borderRadius: "8px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0f172a",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999999",
    }),
  };

  // Handling change and sorting of options
  const handleChange = (selectedOption: MultiValue<Option>) => {
    // Handling logic based on "All" or "None" options
    if (selectedOption && selectedOption.length > 0) {
      const isAllSelected = selectedOption.some(
        (option) => option.value === "All"
      );
      const isNoneSelected = selectedOption.some(
        (option) => option.value === "None"
      );

      if (isAllSelected) {
        setSelectedOption(options);
        field.onChange(options.map((option) => option.value));
      } else if (isNoneSelected) {
        setSelectedOption([]);
        field.onChange([]);
      } else {
        const sortedSelectedOption = sortDaysOfWeek(selectedOption as Option[]);
        setSelectedOption(sortedSelectedOption);
        field.onChange(sortedSelectedOption.map((option) => option.value));
      }
    } else {
      setSelectedOption([]);
      field.onChange([]);
    }
  };

  // Additional sorting function
  const sortDaysOfWeek = (selectedOption: Option[]): Option[] => {
    const dayOrder: Record<string, number> = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };

    return selectedOption.sort((a, b) => dayOrder[a.value] - dayOrder[b.value]);
  };

  const selectAllOption: Option = { value: "All", label: t("managestaff.form.all") };
  const selectNoneOption: Option = { value: "None", label: t("managestaff.form.deselectall") };

  return (
    <Select
      options={[selectAllOption, selectNoneOption, ...options]}
      value={selectedOption}
      onChange={handleChange}
      isMulti
      styles={customStyles}
      isSearchable={false}
      getOptionLabel={(option: Option) => option.label}
      menuPlacement="top"
      isDisabled={disabled}
    />
  );
};

export default MutipleOption;
