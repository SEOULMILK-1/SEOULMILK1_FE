import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../../common/Header';
import uploadIcon from '../../../../public/Icon/TaxUpload.svg';
import ImageCrop from './ImageCrop';
import api from '../../../hooks/api';
import ConfirmUpload from './ConfirmUpload';
import DuplicateTaxModal from './DuplicateTaxModal';

const Step1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);

  const [duplicateTitle, setDuplicateTitle] = useState<string>('');
  const [duplicateTaxDate, setDuplicateTaxDate] = useState<string>('');
  const [duplicateId, setDuplicateId] = useState<string>('');

  const [searchParams] = useSearchParams();
  const taxId = searchParams.get('taxId');

  useEffect(() => {
    if (location.state?.selectedImage) {
      setSelectedImage(location.state.selectedImage);
    }
  }, [location.state]);

  useEffect(() => {
    if (taxId) {
      console.log(`🗑 기존 세금계산서 삭제 요청: /tax/${taxId}`);
      api
        .delete(`/tax/${taxId}`)
        .then(() => console.log(`기존 세금계산서 삭제 완료: ${taxId}`))
        .catch((err) => console.error('세금계산서 삭제 실패:', err));
    }
  }, [taxId]);

  const handleUpload = async () => {
    if (!croppedImage) return;
    setIsUploading(true);

    // ocr 요청
    try {
      // if (taxId) {
      //   try {
      //     console.log(`🗑 기존 세금계산서 삭제 요청: /tax/${taxId}`);
      //     await api.delete(`/tax/${taxId}`);
      //     console.log(`기존 세금계산서 삭제 완료: ${taxId}`);
      //   } catch (err) {
      //     console.error('세금계산서 삭제 실패:', err);
      //   }
      // }

      const response = await fetch(croppedImage);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('file', blob, 'cropped-image.png');

      const res = await api.post('/tax/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('OCR 응답', res.data.result);

      if (res.data.result.issueId === '이미 등록된 세금계산서입니다.') {
        setDuplicateId(res.data.result.ntsTaxId || 'id');
        setDuplicateTitle(res.data.result.title || '세금계산서');
        setDuplicateTaxDate(res.data.result.issueDate || '날짜 없음');
        setIsDuplicateModalOpen(true);
        return;
      }

      // 중복이 아니라면 step2
      navigate(`/upload-tax/step2?taxId=${res.data.result.ntsTaxId}`, {
        state: { ocrData: res.data, selectedImage: croppedImage }
      });
    } catch (error) {
      console.error('OCR 업로드 실패', error);
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

      <ImageCrop
        initialImage={selectedImage}
        onCropComplete={setCroppedImage}
      />

      <div className="mt-[64px] flex gap-[24px] justify-center">
        <button
          className="font-md-medium w-[200px] h-[48px] text-center border border-primary-600 text-primary-600 px-6 py-3 rounded-[12px]"
          onClick={() => setSelectedImage(undefined)}
        >
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
