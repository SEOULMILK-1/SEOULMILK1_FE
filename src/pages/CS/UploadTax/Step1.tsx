import { useNavigate } from 'react-router-dom';
import StepProgress from './StepProgress';
import Header from '../../../common/Header';

const Step1 = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <StepProgress />
      <Header title="세금계산서 업로드 " />

      <div className="bg-gray-300 h-64 flex items-center justify-center rounded-md mt-20">
        세금계산서가 잘 보이도록 사진을 편집해주세요.
      </div>
      <div className="mt-6 flex justify-between">
        <button className="border border-green-600 text-green-600 px-4 py-2 rounded-md">
          다시 업로드
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md"
          onClick={() => navigate('/upload-tax/step2')}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1;
