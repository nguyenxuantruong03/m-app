import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  BadgePercent,
  CreditCard,
  DollarSign,
  Package,
  ShieldCheck,
} from "lucide-react";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getCount } from "@/actions/get-count";
import { getStockCount, getStockCount2 } from "@/actions/get-stock-count";
import { getTotalPriceOldRevenue } from "@/actions/get-total-priceold";
import { getTotalWarrantyRevenue } from "@/actions/get-total-warranty";
import Chart from "@/components/chart/chart";
import Datastatistics from "@/components/home/datastatistics";
interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalPriceOldRevenue = await getTotalPriceOldRevenue(params.storeId);
  const totalWarrantyRevenue = await getTotalWarrantyRevenue(params.storeId);
  const salesCount = await getCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const stockCount2 = await getStockCount2(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Bảng điều khiển" description="Tổng quan cửa hàng" />
        <Separator />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-xs font-medium">
                Tổng doanh thu
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-xs font-medium">
                Tổng doanh thu chưa giảm giá
              </CardTitle>
              <BadgePercent className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalPriceOldRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-xs font-medium">
                Tổng doanh thu bảo hành
              </CardTitle>
              <ShieldCheck className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalWarrantyRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-xs font-medium">Số đơn hàng</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-xs font-medium">
                Tổng sản phẩm còn
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-xs font-medium">
                Sản phẩm hết hàng
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount2}</div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Chart
            storeId={params.storeId}
          />
        </div>
      </div>
      <Datastatistics storeId={params.storeId}/>
    </div>
  );
};

export default DashboardPage;
