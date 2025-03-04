import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../common/Header';

const Step2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const croppedImage = location.state?.croppedImage;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header title="데이터 확인 및 수정" showStepProgress={true} />

      {croppedImage ? (
        <div className="overflow-auto">
          <img
            src={croppedImage}
            alt="Cropped"
            className="max-w-full max-h-[500px] w-auto h-auto rounded-md mx-auto"
          />
        </div>
      ) : (
        <p className="text-center text-red-500">이미지가 없습니다.</p>
      )}

      <div className="mt-6 flex justify-between">
        <button
          className="border border-gray-600 text-gray-600 px-4 py-2 rounded-md"
          onClick={() => navigate('/upload-tax/step1')}
        >
          이전
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-md">
          검증 시작
        </button>
      </div>
    </div>
  );
};

export default Step2;
