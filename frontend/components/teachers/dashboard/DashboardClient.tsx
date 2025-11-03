"use client";

import { useState } from "react";
import DashboardStats from "./DashboardStats";
import ClassFilter from "./ClassFilter";
import StudentChart from "./StudentChart";

const DashboardClient = () => {
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <DashboardStats />

      <div className="mt-6">
        <ClassFilter
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
        />
      </div>

      <div className="mt-6">
        <StudentChart selectedClass={selectedClass} />
      </div>
    </div>
  );
};

export default DashboardClient;
