"use client";
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "../ui/button";
import { FileDown, FolderDown } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { myfont } from "./../../times new roman-normal";
import { BillboardColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/billboards/components/columns";
import { CategoriesColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/categories/components/columns";
import { ProductColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/product/components/columns";
import { OrderColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/orders/components/columns";
import { ProductDetailColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/productdetail/components/columns";
import { SalaryStaffsColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/salarystaff/components/column";
import { SentEmailUserColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/sentmailuser/components/columns";
import { SettingUsersColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/settingusers/components/column";
import { ShippingRatesColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/shippingrates/components/columns";
import { TaxRateColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/taxrate/components/columns";
import { CouponColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/coupon/components/columns";
import { ManageAttendancesColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/manageattendance/components/column";
import { ManageStaffsColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/managestaff/components/column";
import { WheelSpinColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/wheelSpin/components/column";
import { CommentColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/comment/components/column";
import { SystemsColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/system/components/column";
import { StoreColumn } from "@/app/[locale]/(dashboard)/store/components/columns";
import { FeedBackColumn } from "@/app/[locale]/(dashboard)/[storeId]/(routes)/feedback/components/columns";
import { useTranslations } from "next-intl";

interface DownloadfileProps {
  data:
    | BillboardColumn[]
    | WheelSpinColumn[]
    | CommentColumn[]
    | CategoriesColumn[]
    | ProductColumn[]
    | OrderColumn[]
    | ProductDetailColumn[]
    | SalaryStaffsColumn[]
    | SentEmailUserColumn[]
    | SettingUsersColumn[]
    | ShippingRatesColumn[]
    | TaxRateColumn[]
    | CouponColumn[]
    | ManageAttendancesColumn[]
    | ManageStaffsColumn[]
    | SystemsColumn[] 
    | StoreColumn[]
    | FeedBackColumn[]
  filename: string;
}

const Downloadfile: React.FC<DownloadfileProps> = ({ data, filename }) => {
  const t = useTranslations()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const handlePdfDownload = () => {
    const doc = new jsPDF("landscape", "px", "a4", true);

    doc.addFileToVFS("times new roman-normal.ttf", myfont);
    doc.addFont("times new roman-normal.ttf", "times new roman", "normal");
    doc.setFont("times new roman");

    autoTable(doc, {
      head: [Object.keys(data[0])],
      body: data.map(Object.values),
      headStyles: {
        font: "times new roman",
        textColor: [0, 0, 0], //Black
        fontSize: 12,
      },
      bodyStyles: { font: "times new roman" },
    });
    const pages = doc.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.width; //Optional
    const pageHeight = doc.internal.pageSize.height; //Optional
    doc.setFontSize(10); //Optional
    for (let j = 1; j < pages + 1; j++) {
      let horizontalPos = pageWidth / 2; //Can be fixed number
      let verticalPos = pageHeight - 10; //Can be fixed number
      doc.setPage(j);
      doc.text(
        `${j} of ${pages} - by: Nguyen Xuan Truong`,
        horizontalPos,
        verticalPos,
        {
          align: "center", //Optional text styling});
        }
      );
    }
    doc.save(`${filename}.pdf`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <FolderDown className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">{t("downloadFile.downloadFile")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("downloadFile.statisticalDocuments")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={handlePdfDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              {t("downloadFile.downloadPdf")}
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={handleDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              {t("downloadFile.downloadExcel")}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Downloadfile;
