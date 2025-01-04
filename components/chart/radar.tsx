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
import { useTranslations } from "next-intl";

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

const RadarChart = ({
  radarChartData,
  loading,
}: RadarChartProps) => {
  const t = useTranslations()
  const productTypeDisplayNames: Record<string, string> = {
    PRODUCT: t("product.pin"),
    PRODUCT1: t("product.fan"),
    PRODUCT2: t("product.pipe"),
    PRODUCT3: t("product.electricWire"),
    PRODUCT4: t("product.cuttingStone"),
    PRODUCT5: t("product.lock"),
    PRODUCT6: t("product.glue"),
    PRODUCT7: t("product.socket"),
    PRODUCT8: t("product.paint"),
    PRODUCT9: t("product.bathroom"),
    PRODUCT10: t("product.lightBlub"),
    PRODUCT11: t("product.commonItem"),
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
        <span className="text-center dark:text-slate-500 text-slate-900">
          {t("chart.selectDate")}
        </span>
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
          name={t("chart.totalFavorite")}
          dataKey="favorite"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name={t("chart.totalFavoriteProduct")}
          dataKey="favoriteProduct"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Tooltip labelClassName="dark:text-slate-500 text-slate-900" />
        <Legend />
      </ChartRadar>
    </ResponsiveContainer>
  );
};

export default RadarChart;
