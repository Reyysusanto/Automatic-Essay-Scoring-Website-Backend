"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface QuestionFormData {
  soal: string;
  jawaban: string;
  skor: string;
}

const NewQuestionForm = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState<QuestionFormData>({
    soal: "",
    jawaban: "",
    skor: "",
  });

  const [errors, setErrors] = useState<Partial<QuestionFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof QuestionFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<QuestionFormData> = {};

    if (!formData.soal.trim()) {
      newErrors.soal = "Soal harus diisi";
    }

    if (!formData.jawaban.trim()) {
      newErrors.jawaban = "Jawaban harus diisi";
    }

    if (!formData.skor.trim()) {
      newErrors.skor = "Skor harus diisi";
    } else if (isNaN(Number(formData.skor)) || Number(formData.skor) <= 0) {
      newErrors.skor = "Skor harus berupa angka positif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const questionData = {
        title: formData.soal,
        description: formData.jawaban,
        marks: Number(formData.skor),
        examId: id,
      };

      console.log("Saving question:", questionData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push(`/teachers/exams/${id}`);
    } catch (error) {
      console.error("Error saving question:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="p-6 min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Tambah Soal</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Soal Field */}
          <div className="space-y-2">
            <Label htmlFor="soal" className="text-sm font-medium text-gray-700">
              Soal
            </Label>
            <Textarea
              id="soal"
              name="soal"
              value={formData.soal}
              onChange={handleInputChange}
              placeholder="Masukkan Soal"
              className={`min-h-[120px] resize-none ${
                errors.soal ? "border-red-500 focus:border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.soal && (
              <p className="text-sm text-red-600">{errors.soal}</p>
            )}
          </div>

          {/* Jawaban Field */}
          <div className="space-y-2">
            <Label
              htmlFor="jawaban"
              className="text-sm font-medium text-gray-700"
            >
              Jawaban
            </Label>
            <Textarea
              id="jawaban"
              name="jawaban"
              value={formData.jawaban}
              onChange={handleInputChange}
              placeholder="Masukkan Jawaban"
              className={`min-h-[150px] resize-none ${
                errors.jawaban ? "border-red-500 focus:border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.jawaban && (
              <p className="text-sm text-red-600">{errors.jawaban}</p>
            )}
          </div>

          {/* Skor Field */}
          <div className="space-y-2">
            <Label htmlFor="skor" className="text-sm font-medium text-gray-700">
              Skor
            </Label>
            <Input
              id="skor"
              name="skor"
              type="number"
              value={formData.skor}
              onChange={handleInputChange}
              placeholder="Masukkan Skor"
              className={`max-w-[200px] ${
                errors.skor ? "border-red-500 focus:border-red-500" : ""
              }`}
              disabled={isSubmitting}
              min="1"
            />
            {errors.skor && (
              <p className="text-sm text-red-600">{errors.skor}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 bg-teal-600 hover:bg-teal-700"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuestionForm;
