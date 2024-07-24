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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  onDelete: (rows: Row<TData>[]) => void;
  onSelect: (rows: Row<TData>[]) => void;
  disable?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onDelete,
  onSelect,
  disable,
  open,
  setOpen,
}: DataTableProps<TData, TValue>) {
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
      onSelect(selectedRows); // Ensure onSelect is called with the correct rows
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

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onDelete(table.getSelectedRowModel().rows);
          table.resetRowSelection();
        }}
        loading={disable}
      />
      <div className="lg:flex items-center py-4 space-y-2 lg:space-y-0 lg:space-x-3 grid grid-rows-2">
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {Object.keys(rowSelection).length > 0 && (
          <Button
            size="sm"
            disabled={disable}
            variant="outline"
            className="ml-auto font-normal text-xs"
            onClick={() => setOpen(true)}
          >
            <Trash className="size-4 mr-2" />
            Delete ({Object.keys(rowSelection).length})
          </Button>
        )}
        <DatePickerWithRange onDateChange={handleDateChange} data={data} />
      </div>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {Object.keys(rowSelection).length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
