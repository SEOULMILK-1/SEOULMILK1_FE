import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../../common/Modal';
import api from '../../../hooks/api';

interface AccountEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBank: string;
  initialAccount: string;
}

const AdminAccountEditModal = ({
  isOpen,
  onClose,
  initialBank,
  initialAccount
}: AccountEditModalProps) => {
  const { id } = useParams();
  const [bankName, setBankName] = useState(initialBank);
  const [accountNumber, setAccountNumber] = useState(initialAccount);

  useEffect(() => {
    if (isOpen) {
      fetchPaymentDetails();
    }
  }, [isOpen]);

  const fetchPaymentDetails = async () => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.get(`/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.isSuccess) {
        const { bank, account } = response.data.result;
        setBankName(bank ?? initialBank);
        setAccountNumber(account ?? initialAccount);
      } else {
        console.error('데이터 로드 실패:', response.data.message);
      }
    } catch (error) {
      console.error('서버 요청 실패:', error);
    }
  };

  const handleClose = () => {
    setBankName(initialBank);
    setAccountNumber(initialAccount);
    onClose();
  };
  const isModified =
    bankName !== initialBank || accountNumber !== initialAccount;

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[32px] drop-shadow-elevation1 px-8 py-10 w-[480px] relative">
        <h2 className="font-md-semibold text-gray-600">
          사업자 계좌 (지급 요청 계좌)
        </h2>

        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-[12px] my-2 font-md-medium text-gray-800 focus:ring-1 focus:ring-primary-500"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="은행명 입력"
        />

        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-[12px] mb-[30px] font-md-medium text-gray-800 focus:ring-1 focus:ring-primary-500"
          value={accountNumber}
          onChange={(e) => {
            const inputValue = e.target.value;
            // 숫자와 "-"만 허용하는 정규식
            const filteredValue = inputValue.replace(/[^0-9-]/g, '');
            setAccountNumber(filteredValue);
          }}
          placeholder="계좌번호 입력"
        />

        <div className="flex justify-between gap-4 mt-6 font-xl-semibold">
          <button
            className="w-full h-[56px] py-2 bg-gray-200 text-gray-600 rounded-[12px]"
            onClick={handleClose}
          >
            취소
          </button>
          <button
            className={`w-full py-2 rounded-[12px] ${
              isModified
                ? 'bg-emerald-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isModified}
          ></button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminAccountEditModal;
