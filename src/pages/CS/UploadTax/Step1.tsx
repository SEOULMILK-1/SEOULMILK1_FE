import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../common/Header';
import uploadIcon from '../../../../public/Icon/TaxUpload.svg';
import ImageCrop from './ImageCrop';
import api from '../../../hooks/api';

const Step1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.selectedImage) {
      setSelectedImage(location.state.selectedImage);
    }
  }, [location.state]);

  const handleUpload = async () => {
    if (!croppedImage) return;

    console.log('handleUpload 실행됨!');
    setIsUploading(true);

    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      console.log('Blob 변환', blob);

      const formData = new FormData();
      formData.append('file', blob, 'cropped-image.png');

      console.log('FormData 준비 ');

      const res = await api.post('/tax/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('OCR 응답', res.data);

      navigate(`/upload-tax/step2?taxId=${res.data.result.ntsTaxId}`, {
        state: { ocrData: res.data, selectedImage: croppedImage }
      });
    } catch (error) {
      console.error('OCR 업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="px-[94px] mx-auto">
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
          onClick={handleUpload}
          disabled={!croppedImage || isUploading}
        >
          {isUploading ? '업로드 중...' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default Step1;
