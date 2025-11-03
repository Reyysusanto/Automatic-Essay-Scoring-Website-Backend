"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";

interface StudentChartProps {
  selectedClass: string;
}

const mockData = [
  { range: "50", count: 78 },
  { range: "60", count: 48 },
  { range: "70", count: 55 },
  { range: "80", count: 65 },
  { range: "90", count: 66 },
  { range: "100", count: 92 },
];

const StudentChart = ({ selectedClass }: StudentChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Grafik Nilai Mahasiswa
      </h3>
      <div className="w-full h-[28vh] lg:h-[36vh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="range"
              label={{ value: "Nilai", position: "insideBottom", offset: -10 }}
              tick={{ fill: "#374151" }}
            />
            <YAxis tick={{ fill: "#374151" }}>
              <Label
                value="Jumlah Mahasiswa"
                angle={-90}
                position="insideLeft"
                dy={0}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Bar dataKey="count" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentChart;
