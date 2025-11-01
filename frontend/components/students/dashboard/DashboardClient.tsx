"use client";

import DashboardStats from "./DashboardStats";
import NotificationBanner from "./NotificationBanner";

const DashboardClient = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <NotificationBanner />

      <DashboardStats />
    </div>
  );
};

export default DashboardClient;
