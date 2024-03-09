import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { managestaffId: string } }
) {
  try {
    if (!params.managestaffId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const managestaff = await prismadb.user.findUnique({
      where: {
        id: params.managestaffId,
      },
    });

    return NextResponse.json(managestaff);
  } catch (error) {
    console.log("[MANAGESTAFF_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { managestaffId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.managestaffId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        "Access denied. Only Admins can perform this action.",
        { status: 403 }
      );
    }

    const managestaff = await prismadb.user.delete({
      where: {
        id: params.managestaffId,
      },
    });

    return NextResponse.json(managestaff);
  } catch (error) {
    console.log("[MANAGESTAFF_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { managestaffId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const {
      name,
      isCitizen,
      numberCCCD,
      issued,
      gender,
      degree,
      phonenumber,
      workingTime,
      imageCredential,
      dateofbirth,
      maritalStatus,
      dateRange,
    } = body;

    if (
      !userId ||
      !name ||
      !numberCCCD ||
      !issued ||
      !gender ||
      !degree ||
      !phonenumber ||
      !workingTime ||
      !imageCredential ||
      !maritalStatus
    ) {
      return new NextResponse("Invalid Error!", { status: 403 });
    }

    if (!params.managestaffId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    await prismadb.user.update({
      where: {
        id: params.managestaffId,
      },
      data: {
        name,
        isCitizen,
        numberCCCD,
        issued,
        gender,
        degree,
        phonenumber,
        workingTime,
        imageCredential,
        maritalStatus,
        dateofbirth,
        dateRange
      },
    });

    const managestaff = await prismadb.user.update({
      where: {
        id: params.managestaffId,
      },
      data: {
        imageCredential: {
          set: imageCredential,
        },
      },
    });

    return NextResponse.json(managestaff);
  } catch (error) {
    console.log("[MANAGESTAFF_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
