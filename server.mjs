import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // console.log(`Client connected: ${socket.id}`);

    socket.on("share-location", async (data) => {
      const { location, userId } = data;
    
      if (location) {
        // Cập nhật thông tin vị trí và set isSharingLocation = true
        await prisma.user.update({
          where: { id: userId },
          data: {
            locationLat: location.lat,
            locationLng: location.lng,
            isSharingLocation: true, // Set người dùng đang chia sẻ vị trí
          },
        });
    
        // Phát thông tin vị trí kèm userId
        io.emit("update-location", { location, userId });
      }
    });

    socket.on("stop-sharing-location", async (data) => {
      const { userId } = data; 
      // Cập nhật isSharingLocation = false khi người dùng ngừng chia sẻ vị trí
      await prisma.user.update({
        where: { id: userId },
        data: {
          isSharingLocation: false,
        },
      });
    
      // Phát tín hiệu ngừng chia sẻ
      io.emit("stop-sharing-location", { userId });
    });

    socket.on("disconnect", () => {
      // Xử lý ngắt kết nối nếu cần (có thể ngừng chia sẻ vị trí nếu người dùng bị mất kết nối)
    });
  });

  httpServer.listen(port, () => {
    // console.log(`> Ready on http://${hostname}:${port}`);
  });
});
