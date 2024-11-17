import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, emotion, category, content } = body;

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "UserId is required" }), {
        status: 400,
      });
    }

    if (!emotion) {
      return new NextResponse(
        JSON.stringify({ error: "Emotion is required" }),
        { status: 400 }
      );
    }

    if (!category) {
      return new NextResponse(
        JSON.stringify({ error: "Category is required" }),
        { status: 400 }
      );
    }

    if (!content) {
      return new NextResponse(
        JSON.stringify({ error: "Content is required" }),
        { status: 400 }
      );
    }

    const existingFeedBack = await prismadb.feedBack.findFirst({
      where: {
        userId: userId
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
            userId: userId,
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
          JSON.stringify({ error: "Bạn đã phản hồi hay quay lại sau 1 ngày để phản hồi khác!" }),
          { status: 500 }
        );
      }
    } else {
      const feedback = await prismadb.feedBack.create({
        data: {
          userId: userId,
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
      JSON.stringify({ error: "Internal error get feedback." }),
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const feedBack = await prismadb.feedBack.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(feedBack);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get feedBack." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { ids } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xóa store!" }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Mảng IDs không được trống!" }),
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
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    // Mảng emotion và category để ánh xạ số thành mô tả
    const emotionMap: { [key: number]: string } = {
      1: "Tốt",
      2: "Tạm",
      3: "Tệ",
      4: "Phục vụ kém",
      5: "Quá tệ",
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
        user: userId?.email || "",
      },
    });

    return NextResponse.json({ message: "Xóa thành công!" });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete store." }),
      { status: 500 }
    );
  }
}
