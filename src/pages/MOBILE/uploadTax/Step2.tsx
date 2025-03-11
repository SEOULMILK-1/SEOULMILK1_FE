import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../../common/Header';
import uploadIcon from '../../../../public/Icon/TaxUpload.svg';
import WarningIcon from '../../../../public/Icon/WarningIcon';
import api from '../../../hooks/api';
import queryString from 'query-string';
import ArrowIcon from '../../../../public/Icon/ArrowIcon';

const Step2Mobile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taxId } = queryString.parse(location.search);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const croppedImage =
    location.state?.croppedImage || location.state?.selectedImage;
  const newTaxId = location.state?.ocrData?.result?.ntsTaxId || taxId;
  type FormData = {
    approvalNo: string;
    supplier: string;
    recipient: string;
    date: string;
    amount: string;
    [key: string]: string;
  };

  const [formData, setFormData] = useState<FormData>({
    approvalNo: '',
    supplier: '',
    recipient: '',
    date: '',
    amount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.ocrData?.result) {
      console.log('OCR 데이터 적용됨', location.state.ocrData.result);
      const ocrData = location.state.ocrData.result;
      setFormData({
        approvalNo: ocrData.issueId || '',
        supplier: ocrData.suId || '',
        recipient: ocrData.ipId || '',
        date: ocrData.issueDate || '',
        amount: ocrData.chargeTotal || ''
      });
    } else {
      console.warn('OCR 데이터 없음', location.state);
    }
  }, [JSON.stringify(location.state?.ocrData?.result)]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!newTaxId) {
      console.error('ntxTaxId 없음 API 요청을 보낼 수 없습니다.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await api.post(`/tax/validate/${newTaxId}`);
      console.log('API 응답', response.data);
      if (response.data.isSuccess) {
        navigate(`/checking`);
      } else {
        console.error('API 요청 실패', response.data.message);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className="px-4 mx-auto w-full max-w-md mb-4 ">
      <div className="mt-8 flex items-center mb-4">
        <div className="flex items-center gap-2">
          <ArrowIcon strokeColor="#3A404A" />
        </div>
        <div className="flex-1 text-center text-gray-800 font-xl-bold">
          제목 수정
        </div>
        <div className="w-8"></div>
      </div>
      <div className="flex flex-col items-center my-4">
        <img
          src={croppedImage}
          alt="Cropped Preview"
          className="w-full object-contain rounded-md"
          onClick={handleImageClick}
        />
        <div className="w-full px-4 py-3 my-3 bg-warning-50 rounded-lg flex items-start gap-2 mb-[16px]">
          <WarningIcon className="mt-1" />
          <div className="text-start">
            <p className="text-warning-400  font-md-semibold text-sm">
              내용이 알맞게 입력되었나요?
            </p>
            <p className="text-warning-300 font-sm-medium">
              사진 속 정보와 다를 경우 직접 수정하거나 다시 입력해 주세요.
            </p>
          </div>
        </div>
      </div>

      <form className="flex flex-col gap-4 mt-6">
        {[
          { label: '승인번호', name: 'approvalNo' },
          { label: '공급자 등록번호', name: 'supplier' },
          { label: '공급 받는 자 등록번호', name: 'recipient' },
          { label: '작성일자', name: 'date' },
          { label: '공급가액', name: 'amount' }
        ].map((field) => (
          <label key={field.name} className="flex flex-col gap-1">
            <span className="text-gray-600 text-md-semibold">
              {field.label}
            </span>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className=" font-md-medium border border-gray-300 rounded-lg p-3 text-sm focus:border-primary-500"
            />
          </label>
        ))}
      </form>

      <div className="mt-6 flex gap-4 justify-center">
        <button
          className="w-full h-[48px] text-center bg-primary-600 text-white font-md-medium rounded-lg"
          onClick={handleUpload}
          disabled={isSubmitting}
        >
          {isSubmitting ? '업로드 중...' : '다음'}
        </button>
      </div>
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeImageModal}
        >
          <div className=" flex items-center justify-center">
            {croppedImage ? (
              <img
                src={croppedImage}
                alt="세금계산서"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span className="text-gray-500 text-lg">확대된 임시 이미지</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2Mobile;
