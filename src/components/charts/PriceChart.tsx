import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="font-medium">฿{payload[0].payload.name}</p>
          <p className="text-gray-700">{`${payload[0].value} respondents`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `฿${value}`}
            angle={-45}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip content={customTooltip} />
          <Bar 
            dataKey="value" 
            fill="#4CAF50" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
