import { useState, useEffect } from 'react';
import ArrowIcon from '../../../../public/Icon/ArrowIcon';
import api from '../../../hooks/api';

interface PaymentDetail {
  ntsTaxNum: string;
  supplyAmount: number;
  issueDate: string;
  totalAmount: number;
}

interface PaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: PaymentDetail | null;
}

const PaymentDetailModal = ({
  isOpen,
  onClose,
  selectedItem
}: PaymentDetailModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<PaymentDetail | null>(null);

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      if (!isOpen || !selectedItem?.ntsTaxNum) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/hq/payment-resolution/tax/${selectedItem.ntsTaxNum}`
        );

        if (response.data.isSuccess) {
          setDetailData(response.data.result);
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('서버 요청 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetail();
  }, [isOpen, selectedItem]);

  if (!isOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 flex justify-end items-start z-50 transition-opacity duration-300 bg-black bg-opacity-50">
      <div
        className="relative bg-white pt-8 px-6 rounded-[24px] drop-shadow-lg w-[400px] max-h-[600px] h-full flex flex-col transform transition-transform duration-300 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center pb-4 mb-4">
          <div className="absolute left-0 cursor-pointer" onClick={onClose}>
            <ArrowIcon strokeColor={'#949BA7'} />
          </div>
        </div>

        {loading && (
          <p className="text-gray-600 text-center py-6">로딩 중...</p>
        )}
        {error && <p className="text-red-500 text-center py-6">{error}</p>}

        {!loading && !error && detailData && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {selectedItem.ntsTaxNum}
            </h2>

            <div className="mt-6 space-y-4">
              <DetailField
                label="세금계산서 번호"
                value={detailData.ntsTaxNum || '-'}
              />
              <DetailField
                label="발행일"
                value={
                  detailData.issueDate
                    ? detailData.issueDate.split(' ')[0]
                    : '-'
                }
              />
              <DetailField
                label="공급가액"
                value={detailData.supplyAmount?.toLocaleString() + '원' || '-'}
              />
              <DetailField
                label="총 금액"
                value={detailData.totalAmount?.toLocaleString() + '원' || '-'}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-gray-600 font-md-semibold mb-1">{label}</label>
    <div className="w-full p-4 h-[56px] bg-gray-100 rounded-[12px] text-gray-600 font-md-medium">
      {value}
    </div>
  </div>
);

export default PaymentDetailModal;
