import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

interface ProductData {
  totalSold: number;
  totalReviews: number;
  totalComments: number;
  totalOrderItems: number;
}

type RadialChartData = Record<string, ProductData>;

interface RadialChartProps {
  radialChartData: RadialChartData | null | undefined; // Định nghĩa kiểu cho phép null hoặc undefined
  loading: boolean;
}

// Tên sản phẩm
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

const RadialChart = ({ radialChartData, loading }: RadialChartProps) => {
  if (loading) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <div className="flex justify-center h-full">
          <Skeleton className="h-[350px] w-full max-w-5xl rounded-md" />
        </div>
      </ResponsiveContainer>
    );
  }

  if (!radialChartData) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <span className="text-center dark:text-slate-500 text-slate-900">Please select date to find data...</span>
      </div>
    );
  }

  // Hàm để gán màu dựa trên index
  const getFillColor = (index: number) => {
    const colors = [
      "#8884d8",
      "#83a6ed",
      "#8dd1e1",
      "#82ca9d",
      "#a4de6c",
      "#d0ed57",
      "#ffc658",
    ];
    return colors[index % colors.length];
  };

  // Chuyển đổi radialChartData thành mảng dữ liệu phù hợp với RadialBarChart
  const data = Object.keys(radialChartData)
    .map((productType, index) => {
      const productData = radialChartData[productType];

      return {
        name: productTypeDisplayNames[productType] || productType, // Sử dụng tên sản phẩm từ productTypeDisplayNames
        totalSold: productData.totalSold, // totalSold
        totalOrderItems: productData.totalOrderItems, // totalOrderItems
        fill: getFillColor(index), // Gán màu khác nhau cho mỗi productType
      };
    })
    .filter((item) => item.totalSold > 0 || item.totalOrderItems > 0); // Lọc ra các mục có totalSold hoặc totalOrderItems > 0

  if (loading) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <div className="flex justify-center h-full">
          <Skeleton className="h-[350px] w-full max-w-5xl rounded-md" />
        </div>
      </ResponsiveContainer>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <span className="text-center dark:text-slate-500 text-slate-900">Please select date to find data...</span>
      </div>
    );
  }

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >
    <div style={{ width: "50%", paddingRight: "10px" }}>
      <ResponsiveContainer width="100%" height={350}>
        <RadialBarChart
          innerRadius="10%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            label={{ fill: "#666", position: "insideStart" }}
            background
            dataKey="totalSold" // Biểu đồ cho totalSold
          />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
          <Tooltip
            labelClassName="dark:text-slate-500 text-salte-900"
            formatter={(value, name, props) => [props.payload.name, value]}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <h4 className="text-center font-semibold text-red-500">Total Sold</h4>
    </div>
  
    <div style={{ width: "50%", paddingLeft: "10px" }}>
      <ResponsiveContainer width="100%" height={350}>
        <RadialBarChart
          innerRadius="10%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            label={{ fill: "#666", position: "insideStart" }}
            background
            dataKey="totalOrderItems" // Biểu đồ cho totalOrderItems
          />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
          <Tooltip
            labelClassName="dark:text-slate-500 text-salte-900"
            formatter={(value, name, props) => [props.payload.name, value]}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <h4 className="text-center font-semibold text-green-500">
        Total Order Items
      </h4>
    </div>
  </div>
  
  );
};

export default RadialChart;
