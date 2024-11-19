import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, subject, value } = body;

    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy email!" }),
        { status: 403 }
      );
    }
    if (!subject) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy subject!" }),
        { status: 403 }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy value!" }),
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
      JSON.stringify({ error: "Internal error post cartItem." }),
      { status: 500 }
    );
  }
}
