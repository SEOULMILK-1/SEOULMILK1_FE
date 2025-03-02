import { useState, useEffect } from 'react';
import ArrowIcon from '../../../public/Icon/ArrowIcon';
import ConfirmModal from '../ConfirmModal';
import LogoutIcon from '../../../public/Icon/LogoutIcon';

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'admin' | 'hq' | 'cs';
}

const BANKS = ['농협은행', '카카오뱅크', '토스뱅크'];

function SideModal({ isOpen, onClose, role }: SideModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [accountNumber, setAccountNumber] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      document.body.style.overflow = 'hidden';
    } else {
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
      setIsOpening(false);
      onClose();
    }, 300);
  };

  if (!isOpen && !isOpening) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-end items-start z-50 transition-opacity duration-300 
    ${isOpening && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white pt-8 px-6 pb-10 rounded-2xl shadow-lg w-[400px] max-h-[1024px] h-full flex flex-col transform transition-transform duration-300 
      overflow-y-auto custom-scrollbar ${
        isOpening && !isClosing ? 'translate-x-0' : 'translate-x-full'
      }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center pb-4 border-b">
          <div className="absolute left-0 cursor-pointer" onClick={handleClose}>
            <ArrowIcon strokeColor={'#949BA7'} />
          </div>
          <h2 className="flex-1 text-center font-xl-medium text-gray-500">
            내 정보
          </h2>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="font-2xl-bold text-gray-800">김구름</div>
          <span className="px-3 py-1 text-sm rounded-3xl bg-primary-50 text-primary-600">
            {role === 'admin' ? '관리자' : role === 'hq' ? '본사' : '고객센터'}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {role === 'hq' && (
            <div>
              <label className="text-gray-500">부서</label>
              <input
                type="text"
                className="w-full p-4 h-12 rounded-lg border border-gray-300"
              />
            </div>
          )}
          <div>
            <label className="text-gray-500 ">아이디(사번)</label>
            <input
              type="text"
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px]  border border-gray-300"
            />
          </div>
          <div>
            <label className="text-gray-500">이메일</label>
            <input
              type="text"
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px]  border border-gray-300"
            />
          </div>
          <div>
            <label className="text-gray-500">연락처</label>
            <input
              type="text"
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px]  border border-gray-300"
            />
          </div>
        </div>

        {role === 'cs' && (
          <div className="mt-6">
            <h3 className="text-gray-600 font-medium">
              고객센터 사업자 계좌 (지급 요청 계좌)
            </h3>
            <div className="mt-2 space-y-3">
              <div className="relative">
                <select
                  className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] border border-gray-300 appearance-none text-gray-700"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  {BANKS.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                  ⌵
                </div>
              </div>

              <input
                type="text"
                className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] border border-gray-300 text-gray-700"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          <button className="px-6 py-3 rounded-lg border border-primary-600 text-primary-600">
            정보수정
          </button>
        </div>

        <button
          className="absolute bottom-6 right-6 px-6 py-3 flex items-center gap-2 border border-gray-500 text-gray-500 rounded-lg bg-white"
          onClick={() => setIsConfirmOpen(true)}
        >
          <LogoutIcon />
          로그아웃
        </button>
      </div>

      {isConfirmOpen && (
        <ConfirmModal
          onClose={() => setIsConfirmOpen(false)}
          onDelete={() => {
            setIsConfirmOpen(false);
            handleClose();
          }}
        />
      )}
    </div>
  );
}

export default SideModal;
