// zod dùng để validate trường nhập
import * as z from "zod";

const noLeadingWhitespace = (value: string) =>
  /^(?!\s)(.*\S)(?<!\s)$/.test(value);
const noSpecialCharacters = (value: string) =>
  /^[a-zA-ZÀ-ỹ0-9\s]*$/.test(value);
const validUrlStart = (value: string) =>
  value.startsWith("https://") || value.startsWith("http://");
const noLeadingWhitespacebeforNameUser = (value: string) => !/^\s/.test(value);
const noSpecialCharactersforNameUser = (value: string) =>
  /^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$/.test(value);

export const SettingSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(30, { message: "Vui lòng không nhập quá 30 ký tự." })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
        .refine(noSpecialCharacters, {
          message:
            "Không được chứa ký tự đặc biệt, bắt đầu và kết thúc bằng chữ hoặc số",
        })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(
      z
        .string()
        .min(6, {
          message: "Mật khẩu yêu cầu [a-z] và [0-9] ,từ 6 đến 20 ký tự!",
        })
        .max(20, {
          message: "Bạn đã nhập quá 20 ký tự!",
        })
    ),
    newPassword: z.optional(
      z
        .string()
        .min(6, {
          message: "Mật khẩu yêu cầu [a-z] và [0-9] ,từ 6 đến 20 ký tự!",
        })
        .max(20, {
          message: "Bạn đã nhập quá 20 ký tự!",
        })
    ),
    bio: z.optional(
      z
        .string()
        .max(101, { message: "Vui lòng không nhập quá 101 ký tự." })
        .refine(noSpecialCharacters, {
          message:
            "Không được chứa ký tự đặc biệt, bắt đầu và kết thúc bằng chữ hoặc số",
        })
    ),
    address: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(100, { message: "Vui lòng không nhập quá 100 ký tự." })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
        .refine(noSpecialCharacters, {
          message:
            "Không được chứa ký tự đặc biệt, bắt đầu và kết thúc bằng chữ hoặc số",
        })
    ),
    addressother: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(100, { message: "Vui lòng không nhập quá 100 ký tự." })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
        .refine(noSpecialCharacters, {
          message:
            "Không được chứa ký tự đặc biệt, bắt đầu và kết thúc bằng chữ hoặc số",
        })
    ),
    nameuser: z.optional(
      z
        .string()
        .min(6, { message: "Vui lòng nhập ít nhất 6 ký tự." })
        .max(20, { message: "Vui lòng không nhập quá 20 ký tự." })
        .refine((value) => value.startsWith("@"), {
          message: "Tên người dùng phải bắt đầu với '@'.",
        })
        .refine((value) => noLeadingWhitespacebeforNameUser(value.slice(1)), {
          message: "Không được phép có khoảng trắng đầu dòng sau '@'.",
        })
        .refine((value) => noSpecialCharactersforNameUser(value.slice(1)), {
          message:
            "Không được chứa ký tự đặc biệt, bắt đầu và kết thúc bằng chữ hoặc số.",
        })
    ),
    gender: z.optional(
      z.string().min(1, { message: "Vui lòng chon 1 giới tính." })
    ),
    frame: z.optional(
      z.string().min(1, { message: "Vui lòng chọn 1 khung ảnh." })
    ),
    phonenumber: z.optional(
      z.string().refine((value) => /^[0-9]+$/.test(value), {
        message: "Vui lòng nhập số điện thoại hợp lệ chỉ có số.",
      })
    ),
    dateofbirth: z.optional(z.date().nullable()),
    favorite: z.optional(z.array(z.string())),
    imageCredential: z.optional(z.array(z.string())),
    linkyoutube: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine((value) => value.startsWith("https://www.youtube.com/"), {
          message: "Link YouTube phải bắt đầu bằng https://www.youtube.com/",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
    ),
    linkfacebook: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine((value) => value.startsWith("https://www.facebook.com/"), {
          message: "Link Facebook phải bắt đầu bằng https://www.facebook.com/",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
    ),
    linkinstagram: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine((value) => value.startsWith("https://www.instagram.com/"), {
          message:
            "Link Instagram phải bắt đầu bằng https://www.instagram.com/",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
    ),
    linktwitter: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine((value) => value.startsWith("https://www.twitter.com/"), {
          message: "Link Twitter phải bắt đầu bằng https://www.twitter.com/",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
    ),
    linklinkedin: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine((value) => value.startsWith("https://www.linkedin.com/"), {
          message: "Link LinkedIn phải bắt đầu bằng https://www.linkedin.com/",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
    ),
    linkgithub: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine((value) => value.startsWith("https://www.github.com/"), {
          message: "Link GitHub phải bắt đầu bằng https://www.github.com/",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
    ),
    linktiktok: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine((value) => value.startsWith("https://www.tiktok.com/"), {
          message: "Link TikTok phải bắt đầu bằng https://www.tiktok.com/",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
    ),
    linkwebsite: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
        .refine(validUrlStart, {
          message: "Link website phải bắt đầu bằng http:// hoặc https://",
        })
    ),
    linkother: z.optional(
      z
        .string()
        .min(2, { message: "Vui lòng nhập ít nhất 2 ký tự." })
        .max(200, {
          message:
            "Vui lòng không nhập quá 200 ký tự. Hãy mã hóa đường dẫn bằng tên của bạn hoặc tên tiêu đề.",
        })
        .refine(noLeadingWhitespace, {
          message: "Không được phép có khoảng trắng đầu dòng.",
        })
        .refine(validUrlStart, {
          message: "Link other phải bắt đầu bằng http:// hoặc https://",
        })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const UpdateImageSchema = z.object({
  imageCredential: z.object({ url: z.string() }).array(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ !",
  }),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/, {
      message: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
    }),
  code: z.optional(z.string()),
});

export const PostSchema = z.object({
  imageReview: z.object({ url: z.string() }).array(),
  content: z.optional(z.string()),
  productId: z.optional(z.string()),
  categoryName: z.optional(z.string()),
  rating: z.optional(z.coerce.number()),
  isPublic: z.optional(z.boolean()),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/, {
      message: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
    }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ !",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ !",
  }),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/, {
      message: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
    }),
  name: z.string().min(4, {
    message: "Yêu cầu nhập tên ít nhất 4 ký tự!",
  }),
});
