import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { translateTime } from '../../utils/dataParser';

interface TimeChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const TimeChart: React.FC<TimeChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    displayName: translateTime(item.name)
  }));

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="font-medium">{payload[0].payload.displayName}</p>
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
          data={formattedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="displayName" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={customTooltip} />
          <Bar 
            dataKey="value" 
            fill="#FFC107" 
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeChart;
