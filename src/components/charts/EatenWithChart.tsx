import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { translateEatenWith } from '../../utils/dataParser';

interface EatenWithChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#009688'];

const EatenWithChart: React.FC<EatenWithChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    displayName: translateEatenWith(item.name)
  }));

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="font-medium">{payload[0].payload.displayName}</p>
          <p className="text-gray-700">{`${payload[0].value} respondents (${((payload[0].value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="displayName"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EatenWithChart;
