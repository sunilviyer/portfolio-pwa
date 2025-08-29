// File: src/components/portfolio/SectorChart.js
import React from 'react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie } from 'recharts';

const SectorChart = ({ 
  sectorData, 
  formatCurrency, 
  displayCurrency,
  height = 300,
  innerRadius = 60,
  outerRadius = 120
}) => {
  const COLORS = [
    '#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', 
    '#ea580c', '#0891b2', '#be185d', '#65a30d', '#7c3aed'
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={sectorData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
          >
            {sectorData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [formatCurrency(value, displayCurrency), 'Value']}
            labelFormatter={(label) => `${label} Sector`}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectorChart;