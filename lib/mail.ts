import { format } from "date-fns";
import { Resend } from "resend";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import { createTranslator } from "next-intl";

const resend = new Resend("re_RCTEzcfc_3Eo7RyscVyHChCuzhtukuVkB");
const domain = process.env.NEXT_PUBLIC_URL;

export const sendTwoFactorTokenEmail = async (
  languageToUse: string | undefined,
  email: string,
  token: string
) => {
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse || "vi", messages });
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: `${t("email.2FA.subject")}: ${token}`,
    html: `
              <p>${t("email.2FA.html.name1")} <strong>${email}!</strong> ${t(
      "email.2FA.html.name2"
    )}: <strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> ${t(
      "email.2FA.html.name3"
    )} <a href="${domain}">${t("email.2FA.html.name4")}</a>. ${t(
      "email.2FA.html.name5"
    )} <strong>0352261103</strong>.</p>
          `,
  });
};

export const sendPasswordResetEmail = async (
  languageToUse: string | undefined,
  email: string,
  token: string,
  resendTokenNewpassword?: number
) => {
  const restLink = `${domain}/auth/new-password?token=${token}`;

  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: t("email.passwordResetEmail.subject"),
    html: `<p>${t(
      "email.passwordResetEmail.html.name1"
    )} <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! ${t(
      "email.passwordResetEmail.html.name2"
    )} <a href="${restLink}"> ${t("email.passwordResetEmail.html.name3")}</a> ${t(
      "email.passwordResetEmail.html.name4"
    )} <strong>0352261103</strong>. ${t(
      "email.passwordResetEmail.html.name5"
    )} <span style="color:#FF3131; font-weight: 800;">${resendTokenNewpassword}</span> ${t(
      "email.passwordResetEmail.html.name6"
    )}<p style="color:#FF3131; font-weight: 800;"> ${t("email.passwordResetEmail.html.name7")}</p></p>`,
  });
};

export const sendVerificationEmail = async (
  languageToUse: string | undefined,
  email: string,
  token: string,
  resendTokenVerifyCount?: number
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: t("email.verificationEmail.subject"),
    html: `<p>${t(
      "email.verificationEmail.html.name1"
    )} <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! ${t(
      "email.verificationEmail.html.name2"
    )} <a href="${confirmLink}">${t("email.verificationEmail.html.name3")}</a> ${t(
      "email.verificationEmail.html.name4"
    )} <strong>0352261103</strong>. ${t(
      "email.verificationEmail.html.name5"
    )} <span style="color:#FF3131; font-weight: 800;">${resendTokenVerifyCount}</span> ${t(
      "email.verificationEmail.html.name6"
    )}<p style="color:#FF3131; font-weight: 800;"> ${t("email.verificationEmail.html.name7")}</p></p>`,
  });
};

export const sendVerifyAccountisCitizen = async (
  languageToUse: string | undefined,
  email: string | null = ""
) => {
  const toEmail = email ? [email] : [];
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: t("email.verifyEmailCitizen.subject"),
    html: `<p>${t(
      "email.verifyEmailCitizen.html.name1"
    )} <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! ${t(
      "email.verifyEmailCitizen.html.name2"
    )} <a href="${domain}">${t("email.verifyEmailCitizen.html.name3")}</a>. ${t(
      "email.verifyEmailCitizen.html.name4"
    )} <strong style="color: #3b82f6;">${t("email.verifyEmailCitizen.html.name5")}</strong> ${t(
      "email.verifyEmailCitizen.html.name6"
    )} <strong>0352261103</strong>.</p>`,
  });
};

export const sendVerifyAccountisCitizenShipper = async (
  languageToUse: string,
  email: string | null = ""
) => {
  const toEmail = email ? [email] : [];
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: "Xác thực email của bạn",
    html: `<p>${t(
      "email.verifyAccountisCitizenShipper.html.name1"
    )} <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! ${t(
      "email.verifyAccountisCitizenShipper.html.name2"
    )} <a href="${domain}">${t("email.verifyAccountisCitizenShipper.html.name3")}</a>. ${t(
      "email.verifyAccountisCitizenShipper.html.name4"
    )} <strong style="color: #3b82f6;">${t("email.verifyAccountisCitizenShipper.html.name5")}</strong> ${t(
      "email.verifyAccountisCitizenShipper.html.name6"
    )} <strong>0352261103</strong>.</p>`,
  });
};

