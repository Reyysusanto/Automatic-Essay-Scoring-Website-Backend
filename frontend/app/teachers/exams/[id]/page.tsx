import ManageExamSection from '@/components/teachers/exam/ManageExamSection';

const ExamPage = () => {
  return (
    <div className="p-6 min-h-screen space-y-4">
      <h2 className="text-2xl font-bold">Exam Name</h2>
      <ManageExamSection />
    </div>
  );
};

export default ExamPage;
