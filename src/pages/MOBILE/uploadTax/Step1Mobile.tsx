import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ImageCrop from './ImageCrop';
import api from '../../../hooks/api';
import DuplicateTaxModal from '../../CS/TaxUpload/DuplicateTaxModal';
import ConfirmUpload from '../../CS/TaxUpload/ConfirmUpload';
import ArrowIcon from '../../../../public/Icon/ArrowIcon';

const Step1Mobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);

  const [duplicateTitle, setDuplicateTitle] = useState<string>('');
  const [duplicateTaxDate, setDuplicateTaxDate] = useState<string>('');
  const [duplicateId, setDuplicateId] = useState<string>('');

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

      console.log('OCR 응답:', res.data.result);

      const { ntsTaxId, issueId, status, title, issueDate } = res.data.result;

      if (issueId === '이미 등록된 세금계산서입니다.') {
        if (status === 'APPROVE') {
          setDuplicateId(ntsTaxId.toString());
          setDuplicateTitle(title || '세금계산서');
          setDuplicateTaxDate(issueDate || '날짜 없음');
          setIsDuplicateModalOpen(true);
          return;
        }
        if (status === 'WAIT ' || 'REFUSED') {
          //  2. 반려된 세금계산서인 경우, 삭제 요청 먼저
          await api.delete(`/tax/${ntsTaxId}`);
          console.log(`기존 반려된 세금계산서 삭제 완료: ${ntsTaxId}`);

          // 3. 삭제 후 OCR 재요청
          const res = await api.post('/tax/ocr', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          console.log('삭제완료후 재요청 ocr 응답:', res.data.result);

          // 4. 새로운 ID로 Step2 이동
          navigate(`/uploadTax/step2?taxId=${ntsTaxId}`, {
            state: { ocrData: res.data, selectedImage: croppedImage }
          });

          return;
        }
      }
      // 중복이 아니면 정상적으로 step2 이동
      navigate(`/uploadTax/step2?taxId=${ntsTaxId}`, {
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
      <div className="w-full flex items-center justify-between p-4 text-center ">
        <button onClick={() => navigate(-1)} className="text-white text-2xl">
          <ArrowIcon strokeColor="white" />
        </button>
        <h2 className="font-xl-bold">이미지 편집</h2>
        <button
          className="bg-green-600 px-4 py-2 rounded-[8px] text-white font-sm-medium"
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
      {/* 처음 사진업로드 확인모달 */}
      {isModalOpen && (
        <ConfirmUpload
          title="여러 장의 세금계산서는 오류가 생겨요!"
          message="한 장만 나오도록 사진을 잘라주세요."
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {/* 중복일경우 모달 */}
      {isDuplicateModalOpen && (
        <DuplicateTaxModal
          id={duplicateId}
          title={duplicateTitle}
          taxDate={duplicateTaxDate}
          onClose={() => setIsDuplicateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Step1Mobile;
