import { currentUser } from "@/lib/auth";
import { translateSentEmailFeedbackPost } from "@/translate/translate-api";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const sentEmailFeedBackPostMessage = translateSentEmailFeedbackPost(LanguageToUse)
  try {
    const body = await req.json();
    const { email, subject, value } = body;

    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailFeedBackPostMessage.emailNotFound }),
        { status: 403 }
      );
    }
    if (!subject) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailFeedBackPostMessage.subjectNotFound }),
        { status: 403 }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailFeedBackPostMessage.valueNotFound }),
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
      JSON.stringify({ error: sentEmailFeedBackPostMessage.internalErrorPostSentEmailFeedback }),
      { status: 500 }
    );
  }
}
