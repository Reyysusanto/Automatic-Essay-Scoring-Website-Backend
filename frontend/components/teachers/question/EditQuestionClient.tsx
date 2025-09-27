"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditQuestionForm from "./EditQuestionForm";

const mockQuestionData = {
  question1: {
    soal: "Kenapa manusia harus makan ?",
    jawaban:
      "Manusia harus makan karena tubuh membutuhkan energi untuk bergerak, berpikir, dan menjalankan fungsi organ. Selain itu, makanan juga menyediakan nutrisi penting seperti protein, vitamin, dan mineral untuk pertumbuhan serta menjaga kesehatan tubuh.",
    skor: "80",
  },
  question2: {
    soal: "Apa fungsi mitokondria pada sel?",
    jawaban:
      "Mitokondria berfungsi sebagai pembangkit energi sel dengan menghasilkan ATP melalui respirasi seluler. Selain itu, mitokondria juga terlibat dalam regulasi metabolisme dan apoptosis.",
    skor: "90",
  },
  question3: {
    soal: "Jelaskan cara kerja gravitasi !",
    jawaban:
      "Gravitasi adalah gaya tarik-menarik yang terjadi antara dua benda yang memiliki massa. Semakin besar massa suatu benda, semakin besar pula gaya gravitasinya. Gravitasi bekerja pada semua benda di alam semesta, dan merupakan salah satu dari empat gaya dasar fisika. Gaya ini menyebabkan benda-benda jatuh ke bumi dan menjaga planet-planet tetap berada di orbitnya.",
    skor: "90",
  },
};

const EditQuestionClient = () => {
  const { questionId } = useParams();

  const [questionData, setQuestionData] = useState({
    soal: "",
    jawaban: "",
    skor: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionData = () => {
      const mockData =
        mockQuestionData[questionId as keyof typeof mockQuestionData];
      if (mockData) {
        setQuestionData(mockData);
      }
      setLoading(false);
    };

    fetchQuestionData();
  }, [questionId]);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return <EditQuestionForm initialData={questionData} />;
};

export default EditQuestionClient;
