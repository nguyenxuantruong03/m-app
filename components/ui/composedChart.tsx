"use client"

import {Area, Bar,CartesianGrid,ComposedChart,Legend,Line,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts"

interface GraphData {
    name: string;
    totalpricesales: number;
    totalpriceold: number;
    totalwarranty: number;
}
interface OverViewProps{
data: GraphData[];
}

export const ComposedChartPage:React.FC<OverViewProps> =({data}) =>{
    return (
        <ResponsiveContainer width="100%" height={350}>
            <ComposedChart width={730} height={250} data={data}>
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
            <Area type="monotone" dataKey="totalpriceold" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="totalpricesales" barSize={20} fill="#666633" />
            <Line type="monotone" dataKey="totalwarranty" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}