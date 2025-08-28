import React from 'react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie } from 'recharts';
import { calculateSectorBreakdown } from '../utils/calculations';

const SectorsPage = ({ 
  portfolioData, 
  convertToDisplayCurrency, 
  formatCurrency, 
  displayCurrency 
}) => {
  const { sectorData } = calculateSectorBreakdown(portfolioData, convertToDisplayCurrency);

  const SECTOR_COLORS = [
    '#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', 
    '#ea580c', '#0891b2', '#be185d', '#65a30d', '#7c3aed'
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sector Breakdown</h2>
      
      {sectorData.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={SECTOR_COLORS[index % SECTOR_COLORS.length]}
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
      )}

      <div className="space-y-3">
        {sectorData.map((sector, index) => (
          <div key={sector.name} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded mr-3"
                  style={{ backgroundColor: SECTOR_COLORS[index % SECTOR_COLORS.length] }}
                ></div>
                <div>
                  <h3 className="font-bold text-lg">{sector.name}</h3>
                  <p className="text-sm text-gray-600">{sector.count} holdings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatCurrency(sector.value, displayCurrency)}</p>
                <p className="text-sm text-gray-600">({sector.percentage.toFixed(1)}%)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorsPage;