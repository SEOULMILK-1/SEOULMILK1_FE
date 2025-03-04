import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCrop from './ImageCrop';
import Header from '../../../common/Header';

const Step1 = () => {
  const navigate = useNavigate();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header title="세금계산서 업로드" showStepProgress={true} />

      {/* ✅ 이미지 업로드 및 자르기 */}
      <ImageCrop onCropComplete={setCroppedImage} />

      <div className="mt-6 flex justify-between">
        <button className="border border-green-600 text-green-600 px-4 py-2 rounded-md">
          다시 업로드
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md"
          onClick={() =>
            navigate('/upload-tax/step2', { state: { croppedImage } })
          }
          disabled={!croppedImage} // ✅ 자동 크롭된 이미지 없으면 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1;
