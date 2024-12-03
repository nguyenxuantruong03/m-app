"use client";

import { Eye } from "lucide-react";
import { SystemsColumn } from "./column";
import { useState } from "react";
import { ShowSystem } from "@/components/modals/showSystem-modal";

interface CellActionProps {
  data: SystemsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="hidden md:block">
      <ShowSystem isOpen={open} onClose={() => setOpen(false)} data={data}/>
      <Eye onClick={() => setOpen(true)} className="w-5 h-5" />
    </div>
  );
};
