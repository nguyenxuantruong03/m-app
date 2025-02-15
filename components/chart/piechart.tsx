import {
  PieChart as ChartPie,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Sector,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";

interface PieChartProps {
  pieChartData: {
    deliveryMethod: { pickup: number; online: number };
    returnProduct: { pickup: number; online: number };
    gender: { male: number; female: number; other: number };
    createdAt: string;
  };
  loading: boolean;
}

const COLORS = [
  ["#0088FE", "#00C49F"], // Màu cho Delivery Method
  ["#FFBB28", "#FF8042", "#2f5ebd"], // Màu cho Gender
  ["#82ca9d", "#8884d8"], // Màu cho Return Method
];

const renderCustomizedLabel = ({ x, y, name, value }: any) => {
  if (value > 0) {
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#6b7280"
        style={{ fontSize: "10px", fontWeight: "bold" }}
      >
        {`${name}: ${value}`}
      </text>
    );
  }
  return null;
};

// Hình dạng khi hover cho biểu đồ sector
const activeShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill="#6b7280"
        style={{ fontSize: "10px", fontWeight: "bold" }}
      >
        {`${payload.name}: ${value}`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10} // Tăng kích thước khi hover
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const PieChart = ({ pieChartData, loading }: PieChartProps) => {
  const t = useTranslations()

  if (loading) {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <div className="flex justify-center h-full">
          <Skeleton className="h-[200px] w-full max-w-5xl rounded-md" />
        </div>
      </ResponsiveContainer>
    );
  }

  if (!pieChartData) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <span className="text-center dark:text-slate-500 text-slate-900">
          {t("chart.selectDate")}
        </span>
      </div>
    );
  }

  const data01 = [
    {
      name: t("chart.pickupDelivery"),
      value: pieChartData?.deliveryMethod?.pickup,
    },
    {
      name: t("chart.onlineDelivery"),
      value: pieChartData?.deliveryMethod?.online,
    },
  ];

  const data02 = [
    { name: t("chart.male"), value: pieChartData?.gender?.male },
    { name: t("chart.female"), value: pieChartData?.gender?.female },
    { name: t("chart.other"), value: pieChartData?.gender?.other },
  ];

  const data03 = [
    {
      name: t("chart.pickupReturn"),
      value: pieChartData?.returnProduct?.pickup,
    },
    {
      name: t("chart.onlineReturn"),
      value: pieChartData?.returnProduct?.online,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-around w-full">
        {/* Pie for Delivery Method */}
        <ResponsiveContainer width="30%" height={200}>
          <ChartPie>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="60%"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[0][index]} />
              ))}
            </Pie>
            <Tooltip labelClassName="dark:text-slate-500 text-slate-900" />
          </ChartPie>
        </ResponsiveContainer>

        {/* Sector for Gender */}
        <ResponsiveContainer width="30%" height={200}>
          <ChartPie>
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius="70%"
              labelLine={false}
              label={renderCustomizedLabel}
              activeShape={activeShape} // Thêm hiệu ứng hover
            >
              {data02.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[1][index]} />
              ))}
            </Pie>
            <Tooltip labelClassName="dark:text-slate-500 text-slate-900" />
          </ChartPie>
        </ResponsiveContainer>

        {/* Radial Bar for Return Method */}
        <ResponsiveContainer width="30%" height={200}>
          <ChartPie>
            <Pie
              data={data03}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius="80%"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data03.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[2][index]} />
              ))}
            </Pie>
            <Tooltip labelClassName="dark:text-slate-500 text-slate-900" />
          </ChartPie>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <div>
          <div style={{ color: COLORS[0][0] }}>
            ● {t("chart.pickupDelivery")}
          </div>
          <div style={{ color: COLORS[0][1] }}>
            ● {t("chart.onlineDelivery")}
          </div>
        </div>
        <div>
          <div style={{ color: COLORS[1][0] }}>
            ● {t("chart.male")}
          </div>
          <div style={{ color: COLORS[1][1] }}>
            ● {t("chart.female")}
          </div>
          <div style={{ color: COLORS[1][2] }}>
            ● {t("chart.other")}
          </div>
        </div>
        <div>
          <div style={{ color: COLORS[2][0] }}>
            ● {t("chart.pickupReturn")}
          </div>
          <div style={{ color: COLORS[2][1] }}>
            ● {t("chart.onlineReturn")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
