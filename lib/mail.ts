import { format } from "date-fns";
import { Resend } from "resend";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import zhLocale from "date-fns/locale/zh-CN";
import frLocale from "date-fns/locale/fr";
import jaLocale from "date-fns/locale/ja";
import { currentUser } from "@/lib/auth";
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

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const user = await currentUser();
  // Lấy thông điệp xác thực 2 yếu tố theo ngôn ngữ
  const message = get2FAMessage(user?.language || "vi", email, token, domain);
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: message.subject,
    html: message.html,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  resendTokenNewpassword?: number
) => {
  const user = await currentUser();
  const restLink = `${domain}/auth/new-password?token=${token}`;
  const message = translateResetPasswordMessage(
    user?.language || "vi",
    email,
    restLink,
    resendTokenNewpassword
  );

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: message.subject,
    html: message.html,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  resendTokenVerifyCount?: number
) => {
  const user = await currentUser();
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const message = translateConfirmEmailMessage(
    user?.language || "vi",
    email,
    confirmLink,
    resendTokenVerifyCount
  );

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: message.subject,
    html: message.html,
  });
};

export const sendVerifyAccountisCitizen = async (email: string | null = "") => {
  const user = await currentUser();
  const toEmail = email ? [email] : [];
  const message = translateVerifyEmailCitizenMessage(
    user?.language || "vi",
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
  email: string | null = ""
) => {
  const user = await currentUser();
  const toEmail = email ? [email] : [];
  const message = translateVerifyEmailCitizenShipperMessage(
    user?.language || "vi",
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
  email: string | null = ""
) => {
  const user = await currentUser();
  const toEmail = email ? [email] : [];
  const message = translateVerifyEmailCitizenMarketingMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null,
  descriptionBan: string
) => {
  const user = await currentUser();
  const message = translateBanMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  const user = await currentUser();
  const message = translateBanNotStartMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  nameuser: string | null | undefined
) => {
  const user = await currentUser();
  const message = translateUnbanMessage(user?.language || "vi", nameuser);

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
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null,
  delayHours?: number | undefined
) => {
  const user = await currentUser();
  const message = translateAttendanceStartMessage(
    user?.language || "vi",
    nameuser,
    start,
    end,
    delayHours
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
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  const user = await currentUser();
  const message = translateAttendanceEndMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  name: string | null | undefined,
  totalsalary: string | "0",
  today: string | null | undefined
) => {
  const user = await currentUser();
  const message = translateSalaryTotalMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  name: string | null | undefined,
  bonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const user = await currentUser();
  const message = translateBonusMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  name: string | null | undefined,
  unbonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const user = await currentUser();
  const message = translateUnBonusMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  name: string | null | undefined,
  bonus: string | "0",
  currenmoney: string | "0",
  bonuscoin: string | "0",
  totalcoin: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const user = await currentUser();
  const message = translateSpinRewardMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  name: string | null | undefined,
  unbonus: string | "0",
  currenmoney: string | "0",
  unbonuscoin: string | "0",
  totalcoin: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  const user = await currentUser();
  const message = translateSpinUnRewardMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  const user = await currentUser();
  const message = translateDismissalMessage(
    user?.language || "vi",
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
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  const user = await currentUser();
  const message = translateDeleteUserMessage(
    user?.language || "vi",
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
  email: string,
  order: any,
  languageToUse: string
) => {
  const localeMap: Record<string, Locale> = {
    vi: viLocale,
    en: enLocale,
    zh: zhLocale,
    fr: frLocale,
    ja: jaLocale,
  };

  const locale = localeMap[languageToUse] || enLocale;
  if (email) {
    // Định dạng ngày giao hàng
    const formattedDate = format(new Date(order.updatedAt), "dd/MM/yyyy", {
      locale,
    });

    const message = translateDeliverySuccessMessage(
      languageToUse,
      order,
      languageToUse
    );

    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: message.subject,
      html: message.html,
    });
  }
};
