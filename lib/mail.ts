import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Xác thực 2 yếu tố! ",
    html: `<p> Xin chào <strong>${email}!</strong> Your 2FA code: <strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> là mã xác thực đăng nhập trên <a href="${domain}">vlxd Xuân Trường</a>. Mã có hiệu lực trong vòng 2 phút. Nếu có thắc mắc liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const restLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Reset your password",
    html: `<p>Xin chào <strong>${email}!</strong> Click <a href="${restLink}">hear</a> to reset password. Reset password có hiệu lực trong vòng 2 phút. Nếu có thắc mắc liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Confirm your email",
    html: `<p>Xin chào <strong>${email}!</strong> Click <a href="${confirmLink}">hear</a> to confirm email. Xác nhận có hiệu lực trong vòng 2 phút. Nếu có thắc mắc liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendVerifyAccountisCitizen = async (email: string | null = "") => {
  const toEmail = email ? [email] : [];
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: "Verify your email",
    html: `<p>Xin chào <strong>${email}!</strong> Tài khoản của bạn đã được xác thực. Bạn đã là nhân viên của <a href="${domain}">vlxd Xuân Trường</a>. Hãy vào xem role hiện tại của bạn đã được thay đổi thành <strong style="color: #3b82f6;">STAFF</strong> chưa. Nếu có thắc mắc liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendSpamEmail = async (
  email: (string | null)[],
  subject: string,
  description: string
) => {
  // Filter out null values from the email array
  const validEmails = email.filter(e => e !== null) as string[];

  // Check if there are valid emails to send to
  if (validEmails.length === 0) {
    console.error("No valid email addresses provided.");
    return;
  }
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: validEmails,
    subject: subject,
    html: description,
  })
};

export const sendAttendanceStart = async (
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null
) => {
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Điểm danh ngày mới!",
      html: `Xin chào <strong> ${nameuser || 'Bạn'}!</strong> Thời gian điểm danh của bạn bắt đầu lúc <strong>${start || 'không xác định'}</strong> và kết thúc lúc <strong>${end || 'không xác định'}</strong>. Chúc bạn 1 ngày làm việc tràn đầy năng lượng.`,
    });
  } 
};

export const sendAttendanceEnd = async (
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  if (email) {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Kết thúc điểm danh!",
    html: `Xin chào <strong> ${nameuser}!</strong> Thời gian điểm danh của bạn đã kết thúc vào lúc <strong>${end}</strong>. Chúc bạn 1 ngày tốt lành.`,
  })
  }
};

export const sendSalarytotal = async (
  email: string | null | undefined,
  name: string | null | undefined,
  totalsalary: string | "0",
  today: string | null | undefined
) => {
  if(email){
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Nhận lương!",
    html: `Xin chào <strong> ${name}!</strong> Tổng lương của bạn đã nhận <strong>${totalsalary}</strong> vào lúc <strong>${today}</strong>`,
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
  if(email){
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Nhận tiền thường!",
    html: `Xin chào <strong> ${name}!</strong> Bạn đã nhận thêm <strong>+${bonus}</strong> vào ngày <strong>${today}</strong> vì đã hoàn thành xuất xác trong việc <strong>${title}</strong>. Tổng số tiền bonus: <strong>${currenmoney}</strong>.`,
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
  if(email){
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Mất tiền thưởng!",
    html: `Xin chào <strong> ${name}!</strong> Bạn đã bị trừ <strong>${unbonus}</strong> vào ngày <strong>${today}</strong> vì chưa hoàn thành xuất xác trong việc <strong>${title}</strong>.Tổng số tiền bonus còn lại: <strong>${currenmoney}</strong>.`,
  });
}
};
