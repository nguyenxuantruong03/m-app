import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { sendVerifyAccountisCitizen } from "@/lib/mail";
import { currentUser } from "@/lib/auth";

type ManageStaffValue = boolean | undefined | null;

interface ChangeRecord {
  oldValue: ManageStaffValue;
  newValue: ManageStaffValue;
}

export async function GET(req: Request) {
  try {
    const managestaff = await prismadb.user.findMany();

    return NextResponse.json(managestaff);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get managestaff." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { managestaffId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { id, sentVeirifi } = body;
    const user = await prismadb.user.findUnique({
      where: { id },
    });
    // Update the user's emailVerified status
    const updatedUser = await prismadb.user.update({
      where: { id },
      data: { sentVeirifi: sentVeirifi },
    });
    // Send verification email only if emailVerify is true
    let userEmail = null;

    // Kiểm tra sự thay đổi của sentVeirifi
    const sentVeirifiChanges = {
      email: user?.email,
      oldValue: user?.sentVeirifi,
      newValue: updatedUser.sentVeirifi,
    };

    // Log sự thay đổi của sentVeirifi
    const oldChanges = [`SentVeirifi: ${sentVeirifiChanges.oldValue}`];
    const newChanges = [
      `SentUser: ${sentVeirifiChanges.email}, SentVeirifi: ${sentVeirifiChanges.newValue}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: newChanges,
        oldChange: oldChanges,
        type: "UPDATE-SENTVERIFY-MANAGESTAFF",
        user: userId?.email || "",
      },
    });

    if (sentVeirifi) {
      // Check if the user has a valid email before sending the email
      if (user && user.email) {
        await sendVerifyAccountisCitizen(user.email);
        userEmail = user.email; // Save the user's email
      }
    }
    return new NextResponse(JSON.stringify({ updatedUser, userEmail }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch managestaff." }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { managestaffId: string; storeId: string } }
) {
  const userId = await currentUser();
  try {
    // Khởi tạo một mảng để lưu trữ email đã gửi
    const sentEmails = [];
    //Khỏi tạo một Object để lưu trữ changes
    const changes: Record<string, ChangeRecord> = {};

    // Get all users
    const allUsers = await prismadb.user.findMany({
      where: {
        role: {
          in: ["STAFF"],
        },
      },
    });

    // Loop through each user
    for (const user of allUsers) {
      // Check if sentVeirifi is false
      if (!user.sentVeirifi) {
        // Send verification email
        await sendVerifyAccountisCitizen(user.email);
        // Update sentVeirifi to true
        await prismadb.user.update({
          where: { id: user.id },
          data: { sentVeirifi: true },
        });

        // Add the email to the sentEmails array
        sentEmails.push(user.email);

        // Log changes
        changes[`sentVeirifi_${user.email}`] = {
          oldValue: user.sentVeirifi,
          newValue: true,
        };
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATE-SENTVERIFY-ALL-MANAGESTAFF",
        user: userId?.email || "",
      },
    });

    // Return the list of sent emails as a JSON response
    return new NextResponse(JSON.stringify(sentEmails), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post managestaff." }),
      { status: 500 }
    );
  }
}
