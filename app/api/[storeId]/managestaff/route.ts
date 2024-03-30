import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { sendVerifyAccountisCitizen } from "@/lib/mail";

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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, sentVeirifi } = body;
    // Update the user's emailVerified status
    const updatedUser = await prismadb.user.update({
      where: { id },
      data: { sentVeirifi: sentVeirifi },
    });
    // Send verification email only if emailVerify is true
    let userEmail = null;
    const user = await prismadb.user.findUnique({
      where: { id },
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

export async function POST(req: Request) {
  try {
    // Initialize an array to store emails sent
    const sentEmails = [];

    // Get all users
    const allUsers = await prismadb.user.findMany();

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
      }
    }
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
