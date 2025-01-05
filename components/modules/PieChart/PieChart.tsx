'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface DataItem {
  name: string
  value: number
  color: string
}

interface PieChartCardProps {
  title: string
  data: DataItem[]
  legendItems: Array<{
    name: string
    color: string
  }>
}

export function PieChartCard({ title, data, legendItems }: PieChartCardProps) {
  return (
    <div className="h-full">
      <h4 className="text-lg font-bold text-darkMain mb-4">{title}</h4>
      <div className="flex flex-wrap gap-4 mb-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1 min-w-[40%]">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-base text-darkmain font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-[192px] mt-8">
        <div
          className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: '1px dashed #E5E7EB'
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: '1px dashed #E5E7EB'
          }}
        />
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
