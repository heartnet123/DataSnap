import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { translateFruit, fruitColors } from '../../utils/dataParser';

interface FruitPreferenceChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const FruitPreferenceChart: React.FC<FruitPreferenceChartProps> = ({ data }) => {
  // Fallback palette with visually distinct colors
  const palette = [
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

  // Assign color: use fruitColors if unique, else fallback to palette
  const usedColors = new Set<string>();
  const formattedData = data.map((item, idx) => {
    let color = fruitColors[item.name];
    if (!color || usedColors.has(color)) {
      color = palette[idx % palette.length];
    }
    usedColors.add(color);
    return {
      ...item,
      displayName: translateFruit(item.name),
      color,
    };
  });

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
    <div style={{ height: 280, padding: 8 }}>
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
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FruitPreferenceChart;
