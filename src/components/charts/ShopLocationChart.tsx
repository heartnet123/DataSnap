import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { translateShopLocation } from '../../utils/dataParser';

interface ShopLocationChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const ShopLocationChart: React.FC<ShopLocationChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    displayName: translateShopLocation(item.name)
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
            fill="#FF5722" 
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShopLocationChart;
