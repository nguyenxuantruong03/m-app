"use server";

import * as z from "zod";

import prismadb from "@/lib/prismadb";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { PostSchema } from "@/schemas";

export const post = async (
  values?: z.infer<typeof PostSchema>,
  id?: string | null
) => {
  if (values) {
    const user = await currentUser();

    if (!user) {
      return { error: "Không được phép!" };
    }

    // Check ban status again after potential update
    if (user.ban) {
      return {
        error:
          "Tài khoản của bạn đã bị khóa. Không thể thay đổi. Hãy kiểm tra Email để biết thời gian mở khóa!",
      };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Không được phép!" };
    }

    const imageReview = values.imageReview;

    if (id) {
      const exitingPostReivew = await prismadb.review.findUnique({
        where: {
          id: id,
        },
      });

      if (exitingPostReivew) {
        await prismadb.review.update({
          where: { id }, // Find review by id
          data: {
            content: values.content,
            rating: values.rating,
            categoryName: values.categoryName,
            productId: values.productId,
            isPublic: values.isPublic,
            imageReview: {
              deleteMany: {}, // Clear existing images
              createMany: {
                data: [...imageReview.map((image: { url: string }) => image)],
              },
            },
          },
        });
        return { success: "Đã cập nhật lại bài viết!" };
      }
    } else {
      await prismadb.review.create({
        data: {
          content: values.content || "",
          rating: values.rating || 1,
          categoryName: values.categoryName || "",
          productId: values.productId || "",
          userId: user.id || "",
          isPublic: values.isPublic,
          imageReview: {
            createMany: {
              data: [...imageReview.map((image: { url: string }) => image)],
            },
          },
        },
      });
      return { success: "Bài viết mới đã được tạo!" };
    }
    
    return {error: "Something went wrong!"}
  } else {
    if(id){
      await prismadb.emoji.deleteMany({
        where: {
          reviewId: id,
        },
      });
      await prismadb.review.delete({
        where: {
          id: id,
        },
      });
      return { success: "Bài viết đã bị xóa khỏi dòng thời gian!" };
    }

    return {error: "Something went wrong!"}

  }
};
