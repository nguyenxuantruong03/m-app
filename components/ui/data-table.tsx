"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { AlertModal } from "../modals/alert-modal";
import { DatePickerWithRange } from "./pick-calendar";
import { DateRange } from "react-day-picker";
import { useTranslations } from "next-intl";

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0, // VND does not commonly use decimal places, but set it as per your need
  maximumFractionDigits: 2, // Ensures no rounding occurs beyond two decimal places
});

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  placeholder: string;
  onDelete?: (rows: Row<TData>[]) => void;
  onSelect?: (rows: Row<TData>[]) => void;
  disable?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  showSelected?: boolean;
  showTotal?: boolean;
}

interface DataTableRow {
  totalPrice: string;
  debtShipper: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  placeholder,
  onDelete,
  onSelect,
  disable,
  open,
  setOpen,
  showSelected = true,
  showTotal = false,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations()
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState<TData[]>(data);
  const prevRowSelection = useRef(rowSelection);

  // Add the index column to the columns
  const indexedColumns = [
    {
      id: "index",
      header: "STT",
      cell: (info: { row: { index: number } }) => info.row.index + 1,
    },
    ...columns,
  ];

  const table = useReactTable({
    data: filteredData,
    columns: indexedColumns,
    state: {
      columnFilters,
      sorting,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    if (prevRowSelection.current !== rowSelection) {
      const selectedRows = table.getSelectedRowModel().rows;
      onSelect?.(selectedRows); // Ensure onSelect is called with the correct rows
      prevRowSelection.current = rowSelection; // Update the ref
    }
  }, [rowSelection, onSelect, table]);

  const handleDateChange = (dateRange: DateRange | undefined) => {
    if (dateRange?.from && dateRange.to) {
      const filtered = data.filter((item: any) => {
        const itemDate = new Date(item.createdAt);
        if (dateRange.from && dateRange.to) {
          return itemDate >= dateRange.from && itemDate <= dateRange.to;
        }
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Show all data if no date range is selected
    }
  };

  const calculateTotalDebt = () => {
    const totalDebt = (filteredData as DataTableRow[]) // Cast filteredData to DataTableRow[]
      .filter((row) => row.debtShipper === true)
      .reduce((sum, row) => {
        const numericPrice = parseInt(row.totalPrice.replace(/[^0-9]/g, ""), 10);
        return sum + (isNaN(numericPrice) ? 0 : numericPrice);
      }, 0);
    return totalDebt;
  };
  
  const calculateTotal = () => {
    const total = (filteredData as DataTableRow[]) // Cast filteredData to DataTableRow[]
      .filter((row) => row.debtShipper === false)
      .reduce((sum, row) => {
        const numericPrice = parseInt(row.totalPrice.replace(/[^0-9]/g, ""), 10);
        return sum + (isNaN(numericPrice) ? 0 : numericPrice);
      }, 0);
    return total;
  };

  return (
    <div>
      <AlertModal
        isOpen={open ?? false}
        onClose={() => setOpen?.(false)}
        onConfirm={() => {
          onDelete?.(table.getSelectedRowModel().rows);
          table.resetRowSelection();
        }}
        loading={disable}
      />
      <div className="lg:flex items-center py-4 space-y-2 lg:space-y-0 lg:space-x-3 grid grid-rows-2">
        <Input
          placeholder={placeholder}
          value={
            (table.getColumn(searchKey || "")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchKey || "")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {Object.keys(rowSelection).length > 0 && (
          <Button
            size="sm"
            disabled={disable}
            variant="outline"
            className="ml-auto font-normal text-xs"
            onClick={() => setOpen?.(true)}
          >
            <Trash className="size-4 mr-2" />
            {t("action.delete")} ({Object.keys(rowSelection).length})
          </Button>
        )}
        <DatePickerWithRange onDateChange={handleDateChange} data={data} />
      </div>
      {/* Conditionally display total calculations if showTotal is true */}
      {showTotal && (
        <div className="my-4">
          <p className="text-lg font-semibold">
            <span className="text-red-500">{t("dataTable.totalShipperDebt")}:</span> <span className="text-yellow-500">{formatter.format(calculateTotalDebt())}</span>
          </p>
          <p className="text-lg font-semibold">
            <span className="text-green-500">{t("dataTable.totalCollectedFromShipper")}:</span> {formatter.format(calculateTotal())}
          </p>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ minWidth: "150px" }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ minWidth: "150px" }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center dark:text-slate-200"
                >
                  {t("dataTable.noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {showSelected && (
          <div className="flex-1 text-sm text-muted-foreground">
            {Object.keys(rowSelection).length} {t("dataTable.of")}
            {table.getFilteredRowModel().rows.length} {t("dataTable.rowsSelected")}.
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t("action.previousPage")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("action.nextPage")}
        </Button>
      </div>
    </div>
  );
}
