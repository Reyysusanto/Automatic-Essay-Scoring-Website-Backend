"use client";

import HistoryTable from "./HistoryTable";

const HistoryClient = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Ujian</h1>
      <HistoryTable />
    </div>
  );
};

export default HistoryClient;
