import { useState, useEffect } from 'react';
import Modal from '../../../common/Modal';
import api from '../../../hooks/api';

interface AccountEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBank: string;
  initialAccount: string;
  onUpdate: (newBank: string, newAccount: string) => void;
}

const AccountEditModal = ({
  isOpen,
  onClose,
  initialBank,
  initialAccount,
  onUpdate
}: AccountEditModalProps) => {
  const [bankName, setBankName] = useState(initialBank);
  const [accountNumber, setAccountNumber] = useState(initialAccount);
  const [userInfo, setUserInfo] = useState<{
    loginId: string;
    email: string;
    phone: string;
  } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/user');
        if (response.data.isSuccess) {
          setUserInfo(response.data.result);
        } else {
          console.error('사용자 정보 불러오기 실패:', response.data.message);
        }
      } catch (error) {
        console.error('서버 요청 실패:', error);
      }
    };

    if (isOpen) {
      fetchUserInfo(); 
      setBankName(initialBank); 
      setAccountNumber(initialAccount);
    }
  }, [isOpen, initialBank, initialAccount]);

  const handleUpdateAccount = async () => {
    if (!userInfo || isUpdating) return; 

    setIsUpdating(true);

    try {
      const payload = {
        loginId: userInfo.loginId, 
        email: userInfo.email,
        phone: userInfo.phone,
        bank: bankName,
        account: accountNumber
      };

      await api.put('/user/update', payload);
      console.log(' 계좌 정보 업데이트 성공');

      onUpdate(bankName, accountNumber);
      onClose();
    } catch (error) {
      console.error('계좌 정보 업데이트 실패:', error);
    } finally {
      setIsUpdating(false); 
    }
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
          className="w-full p-4 border border-gray-300 rounded-[12px] my-2 font-md-medium text-gray-500"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="은행명 입력"
        />

        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-[12px] mb-[30px] font-md-medium text-gray-500"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="계좌번호 입력"
        />

        <div className="flex justify-between gap-4 mt-6 font-xl-semibold ">
          <button
            className="w-full h-[56px] py-2 bg-gray-200 text-gray-600 rounded-[12px]"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className={`w-full py-2 rounded-[12px] ${
              isModified && !isUpdating
                ? 'bg-emerald-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            onClick={handleUpdateAccount}
            disabled={!isModified || isUpdating} 
          >
            {isUpdating ? '업데이트 중...' : '완료'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AccountEditModal;
