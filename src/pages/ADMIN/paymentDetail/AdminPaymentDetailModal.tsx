import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StatusBadge, { Status } from '../../../common/StatusBagde';
import ArrowIcon from '../../../../public/Icon/ArrowIcon';
import api from '../../../hooks/api';
import Button from '../../../common/Button';
import { PaymentDatailModalProps } from '../../../types/paymentDetails';
import { TaxDetailResponse } from '../../../types/taxDetails';

const AdminPaymentDatailModal = ({
  isOpen,
  onClose,
  selectedItem
}: PaymentDatailModalProps) => {
  const [searchParams] = useSearchParams();
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<
    TaxDetailResponse['result'] | null
  >(null);

  const ntsId = searchParams.get('ntsId');
  console.log(ntsId);

  useEffect(() => {
    const fetchTaxDetail = async () => {
      if (!isOpen || !ntsId) {
        console.log('ntsId가 없습니다.');
        return;
      }
      console.log(`${selectedItem}`);

      try {
        const response = await api.get<TaxDetailResponse>(`/cs/tax/${ntsId}`);

        if (response.data.isSuccess) {
          setDetailData(response.data.result);
        } else {
          setError(
            response.data.message || '데이터를 불러오는데 실패했습니다.'
          );
        }
      } catch (err) {
        setError('서버 연결에 실패했습니다. 다시 시도해 주세요.');
        console.error(' API 요청 오류', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxDetail();
  }, [isOpen, selectedItem, ntsId]);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpening(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  if (!isOpen || !selectedItem) return null;

  const getDisplayStatus = (apiStatus: string): Status => {
    const statusMap: Record<string, Status> = {
      APPROVE: '승인',
      REFUSED: '반려',
      WAIT: '반려'
    };

    return statusMap[apiStatus] || (apiStatus as Status);
  };

  const isRejected =
    detailData?.status === 'REJECTED' || selectedItem.status === '반려됨';
  const displayStatus = detailData
    ? getDisplayStatus(detailData.status)
    : (selectedItem.status as Status);

  return (
    <div
      className={`fixed p-4 pr-0 inset-0 flex justify-end items-start z-50 transition-opacity duration-300
      ${isOpening && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white pt-8 px-6 rounded-[24px] drop-shadow-elevation3 w-[400px] max-h-[1024px] h-full flex flex-col transform transition-transform duration-300
                overflow-y-auto custom-scrollbar ${
                  isOpening && !isClosing ? 'translate-x-0' : 'translate-x-full'
                }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center pt-6 pb-4 mb-4">
          <div className="absolute left-0 cursor-pointer" onClick={handleClose}>
            <ArrowIcon strokeColor={'#949BA7'} />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <StatusBadge status={displayStatus} />

            <div>
              <h2 className="flex text-center font-xl-semibold text-gray-800 mt-[12px]">
                {detailData?.title ||
                  `${selectedItem.center}_${
                    selectedItem.date
                      ? selectedItem.date
                          .replace(/\./g, '_')
                          .replace(
                            /^(\d{4})_(\d{2})_(\d{2})$/,
                            '$1년_$2월_$3일'
                          )
                      : '날짜 없음'
                  }`}
              </h2>

              <div
                className="w-[352px] h-[264px] border rounded-[24px] flex items-center justify-center mt-4 cursor-pointer"
                onClick={handleImageClick}
              >
                {detailData?.taxImageUrl ? (
                  <img
                    src={detailData.taxImageUrl}
                    alt="세금계산서"
                    className="w-full h-full object-contain rounded-[24px]"
                  />
                ) : (
                  <span className="text-gray-500">
                    이미지가 존재하지 않습니다.
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4 flex-1">
              <DetailField
                label="승인번호"
                value={detailData?.issueId || selectedItem.approvalNo}
              />
              <DetailField
                label="공급자 등록번호"
                value={detailData?.suId || selectedItem.supplier}
              />
              <DetailField
                label="공급 받는 자 등록번호"
                value={detailData?.ipId || selectedItem.recipient}
              />
              <DetailField
                label="작성일자"
                value={detailData?.taxDate || selectedItem.date}
              />
              <DetailField
                label="공급가액"
                value={detailData?.chargeTotal || selectedItem.amount}
              />
            </div>

            {isRejected && (
              <div className="font-xl-semibold flex justify-between w-full p-4 bg-white sticky bottom-0 left-0 right-0 gap-4 ">
                <Button className="bg-warning-400 text-white w-[168px] h-[56px]">
                  데이터 수정
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeImageModal}
        >
          <div className="w-[700px] h-[500px] bg-white flex items-center justify-center">
            {detailData?.taxImageUrl ? (
              <img
                src={detailData.taxImageUrl}
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

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-gray-600 font-md-semibold mb-1">{label}</label>
    <div className="w-full p-4 h-[56px] mb-4 bg-gray-100 rounded-[12px] text-gray-600 font-md-medium">
      {value}
    </div>
  </div>
);

export default AdminPaymentDatailModal;
