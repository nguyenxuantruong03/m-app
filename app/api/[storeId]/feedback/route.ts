import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateFeedbackDelete, translateFeedbackGet, translateFeedbackPost } from "@/translate/translate-api";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const feedbackPostMessage = translateFeedbackPost(LanguageToUse)
  try {
    const body = await req.json();
    const { user, emotion, category, content } = body;

    if (!user) {
      return new NextResponse(JSON.stringify({ error: feedbackPostMessage.userIdRequired}), {
        status: 400,
      });
    }

    if (!emotion) {
      return new NextResponse(
        JSON.stringify({ error: feedbackPostMessage.emotionRequired }),
        { status: 400 }
      );
    }

    if (!category) {
      return new NextResponse(
        JSON.stringify({ error: feedbackPostMessage.categoryRequired }),
        { status: 400 }
      );
    }

    if (!content) {
      return new NextResponse(
        JSON.stringify({ error: feedbackPostMessage.contentRequired }),
        { status: 400 }
      );
    }

    const existingFeedBack = await prismadb.feedBack.findFirst({
      where: {
        user: user
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Cộng thêm 1 ngày khi create
    const timeNextResponse = new Date();
    timeNextResponse.setDate(timeNextResponse.getDate() + 1);

    if (existingFeedBack) {
      const now = new Date();
      if (new Date(existingFeedBack.timeNextResponse) < now) {
        const feedback = await prismadb.feedBack.create({
          data: {
            user: user,
            emotion: emotion,
            category: category,
            content: content,
            timeNextResponse: timeNextResponse
          },
          include: {
            user: true,
          },
        });
        return NextResponse.json(feedback);
      } else {
        return new NextResponse(
          JSON.stringify({ error: feedbackPostMessage.feedbackLimit }),
          { status: 500 }
        );
      }
    } else {
      const feedback = await prismadb.feedBack.create({
        data: {
          user: user,
          emotion: emotion,
          category: category,
          content: content,
          timeNextResponse: timeNextResponse
        },
        include: {
          user: true,
        },
      });
      return NextResponse.json(feedback);
    }

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: feedbackPostMessage.internalError }),
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const feedbackGetMessage = translateFeedbackGet(LanguageToUse)
  try {
    const feedBack = await prismadb.feedBack.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(feedBack);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: feedbackGetMessage }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const feedbackDeleteMessage = translateFeedbackDelete(LanguageToUse)
  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: feedbackDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: feedbackDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: feedbackDeleteMessage.emptyIdsArray }),
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
        JSON.stringify({ error: feedbackDeleteMessage.feedbackIdNotFound }),
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
    // Fetch all cartegories to delete, including their images
    const FeedBackToDelete = await prismadb.feedBack.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = FeedBackToDelete.map((feedBack) => ({
      content: feedBack.content,
      emotion: emotionMap[feedBack.emotion], // Mapped emotion
      category: categoryMap[feedBack.category], // Mapped category
    }));

    // Delete all the cartegories in one operation
    await prismadb.feedBack.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Log the changes in a single database operation
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changesArray.map(
          (change) =>
            `DeleteName: ${change.content}, Emotion: ${change.emotion}, Category: ${change.category}`
        ),
        type: "DELETEFEEDBACK",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: feedbackDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: feedbackDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}
