import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      // Giờ hiện tại ở múi giờ Việt Nam (UTC+7)
      const now = new Date();
      now.setHours(now.getHours() + 7);
  
      // Tính thời gian 24 giờ trước
      const twentyFourHoursAgo = new Date(now);
      twentyFourHoursAgo.setHours(now.getHours() - 24);
  
      // Lấy danh sách tin nhắn sẽ bị xóa để tính toán trước
      const messagesToDelete = await prismadb.message.findMany({
        where: {
          createdAt: {
            lt: twentyFourHoursAgo,
          },
        },
      });
  
      // Tính tổng số lượng tin nhắn
      const totalDeleted = messagesToDelete.length;
  
      // Tính tổng dung lượng toàn bộ tin nhắn (KB)
      const totalSizeInKB =
        messagesToDelete.reduce((total, message) => {
          const messageSize = Buffer.byteLength(JSON.stringify(message), "utf-8"); // Tính kích thước JSON
          return total + messageSize;
        }, 0) / 1024; // Chuyển đổi sang KB
  
      // Trả về tổng số lượng và dung lượng đã xóa
      return NextResponse.json({
        totalDeleted,
        totalSizeInKB: totalSizeInKB.toFixed(2), // Làm tròn 2 chữ số thập phân
      });
    } catch (error: any) {
      console.error("Error deleting messages:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  

  export async function DELETE(request: Request) {
    try {
      // Giờ hiện tại ở múi giờ Việt Nam (UTC+7)
      const now = new Date();
      now.setHours(now.getHours() + 7);
  
      // Tính thời gian 24 giờ trước
      const twentyFourHoursAgo = new Date(now);
      twentyFourHoursAgo.setHours(now.getHours() - 24);
  
      // Xóa các tin nhắn cũ hơn 24 giờ
      await prismadb.message.deleteMany({
        where: {
          createdAt: {
            lt: twentyFourHoursAgo,
          },
        },
      });
  
      // Trả về kết quả thành công
      return NextResponse.json({ message: "Xóa thành công các tin nhắn cũ." });
    } catch (error: any) {
      console.error("Error deleting messages:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  