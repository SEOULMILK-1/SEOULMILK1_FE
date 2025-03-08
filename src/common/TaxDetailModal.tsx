import { useState, useEffect } from 'react';
import Button from './Button';
import ArrowIcon from '../../public/Icon/ArrowIcon';
import StatusBadge, { Status } from './StatusBagde';
import { useNavigate } from 'react-router-dom';
interface TaxDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: {
    status: string;
    center: string;
    date: string;
    approvalNo: string;
    supplier: string;
    recipient: string;
    dateFormatted: string;
    amount: string;
  } | null;
}

const TaxDetailModal = ({
  isOpen,
  onClose,
  selectedItem
}: TaxDetailModalProps) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  const handleReupload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        navigate('/upload-tax/step1', { state: { selectedImage: imageUrl } });
      }
    };
    input.click();
  };

  if (!isOpen || !selectedItem) return null;

  const isRejected = selectedItem.status === '반려됨';

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

        <StatusBadge status={selectedItem.status as Status} />

        <div>
          <h2 className="flex text-center font-xl-semibold text-gray-800 mt-[12px]">
            {selectedItem.center}_
            {selectedItem.date
              .replace(/\./g, '_')
              .replace(/^(\d{4})_(\d{2})_(\d{2})$/, '$1년_$2월_$3일')}
          </h2>
          <div
            className="w-[352px] h-[264px] bg-gray-200 rounded-[24px] flex items-center justify-center mt-4 cursor-pointer"
            onClick={handleImageClick}
          >
            {/* 이미지 포함한 api요청 */}
            이미지
          </div>
        </div>

        <div className="mt-6 space-y-4 flex-1">
          <DetailField label="승인번호" value={selectedItem.approvalNo} />
          <DetailField label="공급자 등록번호" value={selectedItem.supplier} />
          <DetailField
            label="공급 받는 자 등록번호"
            value={selectedItem.recipient}
          />
          <DetailField label="작성일자" value={selectedItem.date} />
          <DetailField label="공급가액" value={selectedItem.amount} />
        </div>

        {isRejected && (
          <div className="font-xl-semibold flex justify-between w-full p-4 bg-white sticky bottom-0 left-0 right-0 gap-4 ">
            <Button
              className="text-warning-400 w-[168px] h-[56px] border border-warning-400"
              onClick={handleReupload}
            >
              재업로드
            </Button>
            <Button
              className="bg-warning-400 text-white w-[168px] h-[56px]"
              onClick={() =>
                navigate('/upload-tax/step2', {
                  // state: { ...selectedItem, selectedImage: imageTest }
                  state: { ...selectedItem }
                })
              }
            >
              데이터 수정
            </Button>
          </div>
        )}
      </div>

      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeImageModal}
        >
          <div className="w-[700px] h-[500px] bg-white flex items-center justify-center">
            <span className="text-gray-500 text-lg">확대된 임시 이미지</span>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailField = ({ label, value }: any) => (
  <div>
    <label className="block text-gray-600 font-md-semibold mb-1">{label}</label>
    <div className="w-full p-4 h-[56px] mb-4 bg-gray-100 rounded-[12px] text-gray-600 font-md-medium">
      {value}
    </div>
  </div>
);

export default TaxDetailModal;
