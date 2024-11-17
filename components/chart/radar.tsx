import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as ChartRadar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

interface RadarChartData {
  subject: string;
  totalFavoriteType?: number;
  totalFavoriteProduct?: number;
  createdAt?: number;
}

interface RadarChartProps {
  radarChartData: RadarChartData[];
  loading: boolean;
}

const RadarChart = ({ radarChartData, loading }: RadarChartProps) => {
  const productTypeDisplayNames: Record<string, string> = {
    PRODUCT: "Pin",
    PRODUCT1: "Quạt",
    PRODUCT2: "Ống nhựa, ống lưới xanh",
    PRODUCT3: "Dây điện",
    PRODUCT4: "Đá cắt",
    PRODUCT5: "Ổ khóa",
    PRODUCT6: "Keo",
    PRODUCT7: "Ổ cắm, mặt ổ cắm",
    PRODUCT8: "Sơn",
    PRODUCT9: "Vật liệu nhà tắm",
    PRODUCT10: "Bóng đèn",
    PRODUCT11: "Đồ thường dùng",
  };

  // Hàm để chuyển đổi subject thành tên hiển thị
  const getProductTypeDisplayName = (subject: string): string => {
    return productTypeDisplayNames[subject] || subject; // Trả về tên hiển thị hoặc subject nếu không tìm thấy
  };

  if (loading) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <div className="flex justify-center h-full">
          <Skeleton className="h-[350px] w-full max-w-5xl rounded-md" />
        </div>
      </ResponsiveContainer>
    );
  }

  if (!radarChartData) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <span className="text-center dark:text-slate-500 text-slate-900">Please select date to find data...</span>
      </div>
    );
  }

  // Format dữ liệu để chỉ lấy các mục có dữ liệu liên quan đến sản phẩm hoặc yêu thích
  const formattedData = radarChartData.map((item) => ({
    subject: getProductTypeDisplayName(item.subject),
    favorite: item.totalFavoriteType || 0,
    favoriteProduct: item.totalFavoriteProduct || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartRadar
        outerRadius={90}
        width={730}
        height={250}
        data={formattedData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Radar
          name="Total Favorite"
          dataKey="favorite"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Total Favorite Product"
          dataKey="favoriteProduct"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Tooltip labelClassName="dark:text-slate-500 text-slate-900"/>
        <Legend />
      </ChartRadar>
    </ResponsiveContainer>
  );
};

export default RadarChart;
