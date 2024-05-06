import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { sendUpdateManageStaff } from "@/lib/mail-sendUpdate-Staff";

export async function GET(
  req: Request,
  { params }: { params: { managestaffId: string } }
) {
  try {
    if (!params.managestaffId) {
      return new NextResponse(
        JSON.stringify({ error: "Managestaff id is required!" }),
        { status: 400 }
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
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
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
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
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
        JSON.stringify({ error: "Hình ảnh cmnd is required!" }),
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
        userId: {
          equals: UserRole.USER,
        },
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
        imageCredential,
        dateofbirth,
        dateRange,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ['emailVerified', 'lastlogin', 'createdAt', 'updatedAt','dateofbirth','dateRange','imageCredential',"urlimageCheckAttendance","codeNFC","isCitizen"];

    // Bước 3: So sánh dữ liệu cũ và mới
    const changes: { [key: string]: { oldValue: any; newValue: any } } = {};
    for (const key in existingData) {
      if (existingData.hasOwnProperty(key) && managestaff.hasOwnProperty(key)) {
        if (
          existingData[key as keyof typeof existingData] !==
          managestaff[key as keyof typeof managestaff]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingData[key as keyof typeof existingData],
              newValue: managestaff[key as keyof typeof managestaff],
            };
          }
        }
      }
    }

    await sendUpdateManageStaff(
      userId?.email,
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
