import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { translateCriteria } from '../../utils/dataParser';

interface SelectionCriteriaChartProps {
  data: {
    name: string;
    value: number;
  }[];
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

const SelectionCriteriaChart: React.FC<SelectionCriteriaChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    displayName: translateCriteria(item.name)
  }));

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="font-medium">{payload[0].payload.displayName}</p>
<p className="text-gray-700">{`${payload[0].value} คน`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ height: 360, width: '100%', padding: 8, overflow: 'visible' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{ top: 16, right: 32, left: 100, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" tick={{ fontSize: 13 }} />
          <YAxis 
            type="category" 
            dataKey="displayName" 
            tick={{ fontSize: 14, fontWeight: 500 }}
            width={110}
          />
          <Tooltip content={customTooltip} />
          <Bar 
            dataKey="value"
            radius={[0, 6, 6, 0]}
            barSize={22}
          >
            {formattedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SelectionCriteriaChart;
