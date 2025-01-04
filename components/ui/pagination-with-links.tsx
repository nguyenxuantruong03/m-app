"use client";

import { type ReactNode } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeOptions: number[];
    onPageSizeChange?: (newPageSize: number) => void;
  };
  totalPages: number; // Đổi từ totalCount sang totalPages
  pageSize: number;
  page: number;
  setCurrentPage: (page: number) => void;
}

/**
 * PaginationWithLinks using PaginationLink
 *
 * @example
 * ```tsx
 * <PaginationWithLinks
 *   page={1}
 *   pageSize={20}
 *   totalPages={25}
 * />
 * ```
 */
export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalPages,
  page,
  setCurrentPage
}: PaginationWithLinksProps) {
  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className="dark:text-slate-200"
              isActive={page === i}
              onClick={() => setCurrentPage(i)} // Cập nhật currentPage khi click
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="dark:text-slate-200"
            isActive={page === 1}
            onClick={() => setCurrentPage(1)} // Cập nhật currentPage khi click
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className="dark:text-slate-200"
              isActive={page === i}
              onClick={() => setCurrentPage(i)} // Cập nhật currentPage khi click
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="dark:text-slate-200"
            isActive={page === totalPages}
            onClick={() => setCurrentPage(totalPages)} // Cập nhật currentPage khi click
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      {pageSizeSelectOptions && (
        <div className="flex flex-col gap-4 flex-1">
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            pageSize={pageSize}
            onPageSizeChange={pageSizeSelectOptions.onPageSizeChange}
          />
        </div>
      )}
      <Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(page - 1, 1))} // Cập nhật trang khi click
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={`dark:text-slate-200 ${page === 1 ? "pointer-events-none opacity-50" : undefined}`}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(Math.min(page + 1, totalPages))} // Cập nhật trang khi click
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : undefined}
              className={`dark:text-slate-200 ${page === totalPages ? "pointer-events-none opacity-50" : undefined}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}


function SelectRowsPerPage({
  options,
  pageSize,
  onPageSizeChange,
}: {
  options: number[];
  pageSize: number;
  onPageSizeChange?: (newPageSize: number) => void;
}) {
  const t = useTranslations()
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm dark:text-slate-200">{t("action.productPerPage")}</span>
      <select
        className="border px-2 py-1 dark:text-slate-200"
        value={pageSize}
        onChange={(e) => {
          const newSize = Number(e.target.value);
          if (onPageSizeChange) {
            onPageSizeChange(newSize);
          } else {
            window.location.href = `?pageSize=${newSize}`;
          }
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
