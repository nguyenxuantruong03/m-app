"use client"

import {CartesianGrid,Legend,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts"

interface OverViewProps{
data: any[];
}

export const LineChartPage:React.FC<OverViewProps> =({data}) =>{
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
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
            <Line type="monotone" dataKey="totaldate" stroke="#ff7300" />
            </LineChart>
        </ResponsiveContainer>
    )
}