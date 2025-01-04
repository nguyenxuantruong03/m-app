"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ChartLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";

interface GraphData {
  name: string;
  totaldate: number;
}
interface LineChartProps {
  data: GraphData[];
  loading: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  loading,
}) => {
  const t = useTranslations()

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
        <span className="text-center">{t("chart.selectDate")}</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartLine width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          stroke="#88888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip labelClassName="dark:text-slate-500 text-slate-900" />
        <Legend />
        <Line type="monotone" dataKey="totaldate" stroke="#ff7300" />
      </ChartLine>
    </ResponsiveContainer>
  );
};
