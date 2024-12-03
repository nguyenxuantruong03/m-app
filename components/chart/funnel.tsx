import React from "react";
import {
  Funnel,
  FunnelChart as ChartFunnel,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { translateSelectDateMessage } from "@/translate/translate-client";

interface RoleData {
  role: string;
  value: number;
  createdAt: string[]; // Mảng chứa các ngày createdAt
}

interface FunnelChartProps {
  funnelChartData: RoleData[];
  loading: boolean;
  languageToUse: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({
  funnelChartData,
  loading,
  languageToUse,
}) => {
  //language
  const selectDataMessgae = translateSelectDateMessage(languageToUse);

  // Hàm để lấy màu cho từng vai trò
  const getColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "#FF6347"; // Tomato
      case "USER":
        return "#4682B4"; // SteelBlue
      case "STAFF":
        return "#32CD32"; // LimeGreen
      case "SHIPPER":
        return "#FFD700"; // Gold
      case "GUEST":
        return "#FF69B4"; // HotPink
      case "MARKETING":
        return "#6A5ACD"; // SlateBlue
      default:
        return "#8884d8"; // Màu mặc định
    }
  };

  // Chuyển đổi và sắp xếp dữ liệu để phù hợp với yêu cầu của biểu đồ funnel
  const funnelData = funnelChartData
    ?.filter((roleData) => roleData.value > 0) // Lọc các giá trị lớn hơn 0
    .sort((a, b) => b.value - a.value) // Sắp xếp theo giá trị giảm dần
    .map((roleData) => ({
      name: roleData.role,
      value: roleData.value,
      fill: getColor(roleData.role), // Tô màu cho từng vai trò
    }));

  // Hàm render Legend tùy chỉnh
  const renderLegend = () => {
    return (
      <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
        {funnelData?.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
            <span
              style={{
                backgroundColor: entry.fill,
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                marginRight: "5px",
              }}
            />
            <span>{`${entry.name}`}</span> {/* Hiển thị màu và tên vai trò */}
          </li>
        ))}
      </ul>
    );
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

  if (!funnelChartData) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <span className="text-center dark:text-slate-500 text-slate-900">
          {selectDataMessgae}
        </span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartFunnel width={730} height={250}>
        <Tooltip />
        <Legend content={renderLegend} />
        <Funnel
          dataKey="value"
          data={funnelData}
          isAnimationActive // Bật hoạt hình
          animationDuration={800} // Thời gian hoạt hình
        >
          <LabelList
            dataKey="name" // Sử dụng tên vai trò làm label
            position="inside" // Đặt label bên trong
            fill="#333"
          />
        </Funnel>
      </ChartFunnel>
    </ResponsiveContainer>
  );
};

export default FunnelChart;
