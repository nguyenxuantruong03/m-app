// zod dùng để validate trường nhập
import * as z from "zod";

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6,{
      message: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
    })),
    newPassword: z.optional(z.string().min(6,{
      message: "Mật khẩu mới yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
    })),
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
  })

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ !",
  }),
  password: z.string().min(6).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/, {
    message: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
  }),
  code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/, {
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
  password: z.string().min(6).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/, {
    message: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
  }),
  name: z.string().min(4, {
    message: "Yêu cầu nhập tên ít nhất 4 ký tự!",
  }),
});
