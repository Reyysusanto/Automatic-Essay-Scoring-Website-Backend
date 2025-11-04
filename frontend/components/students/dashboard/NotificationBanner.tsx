"use client";

import { AlertCircle } from "lucide-react";

const NotificationBanner = () => {
  return (
    <div className="bg-teal-100 border border-teal-200 rounded-lg p-4 mb-6 flex items-center gap-3">
      <div className="bg-white rounded-full p-2">
        <AlertCircle className="w-6 h-6 text-gray-800" />
      </div>
      <p className="text-gray-800 font-medium">Anda punya 1 ujian hari ini !</p>
    </div>
  );
};

export default NotificationBanner;
