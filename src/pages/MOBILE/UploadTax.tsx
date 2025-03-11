import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ImageCrop from './ImageCrop';
import api from '../../hooks/api';

const TaxUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.selectedImage) {
      setSelectedImage(location.state.selectedImage);
      setCroppedImage(location.state.selectedImage);
    }
  }, [location.state]);

  const handleUpload = async () => {
    if (!croppedImage) return;
    setIsUploading(true);

    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const uniqueFilename = `cropped-${uuidv4()}.png`;

      const formData = new FormData();
      formData.append('file', blob, uniqueFilename);

      const res = await api.post('/tax/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { ntsTaxId } = res.data.result;
      navigate(`/upload-tax/step2?taxId=${ntsTaxId}`, {
        state: { ocrData: res.data, selectedImage: croppedImage }
      });
    } catch (error) {
      console.error('OCR 업로드 실패', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-black text-white">
      <div className="w-full flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-2xl"
        ></button>
        <h2 className="text-lg font-semibold">이미지 편집</h2>
        <button
          className="bg-green-600 px-4 py-2 rounded-lg text-white font-medium"
          onClick={handleUpload}
          disabled={!croppedImage || isUploading}
        >
          {isUploading ? '업로드 중...' : '완료'}
        </button>
      </div>

      <div className="flex-grow flex justify-center items-center">
        {selectedImage && (
          <ImageCrop
            initialImage={selectedImage}
            onCropComplete={(croppedImg) => setCroppedImage(croppedImg)}
          />
        )}
      </div>
    </div>
  );
};

export default TaxUpload;
