const DoExamQuestionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Ujian Biologi</h1>
      <div>{children}</div>
    </div>
  );
};

export default DoExamQuestionLayout;
