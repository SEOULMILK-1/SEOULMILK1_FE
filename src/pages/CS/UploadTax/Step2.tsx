import { useNavigate } from 'react-router-dom';
import StepProgress from './StepProgress';

const Step2 = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <StepProgress />

      <h1 className="text-2xl font-bold mb-4">데이터 확인 및 수정</h1>

      <div className="bg-gray-300 h-64 flex items-center justify-center rounded-md">
        OCR 결과를 확인하고 수정해주세요.
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="border border-gray-600 text-gray-600 px-4 py-2 rounded-md"
          onClick={() => navigate('/upload-tax/step1')}
        >
          이전
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md"
          onClick={() => navigate('/upload-tax/step3')}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step2;
