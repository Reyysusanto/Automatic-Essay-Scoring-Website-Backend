"use client";

const mockStats = {
  totalExams: 2,
  upcomingExam: "Biologi",
  latestScore: 87,
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">
          Jumlah Ujian Aktif
        </h3>
        <div className="flex justify-center">
          <p className="text-4xl font-bold text-primary-color">
            {mockStats.totalExams}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">
          Jadwal Ujian Terdekat
        </h3>
        <div className="flex justify-center">
          <p className="text-4xl font-bold text-primary-color">
            {mockStats.upcomingExam}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:col-span-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">
          Nilai Terakhir
        </h3>
        <div className="flex justify-center">
          <p className="text-4xl font-bold text-primary-color">
            {mockStats.latestScore}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
