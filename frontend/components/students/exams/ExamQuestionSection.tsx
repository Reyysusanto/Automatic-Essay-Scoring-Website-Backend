import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ExamQuestionSection = () => {
  return (
    <div className="bg-white rounded-md p-4 shadow border border-gray-200 space-y-8 w-full">
      <div className="flex flex-col space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Soal 1</h3>
        <Textarea
          className="bg-gray-50 text-gray-700 min-h-[180px] lg:text-base"
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Jawaban</h3>
        <Textarea
          className="bg-gray-50 text-gray-700 min-h-[150px]"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary-color rounded-md text-white hover:bg-emerald-700 transition-colors px-8 cursor-pointer">
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default ExamQuestionSection;
