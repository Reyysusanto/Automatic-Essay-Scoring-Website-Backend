"use client";

import { Button } from "@/components/ui/button";

interface ExamHistory {
  id: string;
  mataKuliah: string;
  tanggalSelesai: string;
  status: string;
  nilai: number;
}

const mockHistoryData: ExamHistory[] = [
  {
    id: "1",
    mataKuliah: "Biologi",
    tanggalSelesai: "09/09/2025",
    status: "Selesai",
    nilai: 90,
  },
  {
    id: "2",
    mataKuliah: "Pengantar Sistem Informasi",
    tanggalSelesai: "09/09/2025",
    status: "Selesai",
    nilai: 90,
  },
  {
    id: "3",
    mataKuliah: "Biologi",
    tanggalSelesai: "09/09/2025",
    status: "Selesai",
    nilai: 90,
  },
  {
    id: "4",
    mataKuliah: "Pengantar Sistem Informasi",
    tanggalSelesai: "09/09/2025",
    status: "Selesai",
    nilai: 90,
  },
  {
    id: "5",
    mataKuliah: "Biologi",
    tanggalSelesai: "09/09/2025",
    status: "Selesai",
    nilai: 90,
  },
  {
    id: "6",
    mataKuliah: "Pengantar Sistem Informasi",
    tanggalSelesai: "09/09/2025",
    status: "Selesai",
    nilai: 90,
  },
];

const HistoryTable = () => {
  const handleViewDetail = (examId: string) => {
    console.log("View detail for exam:", examId);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Mata Kuliah
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Tanggal Selesai
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Nilai
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {mockHistoryData.map((exam, index) => (
              <tr
                key={exam.id}
                className={`border-b border-gray-50 hover:bg-gray-25 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {exam.mataKuliah}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">
                  {exam.tanggalSelesai}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-medium text-emerald-600">
                    {exam.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-center">
                  {exam.nilai}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleViewDetail(exam.id)}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 underline hover:no-underline transition-all"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
