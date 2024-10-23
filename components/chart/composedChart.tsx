"use client";

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart as ChartComposed,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

interface GraphData {
  name: string;
  totalpricesales: number;
  totalpriceold: number;
  totalwarranty: number;
}
interface ComposedChartProps {
  data: GraphData[];
  loading: boolean;
}

export const ComposedChart: React.FC<ComposedChartProps> = ({
  data,
  loading,
}) => {
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
        <span className="text-center">Please select date to find data...</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartComposed width={730} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis
          stroke="#88888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area
          type="monotone"
          dataKey="totalpriceold"
          fill="#8884d8"
          stroke="#8884d8"
        />
        <Bar dataKey="totalpricesales" barSize={20} fill="#666633" />
        <Line type="monotone" dataKey="totalwarranty" stroke="#ff7300" />
      </ChartComposed>
    </ResponsiveContainer>
  );
};
