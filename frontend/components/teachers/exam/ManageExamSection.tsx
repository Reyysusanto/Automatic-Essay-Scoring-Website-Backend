import { Question } from '@/types/question.type';
import AddQuestionButton from './AddQuestionButton';
import QuestionField from './QuestionField';

const questionData: Question[] = [
  {
    id: 'question1',
    title: 'Kenapa manusia harus makan ?',
    description:
      'Manusia harus makan karena tubuh membutuhkan energi untuk bergerak, berpikir, dan menjalankan fungsi organ. Selain itu, makanan juga menyediakan nutrisi penting seperti protein, vitamin, dan mineral untuk pertumbuhan serta menjaga kesehatan tubuh.',
    marks: 80,
  },
  {
    id: 'question2',
    title: 'Apa fungsi mitokondria pada sel?',
    description:
      'Mitokondria berfungsi sebagai pembangkit energi sel dengan menghasilkan ATP melalui respirasi seluler. Selain itu, mitokondria juga terlibat dalam regulasi metabolisme dan apoptosis.',
    marks: 90,
  },
  {
    id: 'question3',
    title: 'Jelaskan cara kerja gravitasi !',
    description:
      'Gravitasi adalah gaya tarik-menarik yang terjadi antara dua benda yang memiliki massa. Semakin besar massa suatu benda, semakin besar pula gaya gravitasinya. Gravitasi bekerja pada semua benda di alam semesta, dan merupakan salah satu dari empat gaya dasar fisika. Gaya ini menyebabkan benda-benda jatuh ke bumi dan menjaga planet-planet tetap berada di orbitnya.',
    marks: 90,
  },
];

const ManageExamSection = () => {
  return (
    <div className="space-y-6">
      <AddQuestionButton />
      {questionData.map((question, index) => (
        <QuestionField key={question.id} question={question} index={index} />
      ))}
    </div>
  );
};

export default ManageExamSection;