export const sendVerifyAccountisCitizenMaketing = async (
  languageToUse: string,
  email: string | null = ""
) => {
  const toEmail = email ? [email] : [];
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: "Xác thực email của bạn",
    html: `<p>${t(
      "email.verifyAccountisCitizenMaketing.html.name1"
    )} <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! ${t(
      "email.verifyAccountisCitizenMaketing.html.name2"
    )} <a href="${domain}">${t("email.verifyAccountisCitizenMaketing.html.name3")}</a>. ${t(
      "email.verifyAccountisCitizenMaketing.html.name4"
    )} <strong style="color: #3b82f6;">${t("email.verifyAccountisCitizenMaketing.html.name5")}</strong> ${t(
      "email.verifyAccountisCitizenMaketing.html.name6"
    )} <strong>0352261103</strong>.</p>`,
  });
};

export const sendBanUser = async (
  languageToUse: string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null,
  descriptionBan: string
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.banuser.subject"),
      html: `<p>${t(
        "email.banuser.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! ${t(
        "email.banuser.html.name2"
      )} <strong>${start}</strong>. ${t("email.banuser.html.name3")} ${end}. ${t(
        "email.banuser.html.name4"
      )} <strong>${descriptionBan}</strong>. ${t(
        "email.banuser.html.name5"
      )} <strong>0352261103</strong> ${t("email.banuser.html.name6")}</p>`,
    });
  }
};

export const sendBanUserNotStart = async (
  languageToUse: string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.banUserNotStart.subject"),
      html: `<p>${t(
        "email.banUserNotStart.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! ${t(
        "email.banUserNotStart.html.name2"
      )} ${end}. ${t("email.banUserNotStart.html.name3")} <strong>0352261103</strong> ${t(
        "email.banUserNotStart.html.name4"
      )}</p>`,
    });
  }
};

export const sendUnBanUser = async (
  languageToUse: string | undefined,
  email: string | null | undefined,
  nameuser: string | null | undefined
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.unBanUser.subject"),
      html: `<p>${t(
        "email.unBanUser.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! ${t(
        "email.unBanUser.html.name2"
      )} <strong>0352261103</strong> ${t("email.unBanUser.html.name3")}</p>`,
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
  languageToUse: string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null,
  delayHours?: number | undefined
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  let penaltyMessage = "";

  if (delayHours) {
    penaltyMessage = `<p style="color:#FF3131;">${t("email.attendanceStart.html.name7")} (${
      Math.floor(delayHours) +
      t("email.attendanceStart.html.name8") +
      Math.floor((delayHours % 1) * 60) +
      t("email.attendanceStart.html.name9")
    })</p>`;
  }

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.attendanceStart.subject"),
      html: `<p>${t(
        "email.attendanceStart.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${
        nameuser || t("email.attendanceStart.html.name2")
      }</strong>! ${t("email.attendanceStart.html.name3")} <strong>${
        start || t("email.attendanceStart.html.name4")
      }</strong> ${t("email.attendanceStart.html.name5")} <strong>${
        end || t("email.attendanceStart.html.name4")
      }</strong>. ${t("email.attendanceStart.html.name6")} ${penaltyMessage}</p>`,
    });
  }
};

export const sendAttendanceEnd = async (
  languageToUse: string,
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.attendanceEnd.subject"),
      html: `<p>${t(
        "email.attendanceEnd.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! ${t(
        "email.attendanceEnd.html.name2"
      )} <strong>${end}</strong>. ${t("email.attendanceEnd.html.name3")}</p>`,
    });
  }
};

export const sendSalarytotal = async (
  languageToUse: string,
  email: string | null | undefined,
  name: string | null | undefined,
  totalsalary: string | "0",
  today: string | null | undefined
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.salaryTotal.subject"),
      html: `<p>${t(
        "email.salaryTotal.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! ${t(
        "email.salaryTotal.html.name2"
      )} <strong>${totalsalary}</strong> ${t(
        "email.salaryTotal.html.name3"
      )} <strong>${today}</strong></p>`,
    });
  }
};

export const sendBonus = async (
  languageToUse: string,
  email: string | null | undefined,
  name: string | null | undefined,
  bonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.bonus.subject"),
      html: `<p>${t(
        "email.bonus.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! ${t(
        "email.bonus.html.name2"
      )} <strong>+${bonus}</strong> ${t(
        "email.bonus.html.name3"
      )} <strong>${today}</strong> ${t(
        "email.bonus.html.name4"
      )} <strong>${title}</strong>. ${t(
        "email.bonus.html.name5"
      )} <strong>${currenmoney}</strong>.</p>`,
    });
  }
};

export const sendunBonus = async (
  languageToUse: string,
  email: string | null | undefined,
  name: string | null | undefined,
  unbonus: string | "0",
  currenmoney: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.unbonus.subject"),
      html: `<p>${t(
        "email.unbonus.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! ${t(
        "email.unbonus.html.name2"
      )} <strong>${unbonus}</strong> ${t(
        "email.unbonus.html.name3"
      )} <strong>${today}</strong> ${t("email.unbonus.html.name4")} ${title}. ${t(
        "email.unbonus.html.name5"
      )} <strong>${currenmoney}</strong>.</p>`,
    });
  }
};

