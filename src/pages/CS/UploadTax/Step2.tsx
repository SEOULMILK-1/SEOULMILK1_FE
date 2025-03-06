import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../../common/Header';
import uploadIcon from '../../../../public/Icon/TaxUpload.svg';
import WarningIcon from '../../../../public/Icon/WarningIcon';

const Step2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const croppedImage = location.state?.croppedImage;

  const [formData, setFormData] = useState({
    approvalNo: '',
    supplier: '',
    recipient: '',
    date: '',
    amount: ''
  });

  useEffect(() => {
    if (location.state) {
      setFormData({
        approvalNo: location.state.approvalNo || '',
        supplier: location.state.supplier || '',
        recipient: location.state.recipient || '',
        date: location.state.date || '',
        amount: location.state.amount || ''
      });
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      <div className="pt-[32px] flex gap-[40px]">
        <div className="w-[560px] flex-col rounded-[32px] flex items-center justify-center gap-[24px]">
          {croppedImage ? (
            <img
              src={croppedImage}
              alt="Cropped Preview"
              className="w-[560px] max-h-[500px] object-contain rounded-md"
            />
          ) : (
            <p className="text-center text-gray-500">이미지가 없습니다.</p>
          )}
          <div className="w-[560px] px-[24px] py-[16px] bg-[#FFEAED] rounded-[16px] flex items-start gap-[8px]">
            <WarningIcon className="mt-1" />
            <div className="text-start gap-[8px]">
              <p className="text-warning-400 font-xl-semibold">
                내용이 알맞게 입력되었나요?
              </p>
              <p className="text-warning-300 font-lg-semibold">
                사진 속 정보와 다를 경우 직접 수정하거나 다시 입력해 주세요.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[360px] p-6">
          <form className="flex flex-col gap-[24px]">
            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">승인번호</span>
              <input
                type="text"
                name="approvalNo"
                value={formData.approvalNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">
                공급자 등록번호
              </span>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">
                공급 받는 자 등록번호
              </span>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">작성일자</span>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">공급가액</span>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px]"
              />
            </label>
          </form>
        </div>
      </div>

      <div className="mt-[64px] flex gap-[24px] justify-center">
        <button
          className="font-md-medium w-[200px] h-[48px] text-center border border-primary-600 text-primary-600 px-6 py-3 rounded-[12px]"
          onClick={() => navigate(-1)}
        >
          이전
        </button>
        <button
          className="font-md-medium w-[200px] h-[48px] text-center bg-primary-600 text-white px-6 py-3 rounded-[12px]"
          onClick={() => navigate('/upload-tax/step3')}
          //업로드 api요청
        >
          업로드
        </button>
      </div>
    </div>
  );
};

export default Step2;
