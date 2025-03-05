import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageCrop from './ImageCrop';
import Header from '../../../common/Header';
import uploadIcon from '../../../../public/Icon/TaxUpload.svg';

const Step1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.selectedImage) {
      setSelectedImage(location.state.selectedImage);
    }
  }, [location.state]);

  return (
    <div className="px-[94px]  mx-auto ">
      <Header
        title="세금계산서 업로드"
        showStepProgress={true}
        Icon={() => (
          <img src={uploadIcon} alt="세금계산서 업로드" className="w-6 h-6" />
        )}
      />

      <ImageCrop
        initialImage={selectedImage}
        onCropComplete={setCroppedImage}
      />

      <div className="mt-[64px] flex gap-[24px] justify-center">
        <button className="font-md-medium w-[200px] h-[48px] text-center border border-primary-600 text-primary-600 px-6 py-3 rounded-[12px]">
          다시 업로드
        </button>
        <button
          className="font-md-medium w-[200px] h-[48px] text-center bg-primary-600 text-white px-6 py-3 rounded-[12px]"
          onClick={() =>
            navigate('/upload-tax/step2', { state: { croppedImage } })
          }
          // disabled={croppedImage}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1;
