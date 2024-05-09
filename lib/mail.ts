import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: `Mã xác thực 2 yếu tố: ${token} `,
    html: `<p> Xin chào <strong>${email}!</strong> Your 2FA code: <strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> là mã xác thực đăng nhập trên <a href="${domain}">vlxd Xuân Trường</a>. Mã có hiệu lực trong vòng 5 phút. Nếu có thắc mắc liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  resendTokenNewpassword?: number
) => {
  const restLink = `${domain}/auth/new-password?token=${token}`;
  let sendMessageResetPassword = "";
  if (resendTokenNewpassword) {
    sendMessageResetPassword = `Bạn đã gửi lại <span style="color:#FF3131; font-weight: 800;">${resendTokenNewpassword}</span> lần. Nếu vượt quá 5 lần bạn sẽ bị ban.<p style="color:#FF3131; font-weight: 800;"> Lý do: Spam.`;
  }

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Reset your password",
    html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Nhấp <a href="${restLink}"> vào đây</a> để làm mới mật khẩu. Xác thực làm mới mật khẩu có hiệu lực trong vòng 5 phút. Nếu có thắc mắc liên hệ <strong>0352261103</strong>. ${sendMessageResetPassword}</p>`,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  resendTokenVerifyCount?: number
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  let sendMessageVerifiCount = "";
  if (resendTokenVerifyCount) {
    sendMessageVerifiCount = `Bạn đã gửi lại <span style="color:#FF3131; font-weight: 800;">${resendTokenVerifyCount}</span> lần. Nếu vượt quá 5 lần bạn sẽ bị ban.<p style="color:#FF3131; font-weight: 800;"> Lý do: Spam</p>.`;
  }

  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: email,
    subject: "Confirm your email",
    html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Click <a href="${confirmLink}">hear</a> to confirm email. Xác thực có hiệu lực trong vòng 5 phút. Nếu có thắc mắc liên hệ <strong>0352261103</strong>. ${sendMessageVerifiCount}</p>`,
  });
};

export const sendVerifyAccountisCitizen = async (email: string | null = "") => {
  const toEmail = email ? [email] : [];
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: "Verify your email",
    html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Tài khoản của bạn đã được xác thực. Bạn đã là nhân viên của <a href="${domain}">vlxd Xuân Trường</a>. Hãy vào xem role hiện tại của bạn đã được thay đổi thành <strong style="color: #3b82f6;">STAFF</strong> chưa? Nếu chưa thay đổi hãy liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendVerifyAccountisCitizenShipper = async (email: string | null = "") => {
  const toEmail = email ? [email] : [];
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: "Verify your email",
    html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Tài khoản của bạn đã được xác thực. Bạn đã là nhân viên của <a href="${domain}">vlxd Xuân Trường</a>. Hãy vào xem role hiện tại của bạn đã được thay đổi thành <strong style="color: #3b82f6;">SHIPPER</strong> chưa? Nếu chưa thay đổi hãy liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendVerifyAccountisCitizenMaketing= async (email: string | null = "") => {
  const toEmail = email ? [email] : [];
  await resend.emails.send({
    from: "mail@vlxdxuantruong.email",
    to: toEmail,
    subject: "Verify your email",
    html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Tài khoản của bạn đã được xác thực. Bạn đã là nhân viên của <a href="${domain}">vlxd Xuân Trường</a>. Hãy vào xem role hiện tại của bạn đã được thay đổi thành <strong style="color: #3b82f6;">MAKETING</strong> chưa? Nếu chưa thay đổi hãy liên hệ <strong>0352261103</strong>.</p>`,
  });
};

export const sendBanUser = async (
  email: string | null | undefined,
  nameuser: string | null | undefined,
  start: string | null,
  end: string | null
) => {
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Sai quy định!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${nameuser}</strong>! Tài khoản của bạn đã bị khóa vào lúc <strong>${start}</strong>. Thời gian mở khóa vào ngày${end}. Bạn đã vi phạm quy định của công ty. Vui lòng liên hệ <strong>0352261103</strong> để biết thêm chi tiết.`,
    });
  }
};

export const sendBanUserNotStart = async (
  email: string | null | undefined,
  nameuser: string | null | undefined,
  end: string | null
) => {
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Sai quy định!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${nameuser}</strong>! Tài khoản của bạn đã bị khóa. Thời gian mở khóa vào ngày${end}. Bạn đã vi phạm quy định của công ty. Vui lòng liên hệ <strong>0352261103</strong> để biết thêm chi tiết.`,
    });
  }
};

