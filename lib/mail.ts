import { format } from "date-fns";
import { Resend } from "resend";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import zhLocale from "date-fns/locale/zh-CN";
import frLocale from "date-fns/locale/fr";
import jaLocale from "date-fns/locale/ja";
import {
  get2FAMessage,
  translateAttendanceEndMessage,
  translateAttendanceStartMessage,
  translateBanMessage,
  translateBanNotStartMessage,
  translateBonusMessage,
  translateConfirmEmailMessage,
  translateDeleteUserMessage,
  translateDeliverySuccessMessage,
  translateDismissalMessage,
  translateResetPasswordMessage,
  translateSalaryTotalMessage,
  translateSpinRewardMessage,
  translateSpinUnRewardMessage,
  translateUnbanMessage,
  translateUnBonusMessage,
  translateVerifyEmailCitizenMarketingMessage,
  translateVerifyEmailCitizenMessage,
  translateVerifyEmailCitizenShipperMessage,
} from "@/translate/translate-api";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

export const sendTwoFactorTokenEmail = async (languageToUse: string | undefined, email: string, token: string) => {
  // Lấy thông điệp xác thực 2 yếu tố theo ngôn ngữ
  const message = get2FAMessage(languageToUse || "vi", email, token, domain);
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: message.subject,
    html: message.html,
  });
};

export const sendPasswordResetEmail = async (
  languageToUse: string | undefined,
  email: string,
  token: string,
  resendTokenNewpassword?: number
) => {
  const restLink = `${domain}/auth/new-password?token=${token}`;
  const message = translateResetPasswordMessage(
    languageToUse || "vi",
    email,
    restLink,
    resendTokenNewpassword || 0
  );

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: message.subject,
    html: message.html,
  });
};

export const sendVerificationEmail = async (
  languageToUse: string | undefined,
  email: string,
  token: string,
  resendTokenVerifyCount?: number
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const message = translateConfirmEmailMessage(
    languageToUse || "vi",
    email,
    confirmLink,
    resendTokenVerifyCount || 0
  );

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: message.subject,
    html: message.html,
  });
};

export const sendVerifyAccountisCitizen = async (languageToUse: string | undefined, email: string | null = "") => {
  const toEmail = email ? [email] : [];
  const message = translateVerifyEmailCitizenMessage(
    languageToUse || "vi",
    email,
    domain
  );

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: message.subject,
    html: message.html,
  });
};

export const sendVerifyAccountisCitizenShipper = async (
  languageToUse:string, email: string | null = ""
) => {
  const toEmail = email ? [email] : [];
  const message = translateVerifyEmailCitizenShipperMessage(
    languageToUse,
    email,
    domain
  );

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: message.subject,
    html: message.html,
  });
};

export const sendVerifyAccountisCitizenMaketing = async (
  languageToUse:string, email: string | null = ""
) => {
  const toEmail = email ? [email] : [];
  const message = translateVerifyEmailCitizenMarketingMessage(
    languageToUse,
    email,
    domain
  );

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: message.subject,
    html: message.html,
  });
};

export const sendBanUser = async (
  languageToUse:string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null,
  descriptionBan: string
) => {
  const message = translateBanMessage(
    languageToUse,
    nameuser,
    start,
    end,
    descriptionBan
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendBanUserNotStart = async (
  languageToUse:string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  const message = translateBanNotStartMessage(
    languageToUse,
    nameuser,
    end
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendUnBanUser = async (
  languageToUse:string | undefined,
  email: string | null | undefined,
  nameuser: string | null | undefined
) => {
  const message = translateUnbanMessage(languageToUse || "vi", nameuser);

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendSpamEmail = async (
  email: (string | null)[],
  subject: string,
  description: string
) => {
  // Filter out null values from the email array
  const validEmails = email.filter((e) => e !== null) as string[];

  // Check if there are valid emails to send to
  if (validEmails.length === 0) {
    return;
  }
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: validEmails,
    subject: subject,
    html: description,
  });
};

export const sendAttendanceStart = async (
  languageToUse:string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null,
  delayHours?: number | undefined
) => {
  const message = translateAttendanceStartMessage(
    languageToUse,
    nameuser,
    start,
    end,
    delayHours || 0
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendAttendanceEnd = async (
  languageToUse:string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  const message = translateAttendanceEndMessage(
    languageToUse,
    nameuser,
    end
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendSalarytotal = async (
  languageToUse:string,
  email: string | null | undefined,
  name: string | null | undefined,
  totalsalary: string | "0",
  today: string | null | undefined
) => {
  const message = translateSalaryTotalMessage(
    languageToUse,
    name,
    totalsalary,
    today
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendBonus = async (
  languageToUse:string,
  email: string | null | undefined,
  name: string | null | undefined,
  bonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const message = translateBonusMessage(
    languageToUse,
    name,
    bonus,
    currenmoney,
    title,
    today
  );
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendunBonus = async (
  languageToUse:string,
  email: string | null | undefined,
  name: string | null | undefined,
  unbonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const message = translateUnBonusMessage(
    languageToUse,
    name,
    unbonus,
    currenmoney,
    title,
    today
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendSpin = async (
  languageToUse:string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  bonus: string | "0",
  currenmoney: string | "0",
  bonuscoin: string | "0",
  totalcoin: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const message = translateSpinRewardMessage(
    languageToUse || "vi",
    name,
    bonus,
    currenmoney,
    bonuscoin,
    totalcoin,
    title,
    today
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendUnSpin = async (
  languageToUse:string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  unbonus: string | "0",
  currenmoney: string | "0",
  unbonuscoin: string | "0",
  totalcoin: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const message = translateSpinUnRewardMessage(
    languageToUse || "vi",
    name,
    unbonus,
    currenmoney,
    unbonuscoin,
    totalcoin,
    title,
    today
  );
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendDismissal = async (
  languageToUse:string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  const message = translateDismissalMessage(
    languageToUse || "vi",
    name,
    today
  );

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendDeleteUser = async (
  languageToUse:string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  const message = translateDeleteUserMessage(
    languageToUse || "vi",
    name,
    today
  );
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};

export const sendDeliverySuccess = async (
  languageToUse: string | undefined,
  email: string,
  order: any,
) => {
  const localeMap: Record<string, Locale> = {
    vi: viLocale,
    en: enLocale,
    zh: zhLocale,
    fr: frLocale,
    ja: jaLocale,
  };

  const locale = localeMap[languageToUse || "vi"] || enLocale;
  if (email) {
    // Định dạng ngày giao hàng
    const formattedDate = format(new Date(order.updatedAt), "dd/MM/yyyy", {
      locale,
    });

    const message = translateDeliverySuccessMessage(
      languageToUse || "vi",
      order,
      formattedDate
    );

    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};
