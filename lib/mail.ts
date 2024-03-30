import { Decimal } from "@prisma/client/runtime/library";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Xác thực 2 yếu tố! ",
    html: `<p>Your 2FA code: ${token} </p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const restLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${restLink}">hear</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">hear</a> to confirm email.</p>`,
  });
};

export const sendVerifyAccountisCitizen = async (email: string | null = "") => {
  const toEmail = email ? [email] : [];
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: "Verify your email",
    html: `<p>Tài khoản của bạn đã được xác thực để trở thành nhân viên.</p>`,
  });
};

export const sendSpamEmail = async (
  email: string,
  subject: string,
  description: string
) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: subject,
    html: description,
  });
};

export const sendAttendanceStart = async (
  email: string,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null
) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Điểm danh ngày mới!",
    html: `Chào <strong> ${nameuser}!</strong> Thời gian điểm danh của bạn bắt đầu lúc <strong>${start}</strong> và kết thúc lúc <strong>${end}</strong>.Chúc bạn 1 ngày làm việc tràn đầy năng lượng.`,
  });
};

export const sendAttendanceEnd = async (
  email: string,
  nameuser: string | null | undefined,
  end: string | null
) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Kết thúc điểm danh!",
    html: `Chào <strong> ${nameuser}!</strong> Thời gian điểm danh của bạn đã kết thúc vào lúc <strong>${end}</strong>. Chúc bạn 1 ngày tốt lành.`,
  });
};

export const sendSalarytotal = async (
  email: string,
  name: string | null | undefined,
  totalsalary: string | "0",
  today: string | null | undefined
) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Nhận lương!",
    html: `Chào <strong> ${name}!</strong> Tổng lương của bạn đã nhận <strong>${totalsalary}</strong> vào lúc <strong>${today}</strong>`,
  });
};

export const sendBonus = async (
  email: string,
  name: string | null | undefined,
  bonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Nhận tiền thường!",
    html: `Chào <strong> ${name}!</strong> Bạn đã nhận thêm <strong>+${bonus}</strong> vào ngày <strong>${today}</strong> vì đã hoàn thành xuất xác trong việc <strong>${title}</strong>. Tổng số tiền bonus: <strong>${currenmoney}</strong>.`,
  });
};

export const sendunBonus = async (
  email: string,
  name: string | null | undefined,
  unbonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Mất tiền thưởng!",
    html: `Chào <strong> ${name}!</strong> Bạn đã bị trừ <strong>${unbonus}</strong> vào ngày <strong>${today}</strong> vì chưa hoàn thành xuất xác trong việc <strong>${title}</strong>.Tổng số tiền bonus còn lại: <strong>${currenmoney}</strong>.`,
  });
};
