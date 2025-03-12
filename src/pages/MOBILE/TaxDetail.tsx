import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../hooks/api';
import ArrowIcon from '../../../public/Icon/ArrowIcon';
import StatusBadge, { Status } from '../../common/StatusBagde';
import Button from '../../common/Button';

interface TaxDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    status: string;
    title: string;
    taxImageUrl: string;
    issueId: string;
    suId: string;
    ipId: string;
    taxDate: string;
    chargeTotal: string;
  };
}

const TaxDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState<
    TaxDetailResponse['result'] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaxDetail = async () => {
      if (!id) {
        console.log('세금계산서 ID가 없습니다.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get<TaxDetailResponse>(`/cs/tax/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.isSuccess) {
          setDetailData(response.data.result);
        } else {
          setError(
            response.data.message || '데이터를 불러오는데 실패했습니다.'
          );
        }
      } catch (err) {
        setError('서버 연결에 실패했습니다. 다시 시도해 주세요.');
        console.error('API 요청 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReupload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        navigate('/uploadtax/step1', {
          state: { selectedImage: imageUrl, taxId: id }
        });
      }
    };
    input.click();
  };

  return (
    <div className="w-full h-full fixed inset-0 bg-white flex flex-col p-6 overflow-auto">
      <div className="flex items-center mb-4">
        <button onClick={handleBack} className="mr-4">
          <ArrowIcon strokeColor={'#949BA7'} />
        </button>
        <h1 className="text-lg font-bold">세금계산서 상세 정보</h1>
      </div>

      {loading && <p className="text-gray-600 text-center mt-4">로딩 중...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {detailData && (
        <>
        
          <div
            className="w-full h-60 border rounded-xl flex items-center justify-center cursor-pointer"
            onClick={() => window.open(detailData.taxImageUrl, '_blank')}
          >
            {detailData.taxImageUrl ? (
              <img
                src={detailData.taxImageUrl}
                alt="세금계산서"
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <span className="text-gray-500">이미지가 없습니다.</span>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <DetailField label="승인번호" value={detailData.issueId} />
            <DetailField label="공급자 등록번호" value={detailData.suId} />
            <DetailField
              label="공급 받는 자 등록번호"
              value={detailData.ipId}
            />
            <DetailField label="작성일자" value={detailData.taxDate} />
            <DetailField label="공급가액" value={detailData.chargeTotal} />
          </div>

          <div className="flex gap-4 mt-12 text-center justify-center">
            <Button
              className="text-primary-600 w-[152px] h-[56px] border border-primary-600 font-md-medium"
              onClick={handleReupload}
            >
              재업로드
            </Button>
            <Button
              className="text-primary-600 bg-primary-50 w-[152px] h-[56px] border border-primary-700 font-md-medium"
              onClick={() => navigate(`/cs/tax/edit/${id}`)}
            >
              수정하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-gray-600 font-medium mb-1">{label}</label>
    <div className="w-full p-4 bg-gray-100 rounded-lg text-gray-700">
      {value}
    </div>
  </div>
);

export default TaxDetailPage;