export const sendUnBanUser = async (
  email: string | null | undefined,
  nameuser: string | null | undefined,
) => {
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Sai quy định!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${nameuser}</strong>!  Tài khoản của bạn đã được mở khóa. Xin lỗi vì đã khóa tài khoản của bạn. Chúng tôi chỉ làm theo những lưu ý và các điều khoản đã đưa ra. Mong bạn thông cảm! Cám ơn bạn đã đồng hành cùng chúng tôi. Vui lòng liên hệ <strong>0352261103</strong> để biết thêm chi tiết.`,
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
    console.error("No valid email addresses provided.");
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
  if (email) {
    let penaltyMessage = "";
    if (delayHours) {
      penaltyMessage = `<p style="color:#FF3131;">Bạn đã bị -50.000đ. Lý do: điểm danh trễ (${
        Math.floor(delayHours) +
        " giờ " +
        Math.floor((delayHours % 1) * 60) +
        " phút"
      })</p>`;
    }
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Điểm danh ngày mới!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${
        nameuser || "Bạn"
      }</strong>! Thời gian điểm danh của bạn bắt đầu lúc <strong>${
        start || "không xác định"
      }</strong> và kết thúc lúc <strong>${
        end || "không xác định"
      }</strong>. Chúc bạn 1 ngày làm việc tràn đầy năng lượng. ${penaltyMessage}`,
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
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${nameuser}</strong>! Thời gian điểm danh của bạn đã kết thúc vào lúc <strong>${end}</strong>. Chúc bạn 1 ngày tốt lành.`,
    });
  }
};

export const sendSalarytotal = async (
  email: string | null | undefined,
  name: string | null | undefined,
  totalsalary: string | "0",
  today: string | null | undefined
) => {
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Nhận lương!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${name}</strong>! Tổng lương của bạn đã nhận <strong>${totalsalary}</strong> vào lúc <strong>${today}</strong>`,
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
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Nhận tiền thường!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${name}</strong>! Bạn đã nhận thêm <strong>+${bonus}</strong> vào ngày <strong>${today}</strong> vì lý do: <strong>${title}</strong>. Tổng số tiền bonus: <strong>${currenmoney}</strong>.`,
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
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Mất tiền thưởng!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${name}</strong>! Bạn đã bị trừ <strong>${unbonus}</strong> vào ngày <strong>${today}</strong> vì lý do: ${title}</strong>.Tổng số tiền bonus còn lại: <strong>${currenmoney}</strong>.`,
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
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Nhận thưởng!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${name}</strong>! Bạn đã nhận thêm <strong>+${bonus}vòng quay</strong> và <strong>+${bonuscoin}xu</strong> vào ngày <strong>${today}</strong> vì lý do <strong>${title}</strong>. Tổng số spin và coin: <strong>${currenmoney}vòng quay</strong> và <strong>${totalcoin}xu</strong>.`,
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
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Mất thưởng!",
      html: `Xin chào <strong style="color: #3b82f6; text-decoration: underline;"> ${name}</strong>! Bạn đã bị trừ <strong>${unbonus}vòng quay</strong> và <strong>${unbonuscoin}xu</strong> vào ngày <strong>${today}</strong> vì lý do <strong>${title}</strong>.Tổng số spin và coin còn lại: <strong>${currenmoney}vòng quay</strong> và <strong>${totalcoin}xu</strong>.`,
    });
  }
};

export const sendDismissal = async (
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Đình chỉ công việc!",
      html: `

   <p>Kính gửi <strong>${name},</strong></p> 

<p style="margin-top:5px;">Chúng tôi muốn thông báo với bạn rằng sau một thời gian xem xét kỹ lưỡng, chúng tôi đã quyết định rẽ nhánh trong con đường sự nghiệp và chấm dứt hợp đồng lao động của bạn với công ty chúng tôi. Quyết định này không đến từ một lựa chọn dễ dàng, nhưng đây là quyết định mà chúng tôi cảm thấy là tốt nhất cho cả hai bên.</p>

<p style="margin-top:5px;">Chúng tôi cảm ơn sự đóng góp của bạn trong thời gian làm việc tại công ty. Các nỗ lực và thành tựu của bạn không bao giờ được coi nhẹ, và chúng tôi hy vọng bạn sẽ giữ được những kỷ niệm tốt đẹp về thời gian ở đây.</p>

<p style="margin-top:5px;">Chúng tôi cam kết hỗ trợ bạn trong quá trình chuyển tiếp và tìm kiếm cơ hội mới trong sự nghiệp của mình. Vui lòng liên hệ với phòng nhân sự nếu bạn cần bất kỳ hỗ trợ nào.</p>

<p style="margin-top:5px;">Chúng tôi chân thành cảm ơn bạn một lần nữa và chúc bạn may mắn trong những bước tiếp theo trong cuộc đời và sự nghiệp của bạn.</p>

<p style="margin-top:5px;"><strong>Trân trọng,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>
    `,
    });
  }
};


export const sendDeleteUser = async (
  email: string | null | undefined,
  name: string | null | undefined,
  today: string
) => {
  if (email) {
    await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: "Xóa tài khoản vĩnh viễn!",
      html: `

   <p>Kính gửi <strong>${name},</strong></p> 

<p style="margin-top:5px;">Tôi viết thư này để tỏ lòng xin lỗi về việc xóa tài khoản của bạn. Tôi hiểu rằng việc này đã gây ra sự bất tiện và phiền toái cho bạn, và tôi rất tiếc về điều đó.</p>

<p style="margin-top:5px;">Chúng tôi đã xem xét lại quyết định của mình và nhận ra rằng tài khoản của bạn có vấn đề. Và đã phạm vào luật nghiêm.</p>

<p style="margin-top:5px;">Tôi xin chân thành xin lỗi và mong rằng bạn có thể tha thứ cho sự cố này. Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu gì, xin vui lòng liên hệ trực tiếp với tôi theo địa chỉ email này.</p>

<p style="margin-top:5px;">Một lần nữa, tôi xin lỗi về sự bất tiện này và mong rằng chúng ta có thể tiếp tục hợp tác một cách tích cực trong tương lai.</p>

<p style="margin-top:5px;"><strong>Trân trọng,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>
    `,
    });
  }
};