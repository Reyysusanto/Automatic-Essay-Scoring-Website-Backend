"use client";

import { useState, useEffect } from "react";
import ExamContent from "./ExamContent";
import { Clock } from "lucide-react";

const ExamDoClient = () => {
  const [timeRemaining, setTimeRemaining] = useState(1779);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}.${String(minutes).padStart(
      2,
      "0"
    )}.${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Ujian Biologi</h2>
          <div className="bg-white border-2 border-gray-300 rounded-full px-4 py-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <div className="text-1xl font-bold text-teal-600">
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        <ExamContent />
      </div>
    </div>
  );
};

export default ExamDoClient;
