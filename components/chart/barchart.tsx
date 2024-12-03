"use client";

import {
  Bar,
  BarChart as ChartBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { translateSelectDateMessage } from "@/translate/translate-client";

interface GraphData {
  name: string;
  total: number;
}
interface OverViewProps {
  data: GraphData[];
  loading: boolean;
  languageToUse: string;
}

export const BarChart: React.FC<OverViewProps> = ({
  data,
  loading,
  languageToUse,
}) => {
  //language
  const selectDataMessgae = translateSelectDateMessage(languageToUse);

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
        <span className="text-center dark:text-slate-500 text-slate-900">
          {selectDataMessgae}
        </span>
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartBar data={data}>
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
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </ChartBar>
    </ResponsiveContainer>
  );
};
