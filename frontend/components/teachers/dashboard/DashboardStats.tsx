"use client";

const mockStats = {
  totalExams: 2,
  averageScore: 85,
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">
          Ujian Dibuat
        </h3>
        <div className="flex justify-center">
          <p className="text-4xl font-bold text-primary-color">
            {mockStats.totalExams}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">
          Rata-rata Nilai Mahasiswa
        </h3>
        <div className="flex justify-center">
          <p className="text-4xl font-bold text-primary-color">
            {mockStats.averageScore}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
