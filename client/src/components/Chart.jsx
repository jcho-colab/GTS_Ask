import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ['#000000', '#FBBF24', '#F59E0B', '#10B981'];

export const Chart = ({ data }) => {
  // Transform data for pie chart if needed
  const chartData = data || [];
  
  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          dataKey="total"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            textTransform: "capitalize",
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px"
          }} 
        />
        <Legend 
          verticalAlign="middle" 
          align="right"
          layout="vertical"
          iconType="circle"
          wrapperStyle={{ paddingLeft: "20px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
