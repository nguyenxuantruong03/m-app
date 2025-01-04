import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { sendUpdateManageStaff } from "@/lib/mail-sendUpdate-Staff";
import { sendDismissal } from "@/lib/mail";
import { format } from "date-fns";
import { createTranslator } from "next-intl";

type ManageStaffValue =
  | string
  | number
  | boolean
  | string[]
  | Date
  | {
      id: string;
      userId: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  | null;

interface ChangeRecord {
  oldValue: ManageStaffValue;
  newValue: ManageStaffValue;
}

export async function GET(
  req: Request,
  { params }: { params: { managestaffId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!params.managestaffId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.manageStaffIdRequired") }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const managestaff = await prismadb.user.findUnique({
      where: {
        id: params.managestaffId,
      },
    });

    return NextResponse.json(managestaff);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.user.internalErrorGetUser") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { managestaffId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!params.managestaffId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.manageStaffIdRequired") }),
        { status: 400 }
      );
    }

    const userRole = await prismadb.user.findUnique({
      where: {
        id: params.managestaffId,
      },
    });

    const managestaff = await prismadb.user.update({
      where: {
        id: params.managestaffId,
      },
      data: {
        role: UserRole.USER,
      },
    });

    const sentVeirifiChanges = {
      newValue: managestaff?.role,
      olevalue: userRole?.role,
    };

    // Log sự thay đổi của sentVeirifi
    const newChange = [`User: ${sentVeirifiChanges.newValue}`];
    const oldChange = [`User: ${sentVeirifiChanges.olevalue}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    const response = await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: newChange,
        oldChange: oldChange,
        type: "UPDATE-ROLE-MANAGESTAFF",
        user: user?.email || "",
      },
    });

    const dateonow = response.createdAt
      ? format(response.createdAt, "dd/MM/yyyy '-' HH:mm:ss a")
      : "";

    await sendDismissal(managestaff.language, managestaff.email, managestaff.name, dateonow);

    return NextResponse.json(managestaff);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.user.internalErrorDeleteUser") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { managestaffId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const {
      email,
      name,
      isCitizen,
      numberCCCD,
      issued,
      gender,
      image,
      degree,
      phonenumber,
      workingTime,
      imageCredential,
      dateofbirth,
      timestartwork,
      maritalStatus,
      dateRange,
      urlimageCheckAttendance,
      daywork,
      codeNFC,
    } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error:  t("toastError.nameRequired") }), {
        status: 400,
      });
    }

    if (!numberCCCD) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.cmndRequired") }),
        { status: 400 }
      );
    }

    if (!issued) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.placeIssuedRequired") }),
        { status: 400 }
      );
    }

    if (!gender) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.genderRequired") }),
        { status: 400 }
      );
    }

    if (!degree) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.degreeRequired") }),
        { status: 400 }
      );
    }

    if (!phonenumber) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.phoneRequired") }),
        { status: 400 }
      );
    }

    if (!workingTime) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.workingTimeRequired") }),
        { status: 400 }
      );
    }

    if (!imageCredential) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.imageRequired") }),
        { status: 400 }
      );
    }

    if (!daywork) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.choosePositionRequired") }),
        { status: 400 }
      );
    }

    if (!maritalStatus) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.maritalStatusRequired") }),
        { status: 400 }
      );
    }

    if (!params.managestaffId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.manageStaffIdRequired") }),
        { status: 400 }
      );
    }

    // Bước 1: Truy vấn dữ liệu hiện tại
    const existingData = await prismadb.user.findUnique({
      where: {
        id: params.managestaffId,
      },
      include: {
        imageCredential: true, // Lấy thông tin các bản ghi imageCredential
      },
    });

    const existingImageCredentials = existingData?.imageCredential || [];

//So sánh dữ liệu mới với dữ liệu hiện tại
const newImageCredentials = imageCredential.map((image: { url: string }) => image.url);

// Kiểm tra nếu dữ liệu mới khác với dữ liệu hiện tại
const isImageCredentialChanged = !existingImageCredentials.some((existingImage) =>
  newImageCredentials.includes(existingImage.url)
);


    // Bước 2: Thực hiện cập nhật dữ liệu mới
    const managestaff = await prismadb.user.update({
      where: {
        id: params.managestaffId,
      },
      data: {
        name,
        phonenumber,
        numberCCCD,
        gender,
        image,
        issued,
        degree,
        workingTime,
        timestartwork,
        maritalStatus,
        daywork,
        urlimageCheckAttendance,
        codeNFC,
        isCitizen,
        imageCredential: isImageCredentialChanged
        ? {
            createMany: {
              data: newImageCredentials.map((url:string) => ({ url })),
            },
          }
        : undefined,
        dateofbirth,
        dateRange,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredSentEmail = [
      "emailVerified",
      "lastlogin",
      "createdAt",
      "updatedAt",
      "dateofbirth",
      "dateRange",
      "imageCredential",
      "image",
      "urlimageCheckAttendance",
      "codeNFC",
      "isCitizen",
    ];

    const ignoredInsystem = [
      "createdAt",
      "updatedAt",
      "emailVerified",
      "lastlogin",
    ];

    const changes: Record<string, ChangeRecord> = {};
    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const newChanges: string[] = [];
    const oldChanges: string[] = [];
    for (const key in existingData) {
      if (existingData.hasOwnProperty(key) && managestaff.hasOwnProperty(key)) {
        if (
          existingData[key as keyof typeof existingData] !==
          managestaff[key as keyof typeof managestaff]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredSentEmail.includes(key)) {
            changes[key] = {
              oldValue: existingData[key as keyof typeof existingData],
              newValue: managestaff[key as keyof typeof managestaff],
            };
          }

          if (!ignoredInsystem.includes(key)) {
            newChanges.push(
              `${key}: { New: '${
                managestaff[key as keyof typeof managestaff]
              }'}`
            );
            oldChanges.push(
              `${key}: { Old: '${
                existingData[key as keyof typeof existingData]
              }'}`
            );
          }
        }
      }
    }
    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: newChanges,
        oldChange: oldChanges,
        type: "UPDATEMANAGESTAFF",
        user: user?.email || "",
      },
    });

    await sendUpdateManageStaff(
      email,
      managestaff.name,
      managestaff.phonenumber,
      managestaff.numberCCCD,
      managestaff.gender,
      managestaff.issued,
      managestaff.degree,
      managestaff.workingTime,
      managestaff.timestartwork,
      managestaff.maritalStatus,
      managestaff.daywork,
      managestaff.urlimageCheckAttendance,
      managestaff.codeNFC,
      managestaff.dateofbirth,
      managestaff.dateRange,
      managestaff.isCitizen,
      changes
    );
    return NextResponse.json(managestaff);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.user.internalErrorPatchUser") }),
      { status: 500 }
    );
  }
}