export const sendSpin = async (
  languageToUse: string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  bonus: string | "0",
  currenmoney: string | "0",
  bonuscoin: string | "0",
  totalcoin: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.spin.subject"),
      html: `<p>${t(
        "email.spin.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! ${t(
        "email.spin.html.name2"
      )} <strong>+${bonus} ${t("email.spin.html.name3")}</strong> ${t(
        "email.spin.html.name4"
      )} <strong>+${bonuscoin} ${t("email.spin.html.name5")}</strong> ${t(
        "email.spin.html.name6"
      )} <strong>${today}</strong> ${t(
        "email.spin.html.name7"
      )} <strong>${title}</strong>. ${t(
        "email.spin.html.name8"
      )} <strong>${currenmoney} ${t("email.spin.html.name3")}</strong> ${t(
        "email.spin.html.name4"
      )} <strong>${totalcoin} ${t("email.spin.html.name5")}</strong>.</p>`,
    });
  }
};

export const sendUnSpin = async (
  languageToUse: string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  unbonus: string | "0",
  currenmoney: string | "0",
  unbonuscoin: string | "0",
  totalcoin: string | "0",
  title: string | null | undefined,
  today: string | null | undefined
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.unspin.subject"),
      html: `<p>${t(
        "email.unspin.html.name1"
      )} <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! ${t(
        "email.unspin.html.name2"
      )} <strong>${unbonus} ${t("email.unspin.html.name3")}</strong> ${t(
        "email.unspin.html.name4"
      )} <strong>${unbonuscoin} ${t("email.unspin.html.name5")}</strong> ${t(
        "email.unspin.html.name6"
      )} <strong>${today}</strong> ${t(
        "email.unspin.html.name7"
      )} <strong>${title}</strong>. ${t(
        "email.unspin.html.name8"
      )} <strong>${currenmoney} ${t("email.unspin.html.name3")}</strong> ${t(
        "email.unspin.html.name4"
      )} <strong>${totalcoin} ${t("email.unspin.html.name5")}</strong>.</p>`,
    });
  }
};

export const sendDismissal = async (
  languageToUse: string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.dismissal.subject"),
      html: `<p>${t("email.dismissal.html.name1")} <strong>${name},</strong></p>

<p style="margin-top:5px;">${t("email.dismissal.html.name2")}</p>

<p style="margin-top:5px;">${t("email.dismissal.html.name3")}</p>

<p style="margin-top:5px;">${t("email.dismissal.html.name4")}</p>

<p style="margin-top:5px;"${t("email.dismissal.html.name5")}</p>

<p style="margin-top:5px;"><strong>${t("email.dismissal.html.name6")},</strong></p>

<p><strong>${t("email.dismissal.html.name7")}</strong> - ${today}.</p>`,
    });
  }
};

export const sendDeleteUser = async (
  languageToUse: string | undefined,
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.deleteUser.subject"),
      html: `<p>${t("email.deleteUser.html.name1")} <strong>${name},</strong></p>

<p style="margin-top:5px;">${t("email.deleteUser.html.name2")}</p>

<p style="margin-top:5px;">${t("email.deleteUser.html.name3")}</p>

<p style="margin-top:5px;">${t("email.deleteUser.html.name4")}</p>

<p style="margin-top:5px;">${t("email.deleteUser.html.name5")}</p>

<p style="margin-top:5px;"><strong>${t("email.deleteUser.html.name6")},</strong></p>

<p><strong>${t("email.deleteUser.html.name7")}/strong> - ${today}.</p>`,
    });
  }
};

export const sendDeliverySuccess = async (
  languageToUse: string | undefined,
  email: string,
  order: any
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  const localeMap: Record<string, Locale> = {
    vi: viLocale,
    en: enLocale,
  };

  const locale = localeMap[languageToUse || "vi"] || enLocale;
  if (email) {
    // Định dạng ngày giao hàng
    const formattedDate = format(new Date(order.updatedAt), "dd/MM/yyyy", {
      locale,
    });

    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: t("email.deliverySuccess.subject"),
        html: `
          <div>
            <div>
              <p>${t("email.deliverySuccess.html.name1")}</p>
              <p>${t("email.deliverySuccess.html.name2")} <span style="color:#FF3131; font-weight: 700;">${order.id}</span> ${t("email.deliverySuccess.html.name3")} ${formattedDate}.</p>
              <p>${t("email.deliverySuccess.html.name4")} <a style="text-decoration: underline;" href="${process.env.NEXT_PUBLIC_DOMAIN_URL}/warehouse">warehouse</a> ${t("email.deliverySuccess.html.name5")}</p>
            </div>
          </div>
        `
    });
  }
};
