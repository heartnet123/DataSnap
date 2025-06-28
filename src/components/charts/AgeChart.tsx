import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { translateAge } from '../../utils/dataParser';

interface AgeChartProps {
  data: {
    name: string;
    value: number;
  }[];
  onAgeClick: (age: string) => void;
}

const COLORS = [
  '#FF9800', // Orange
  '#F44336', // Red
  '#8BC34A', // Green
  '#9C27B0', // Purple
  '#03A9F4', // Blue
  '#FFEB3B', // Yellow
  '#E91E63', // Pink
  '#795548', // Brown
  '#00BCD4', // Cyan
  '#CDDC39', // Lime
  '#607D8B', // Blue Grey
  '#FF5722', // Deep Orange
  '#4CAF50', // Green
  '#3F51B5', // Indigo
  '#009688', // Teal
];

const AgeChart: React.FC<AgeChartProps> = ({ data, onAgeClick }) => {
  const formattedData = data.map(item => ({
    ...item,
    displayName: translateAge(item.name)
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

  const handleClick = (data: any) => {
    onAgeClick(data.name);
  };

  return (
    <div style={{ height: 256 }}>
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
            onClick={handleClick}
            cursor="pointer"
          >
            {formattedData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center text-sm text-gray-500">
        Click on an age group to filter the data
      </div>
    </div>
  );
};

export default AgeChart;
