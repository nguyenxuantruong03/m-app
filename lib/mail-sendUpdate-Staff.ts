import { format } from "date-fns";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

type FieldValue =
  | string
  | number
  | boolean
  | string[]
  | Date
  | {
      id: string;
      userId: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  | null;
interface ChangeRecord {
  oldValue: FieldValue;
  newValue: FieldValue;
}
type Changes = {
  [key: string]: ChangeRecord;
};

export const sendUpdateManageStaff = async (
  email: string | null | undefined,
  name: string | null | undefined,
  phonenumber: string | null | undefined,
  numberCCCD: string | null | undefined,
  gender: string | null | undefined,
  issued: string | null | undefined,
  degree: string | null | undefined,
  workingTime: string | null | undefined,
  timestartwork: string | null | undefined,
  maritalStatus: string | null | undefined,
  daywork: string[],
  urlimageCheckAttendance: string | null | undefined,
  codeNFC: string | null | undefined,
  dateofbirth: Date | null | undefined,
  dateRange: Date | null | undefined,
  isCitizen: boolean | null | undefined,
  changes: Changes
) => {
  const degreeMappings = {
    None: "Không xác định",
    Elementary: "Tiểu học",
    JuniorHighSchool: "Trung học",
    HighSchool: "Trung học phổ thông",
    JuniorColleges: "Cao đẳng",
    University: "Đại học",
    MastersDegree: "Thạc sĩ",
  };

  const maritalStatusMappings = {
    None: "Không xác định",
    Single: "Độc thân",
    Married: "Kết hôn",
    Separated: "Ly hôn",
    Remarried: "Tái hôn",
  };

  const wokingTimeMappings = {
    None: "Không xác định",
    Parttime4h: "4 tiếng",
    Parttime8h: "8 tiếng",
    Fulltime: "Cả ngày",
    SeasonalJob: "Thời vụ",
  };

  const genderMappings = {
    None: "Không xác định",
    Male: "Nam",
    Female: "Nữ",
  };

  // Biến đổi trình độ học vấn, giới tính và thời gian làm việc sang tiếng Việt
  const degreeVi = degree
    ? degreeMappings[degree as keyof typeof degreeMappings]
    : "";
  const genderVi = gender
    ? genderMappings[gender as keyof typeof genderMappings]
    : "";
  const workingTimeVi = workingTime
    ? wokingTimeMappings[workingTime as keyof typeof wokingTimeMappings]
    : "";
  const maritalStatusVi = maritalStatus
    ? maritalStatusMappings[maritalStatus as keyof typeof maritalStatusMappings]
    : "";

  // Tạo map các ngày trong tuần sang tiếng Việt
  const dayOfWeekMapping: Record<string, string> = {
    Monday: "Thứ 2",
    Tuesday: "Thứ 3",
    Wednesday: "Thứ 4",
    Thursday: "Thứ 5",
    Friday: "Thứ 6",
    Saturday: "Thứ 7",
    Sunday: "Chủ Nhật",
  };

  const dayworkstart = daywork
    .filter((day): day is keyof typeof dayOfWeekMapping =>
      Object.prototype.hasOwnProperty.call(dayOfWeekMapping, day)
    )
    .map((day) => dayOfWeekMapping[day as keyof typeof dayOfWeekMapping])
    .join(", ");

  if (email) {
    let urlCheckMsg = "";
    let nfcMsg = "";

    if (urlimageCheckAttendance) {
      urlCheckMsg = "Bạn đã có";
    } else {
      urlCheckMsg = "Bạn chưa có";
    }

    if (codeNFC) {
      nfcMsg = "Bạn đã có";
    } else {
      nfcMsg = "Bạn chưa có";
    }

    let isCitizenMsg = "";
    if (isCitizen !== null && isCitizen !== undefined) {
      isCitizenMsg = isCitizen
        ? "Bạn đã được xác nhận đầy đủ thông tin."
        : "Bạn chưa gửi đầy đủ thông tin cho quản lý.";
    } else {
      isCitizenMsg = "Tài khoản chưa được xác nhận đầy đủ thông tin.";
    }

    const dateofbirthformat = dateofbirth
      ? format(dateofbirth, "dd/MM/yyyy")
      : "";

    const dateRangeformat = dateRange ? format(dateRange, "dd/MM/yyyy") : "";

    // Function to format changed fields
    const formatChangedFields = (changes: Changes) => {
      let formattedContent = "";
      const orderedFields = [
        "name",
        "phonenumber",
        "numberCCCD",
        "gender",
        "issued",
        "degree",
        "workingTime",
        "maritalStatus",
        "timestartwork",
        "daywork",
      ];

      for (const field of orderedFields) {
        if (changes.hasOwnProperty(field)) {
          const { oldValue, newValue } = changes[field];
          const oldValueString =
            typeof oldValue === "object" && oldValue !== null
              ? JSON.stringify(oldValue)
              : oldValue;
          const newValueString =
            typeof newValue === "object" && newValue !== null
              ? JSON.stringify(newValue)
              : newValue;
          let translatedField = field;
          // Translate field names to Vietnamese
          switch (field) {
            case "name":
              translatedField = "Tên";
              break;
            case "phonenumber":
              translatedField = "Số điện thoại";
              break;
            case "numberCCCD":
              translatedField = "Số CMND";
              break;
            case "gender":
              translatedField = "Giới tính";
              break;
            case "issued":
              translatedField = "Cấp ở";
              break;
            case "degree":
              translatedField = "Bằng cấp";
              break;
            case "workingTime":
              translatedField = "Khoảng thời gian làm việc";
              break;
            case "timestartwork":
              translatedField = "Thời gian bắt đầu làm việc";
              break;
            case "maritalStatus":
              translatedField = "Tình trạng hôn nhân";
              break;
            case "daywork":
              translatedField = "Ngày làm việc";
              // Special handling for arrays
              if (Array.isArray(newValue)) {
                const formattedDaywork = (newValue as string[])
                .filter((day) => typeof day === "string" && dayOfWeekMapping.hasOwnProperty(day))
                .map((day) => dayOfWeekMapping[day])
                .join(", ");
                formattedContent += `<p>${translatedField}: <span style="color: #ef4444; font-weight:800;">${formattedDaywork}</span></p>`;
                continue; // Skip remaining processing for daywork
              }
              break;
          }
          // Add formatted content for non-array fields
          formattedContent += `<p>${translatedField}: `;
          if (typeof oldValue === "object" || typeof newValue === "object") {
            formattedContent += `<span style="color: red;">${newValueString}</span>`;
          } else {
            formattedContent += `<span style="text-decoration: line-through; color: #6b7280;">${oldValueString}</span> → <span style="color: #ef4444; font-weight:800;">${newValueString}</span>`;
          }
          formattedContent += "</p>";
        }
      }
      return formattedContent;
    };

    const changedFieldsContent = formatChangedFields(changes);

    // Gửi email
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Cập nhật thông tin nhân viên",
      html: `
      <p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>!</p>
<p>Thông tin của <strong>${name}</strong>.</p>
<p>Số điện thoại: <strong>${phonenumber}</strong>.</p>
<p>Số căn cước công dân: <strong>${numberCCCD}</strong>.</p>
<p>Ngày sinh: <strong>${dateofbirthformat}</strong>.</p>
<p>Ngày hết hạn: <strong>${dateRangeformat}</strong>.</p>
<p>Giới tính: <strong>${genderVi}</strong>.</p>
<p>Cấp ở: <strong>${issued}</strong>.</p>
<p>Trình độ học vấn: <strong>${degreeVi}</strong>.</p>
<p>Thời gian làm việc: <strong>${workingTimeVi}</strong>.</p>
<p>Thời gian bắt đầu làm việc: <strong>${timestartwork}</strong>.</p>
<p>Tình trạng hôn nhân: <strong>${maritalStatusVi}</strong>.</p>
<p>Ngày làm việc: <strong>${dayworkstart}</strong>.</p>
<p><strong>${urlCheckMsg}</strong> xác nhận QrCode.</p>
<p><strong>${nfcMsg}</strong> xác nhận NFC.</p>
<p><strong>${isCitizenMsg}</strong>.</p>
<div>
<p><strong style="text-decoration: underline; color: #f97316; font-weight:800; font-size:25px;">Dữ liệu cũ và mới được thay đổi!</strong></p>
${changedFieldsContent}
</div>
      `,
    });
  }
};
