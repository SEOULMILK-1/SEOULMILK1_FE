import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../hooks/api';
import ArrowIcon from '../../../public/Icon/ArrowIcon';
import WarningIcon from '../../../public/Icon/WarningIcon';

const EditTaxMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    approvalNo: '',
    supplier: '',
    recipient: '',
    date: '',
    amount: ''
  });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.error('taxId가 없습니다!');
      setLoading(false);
      return;
    }

    const fetchTaxDetails = async () => {
      try {
        const response = await api.get(`/cs/tax/${id}`);
        console.log('세금계산서 데이터:', response.data);

        if (response.data.isSuccess) {
          const taxData = response.data.result;
          setFormData({
            approvalNo: taxData.issueId || '',
            supplier: taxData.suId || '',
            recipient: taxData.ipId || '',
            date: taxData.taxDate || '',
            amount: taxData.chargeTotal || ''
          });

          if (taxData.taxImageUrl) {
            setCroppedImage(taxData.taxImageUrl);
          }
        } else {
          setError(
            response.data.message || '데이터를 불러오는데 실패했습니다.'
          );
        }
      } catch (err) {
        console.error('API 요청 오류:', err);
        setError('서버 연결에 실패했습니다. 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaxDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!id) {
      console.error('taxId가 없습니다!');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateResponse = await api.put(`/tax/${id}`, {
        issueId: formData.approvalNo,
        suId: formData.supplier,
        ipId: formData.recipient,
        issueDate: formData.date,
        chargeTotal: formData.amount
      });

      console.log('세금계산서 수정 응답:', updateResponse.data);

      if (!updateResponse.data.isSuccess) {
        setError(updateResponse.data.message || '세금계산서 수정 실패');
        setIsSubmitting(false);
        return;
      }

      navigate(`/uploadTax/step3/checking`);
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      setError('서버 오류 발생. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto p-6">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowIcon strokeColor="#949BA7" />
        </button>
        <h1 className="text-lg font-bold">세금계산서 수정</h1>
      </div>

      {loading && <p className="text-gray-600 text-center py-10">로딩 중...</p>}
      {error && <p className="text-red-600 text-center py-10">{error}</p>}

      {croppedImage && (
        <div className="w-full max-h-[300px] rounded-lg overflow-hidden mb-4">
          <img
            src={croppedImage}
            alt="세금계산서 미리보기"
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-2 mb-4">
        <WarningIcon className="mt-1" />
        <div>
          <p className="font-bold">내용이 알맞게 입력되었나요?</p>
          <p className="text-sm">
            사진 속 정보와 다를 경우 직접 수정하거나 다시 입력해 주세요.
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-20">
        <InputField
          label="승인번호"
          name="approvalNo"
          value={formData.approvalNo}
          onChange={handleChange}
        />
        <InputField
          label="공급자 등록번호"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
        />
        <InputField
          label="공급 받는 자 등록번호"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
        />
        <InputField
          label="작성일자"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <InputField
          label="공급가액"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md">
        <button
          className="w-full p-3 text-white bg-primary-600 rounded-lg font-semibold"
          onClick={handleUpdate}
          disabled={isSubmitting}
        >
          {isSubmitting ? '업로드 중...' : '수정하기'}
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }: any) => (
  <label className="block">
    <span className="font-medium text-gray-600">{label}</span>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500"
    />
  </label>
);

export default EditTaxMobile;
