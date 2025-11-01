"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  number: number;
  soal: string;
  jawaban: string;
}

const mockQuestions: Question[] = [
  {
    id: "1",
    number: 1,
    soal: "Kenapa manusia harus makan ?",
    jawaban: "",
  },
  {
    id: "2",
    number: 2,
    soal: "Apa fungsi mitokondria pada sel?",
    jawaban: "",
  },
];

const ExamContent = () => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);

  const handleJawabanChange = (questionId: string, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, jawaban: value } : q))
    );
  };

  const handleSubmit = () => {
    console.log("Submit exam:", questions);
  };

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <div
          key={question.id}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Soal {question.number}
          </h3>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 text-sm leading-relaxed">
              {question.soal}
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Jawaban
            </label>
            <textarea
              value={question.jawaban}
              onChange={(e) => handleJawabanChange(question.id, e.target.value)}
              placeholder="Masukkan jawaban Anda"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSubmit}
          className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default ExamContent;
