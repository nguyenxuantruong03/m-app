import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { sendUpdateManageStaff } from "@/lib/mail-sendUpdate-Staff";
import { sendDismissal } from "@/lib/mail";
import { format } from "date-fns";


type ManageStaffValue = string | number | boolean | string[] | Date | undefined | null;

interface ChangeRecord {
  oldValue: ManageStaffValue;
  newValue: ManageStaffValue;
}

export async function GET(
  req: Request,
  { params }: { params: { managestaffId: string } }
) {
  const userId = await currentUser();
  try {
    if (!params.managestaffId) {
      return new NextResponse(
        JSON.stringify({ error: "Managestaff id is required!" }),
        { status: 400 }
      );
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xem Manage Staff!" }),
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
      JSON.stringify({ error: "Internal error get managestaff." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { managestaffId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xóa Manage Staff!" }),
        { status: 403 }
      );
    }

    if (!params.managestaffId) {
      return new NextResponse(
        JSON.stringify({ error: "Managestaff id is required!" }),
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

    const userRole = await prismadb.user.findUnique({
      where: {
        id: params.managestaffId,
      },
    });

    const managestaff = await prismadb.user.update({
      where: {
        id: params.managestaffId,
      },
      data:{
        role: UserRole.USER,
      }
    });

    const sentVeirifiChanges = {
      newValue: managestaff?.role,
      olevalue: userRole?.role,
    };

    // Log sự thay đổi của sentVeirifi
    const newChange = [`User: ${sentVeirifiChanges.newValue}`];
    const oldChange = [`User: ${sentVeirifiChanges.olevalue}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
  const response=  await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: newChange,
        oldChange: oldChange,
        type: "UPDATE-ROLE-MANAGESTAFF",
        user: userId?.email || "",
      },
    });

    const dateonow = response.createdAt
      ? format(response.createdAt, "dd/MM/yyyy '-' HH:mm:ss a")
      : "";

    await sendDismissal(
      managestaff.email,
      managestaff.name,
      dateonow
    )

    return NextResponse.json(managestaff);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete managestaff." }),
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

    const {
      email,
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
      timestartwork,
      maritalStatus,
      dateRange,
      urlimageCheckAttendance,
      daywork,
      codeNFC,
    } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền cập nhật Manage Staff!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    if (!numberCCCD) {
      return new NextResponse(
        JSON.stringify({ error: "Sô CMND is required!" }),
        { status: 400 }
      );
    }

    if (!issued) {
      return new NextResponse(
        JSON.stringify({ error: "Nơi cấp is required!" }),
        { status: 400 }
      );
    }

    if (!gender) {
      return new NextResponse(
        JSON.stringify({ error: "Giới tính is required!" }),
        { status: 400 }
      );
    }

    if (!degree) {
      return new NextResponse(
        JSON.stringify({ error: "Bằng cấp is required!" }),
        { status: 400 }
      );
    }

    if (!phonenumber) {
      return new NextResponse(
        JSON.stringify({ error: "Số diện thoại is required!" }),
        { status: 400 }
      );
    }

    if (!workingTime) {
      return new NextResponse(
        JSON.stringify({ error: "Thời gian làm việc is required!" }),
        { status: 400 }
      );
    }

    if (!imageCredential) {
      return new NextResponse(
        JSON.stringify({ error: "Hình ảnh is required!" }),
        { status: 400 }
      );
    }

    if (!daywork) {
      return new NextResponse(
        JSON.stringify({ error: "Hãy chọn làm thứ mấy!" }),
        { status: 400 }
      );
    }

    if (!maritalStatus) {
      return new NextResponse(
        JSON.stringify({ error: "Tính trạng hôn nhân is required!" }),
        { status: 400 }
      );
    }

    if (!params.managestaffId) {
      return new NextResponse(
        JSON.stringify({ error: "Managestaff id is required!" }),
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

    // Bước 1: Truy vấn dữ liệu hiện tại
    const existingData = await prismadb.user.findUnique({
      where: {
        id: params.managestaffId,
      },
    });

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
        issued,
        degree,
        workingTime,
        timestartwork,
        maritalStatus,
        daywork,
        urlimageCheckAttendance,
        codeNFC,
        isCitizen,
        imageCredential: {
          createMany: {
            data: [...imageCredential.map((image: { url: string }) => image)],
          },
        },
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
        user: userId?.email || "",
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
      JSON.stringify({ error: "Internal error patch managestaff." }),
      { status: 500 }
    );
  }
}
