import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateFeedbackIdDelete } from "@/translate/translate-api";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { feedbackId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const feedbackIdDeleteMessage = translateFeedbackIdDelete(LanguageToUse)
  try {

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: feedbackIdDeleteMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: feedbackIdDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!params.feedbackId) {
      return new NextResponse(
        JSON.stringify({ error: feedbackIdDeleteMessage.feedbackIdRequired }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: feedbackIdDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Mảng emotion và category để ánh xạ số thành mô tả
    const emotionMap: { [key: number]: string } = {
      1: "Good",
      2: "Average",
      3: "Bad",
      4: "Poor service",
      5: "Terrible",
    };

    const categoryMap: { [key: number]: string } = {
      1: "Unprofessional service",
      2: "Delayed response from staff",
      3: "Complicated payment",
      4: "No response to the call",
      5: "Website performance issues",
      6: "Other",
    };

    const existingFeedBack = await prismadb.feedBack.findUnique({
      where: {
        id: params.feedbackId,
      },
      include: {
        user: true,
      },
    });

    const feedBack = await prismadb.feedBack.delete({
      where: {
        id: params.feedbackId,
      },
    });

    const sentProduct = {
      content: feedBack?.content,
      emotion: emotionMap[feedBack.emotion], // Mapped emotion
      category: categoryMap[feedBack.category], // Mapped category
      email: existingFeedBack?.user.email,
      name: existingFeedBack?.user.name,
    };

    const changes = [
      `Name: ${sentProduct.name}, Email: ${sentProduct.email}, Content: ${sentProduct.content}, Emotion: ${sentProduct.emotion}, Category: ${sentProduct.category}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changes,
        type: "DELETEFEEDBACK",
        user: user?.email || "",
      },
    });

    return NextResponse.json(feedBack);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: feedbackIdDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}
