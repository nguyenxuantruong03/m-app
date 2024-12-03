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
import {
  translateFavoritesNameChart,
  translateSelectDateMessage,
} from "@/translate/translate-client";
import {
  translateCuttingStone,
  translateElectricWire,
  translateFan,
  translateGlue,
  translateLightBulb,
  translateLock,
  translatePaint,
  translatePin,
  translatePipe,
  translateSocket,
  translateBathroom,
  translateCommonUse,
} from "@/translate/translate-client";

interface RadarChartData {
  subject: string;
  totalFavoriteType?: number;
  totalFavoriteProduct?: number;
  createdAt?: number;
}

interface RadarChartProps {
  radarChartData: RadarChartData[];
  loading: boolean;
  languageToUse: string;
}

const RadarChart = ({
  radarChartData,
  loading,
  languageToUse,
}: RadarChartProps) => {
  //languages
  const selectDataMessgae = translateSelectDateMessage(languageToUse);
  const pinMesage = translatePin(languageToUse);
  const fanMessage = translateFan(languageToUse);
  const pipeMessage = translatePipe(languageToUse);
  const electricWireMessage = translateElectricWire(languageToUse);
  const cuttingStoneMessage = translateCuttingStone(languageToUse);
  const lockMessage = translateLock(languageToUse);
  const glueMessage = translateGlue(languageToUse);
  const socketMessage = translateSocket(languageToUse);
  const paintMessage = translatePaint(languageToUse);
  const bathroomMessage = translateBathroom(languageToUse);
  const lightBlubMessage = translateLightBulb(languageToUse);
  const commonUseMessage = translateCommonUse(languageToUse);
  const favoriteNameChartMessage = translateFavoritesNameChart(languageToUse);

  const productTypeDisplayNames: Record<string, string> = {
    PRODUCT: pinMesage,
    PRODUCT1: fanMessage,
    PRODUCT2: pipeMessage,
    PRODUCT3: electricWireMessage,
    PRODUCT4: cuttingStoneMessage,
    PRODUCT5: lockMessage,
    PRODUCT6: glueMessage,
    PRODUCT7: socketMessage,
    PRODUCT8: paintMessage,
    PRODUCT9: bathroomMessage,
    PRODUCT10: lightBlubMessage,
    PRODUCT11: commonUseMessage,
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
          {selectDataMessgae}
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
          name={favoriteNameChartMessage.name1}
          dataKey="favorite"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name={favoriteNameChartMessage.name2}
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
