import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_RCTEzcfc_3Eo7RyscVyHChCuzhtukuVkB");
export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { email, subject, value } = body;

    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.emailNotFound") }),
        { status: 403 }
      );
    }
    if (!subject) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.subjectNotFound") }),
        { status: 403 }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.valueNotFound") }),
        { status: 403 }
      );
    }

    const resendEmail = await resend.emails.send({
      from: "mail@vlxdxuantruong.email",
      to: email,
      subject: subject,
      html: value,
    });
    
    return NextResponse.json(resendEmail);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorPostSentEmailFeedback") }),
      { status: 500 }
    );
  }
}
