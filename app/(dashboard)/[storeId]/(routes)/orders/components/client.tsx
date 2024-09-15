"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./columns";
import Downloadfile from "@/components/file/downloadfilepage";

interface OrderProps {
  data: OrderColumn[];
}

const formatter = new Intl.NumberFormat("de-DE", {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,  // VND does not commonly use decimal places, but set it as per your need
  maximumFractionDigits: 2   // Ensures no rounding occurs beyond two decimal places
});

const OrderClient: React.FC<OrderProps> = ({ data }) => {
 // Function to calculate the total price for rows where debtShipper is true
 const calculateTotalDebt = () => {
  const filteredData = data.filter((row) => row.debtShipper === true); // Filter rows where debtShipper is true
  const totalDebtPrice = filteredData.reduce((sum, row) => {
    // Remove non-numeric characters (except for digits and dots) and parse as an integer
    const numericPrice = parseInt(row.totalPrice.replace(/[^0-9]/g, ""), 10); // Removing commas and converting to an integer
    return sum + (isNaN(numericPrice) ? 0 : numericPrice); // Handle NaN cases
  }, 0);
  return totalDebtPrice;
};

const totalDebt = calculateTotalDebt(); // Get the calculated total


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Đơn hàng (${data.length})`}
          description="Quản lý đơn hàng sản phẩm"
        />
        <Downloadfile data={data} filename="orders" />
      </div>
      <Separator />
      {/* Display total debt */}
      <div className="my-4">
        <p className="text-lg font-semibold">
          Tổng nợ shipper: {formatter.format(totalDebt)}
        </p>
      </div>
      <DataTable
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        open={false}
        setOpen={() => false}
      />
    </>
  );
};

export default OrderClient;
