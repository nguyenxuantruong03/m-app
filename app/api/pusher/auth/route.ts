import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  const requestData = await req.formData();
  const socketId = requestData.get('socket_id') as string;
  const channel = requestData.get('channel_name') as string;

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized",{status: 401 });
  }

  if (!socketId || !channel) {
    return new NextResponse("Invalid request body", { status:400 });
  }

  try {
    const data = { user_id: session.user.email };
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return NextResponse.json(authResponse);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
