import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

const domain = process.env.NEXT_PUBLIC_URL

export const sendTwoFactorTokenEmail = async ( email:string, token:string) =>{
    await resend.emails.send({
        from: "mail@vlxdxuantruong.email",
        to: email,
        subject: "Xác thực 2 yếu tố! ",
        html: `<p>Your 2FA code: ${token} </p>`
    })
}

export const sendPasswordResetEmail = async (email: string, token:string) =>{
    const restLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "mail@vlxdxuantruong.email",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${restLink}">hear</a> to reset password.</p>`
    })
}

export const sendVerificationEmail = async (email:string, token:string) =>{
    const confirmLink = `${domain}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "mail@vlxdxuantruong.email",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">hear</a> to confirm email.</p>`
    })
}