"use client"

import {Bar,BarChart,Legend,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts"

interface GraphData {
    name: string;
    total: number;
}
interface OverViewProps{
data: GraphData[];
}

export const Overview:React.FC<OverViewProps> =({data}) =>{
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis 
                dataKey="name"
                />
                <YAxis 
                stroke="#88888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3498db" radius={[4,4,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    )
}