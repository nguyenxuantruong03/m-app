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

interface DownloadfileProps {
  data: any[];
  filename: string;
}

const Downloadfile: React.FC<DownloadfileProps> = ({ data, filename }) => {
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
    autoTable(doc, {
      head: [Object.keys(data[0])],
      body: data.map(Object.values),
    });
    doc.save(`${filename}.pdf`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <FolderDown className="mr-2 h-4 w-4" />
            Download File
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Statistical documents</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={handlePdfDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              Tải xuống pdf
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={handleDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              Tải xuống excel
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Downloadfile;
