import { useState, useEffect } from 'react';
import ArrowIcon from '../../../public/Icon/ArrowIcon';
import LogoutIcon from '../../../public/Icon/LogoutIcon';
import EditIcon from '../../../public/Icon/EditIcon';
import CheckIcon from '../../../public/Icon/CheckIcon';
import ConfirmModal from '../ConfirmModal';
interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'admin' | 'HQ' | 'CS';
}
const BANKS = ['농협은행', '카카오뱅크', '토스뱅크'];

const SideModal = ({ isOpen, onClose, role }: SideModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // 임시 데이터
  const [userId, setUserId] = useState('12345678');
  const [department, setDepartMent] = useState('경영총괄팀');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('010-1234-5678');
  const [selectedBank, setSelectedBank] = useState('카카오뱅크');
  const [accountNumber, setAccountNumber] = useState('3333-12-3456789');

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

  //사이드 모달 닫기
  const handleClose = () => {
    if (isEditing) {
      setIsConfirmModalOpen(true);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsOpening(false);
        onClose();
      }, 300);
    }
  };

  //confirm 모달 닫기
  const handleCancelConfirm = () => {
    setTimeout(() => {
      setIsConfirmModalOpen(false);
    }, 100);
  };
  const handleConfirmClose = () => {
    setIsConfirmModalOpen(false);
    setIsEditing(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpening(false);
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

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
        <div className="relative flex items-center pb-4 ">
          <div className="absolute left-0 cursor-pointer" onClick={handleClose}>
            <ArrowIcon strokeColor={'#949BA7'} />
          </div>
          <h2 className="flex-1 text-center font-xl-medium text-gray-500">
            내 정보
          </h2>
        </div>

        <div className="flex justify-between items-center pt-4 border-b pb-4">
          <div
            className={`flex gap-1 ${role === 'CS' ? 'flex-col' : 'flex-row'} `}
          >
            <div className="text-gray-800 font-xl-bold ">김구름 </div>
            {role === 'admin' && (
              <span className="flex gap-[8px] px-[10px] py-[2px] justify-center items-center rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                관리자
              </span>
            )}
            {role === 'HQ' && (
              <span className="flex px-[10px] py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                직원
              </span>
            )}
            {role === 'CS' && (
              <div className="text-gray-500 font-md-regular mt-[4px]">
                서울우유태평고객센터
              </div>
            )}
          </div>

          <button
            className={`${role === 'CS' ? 'mb-8' : ''}`}
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </button>
        </div>

        {/* form */}
        <div className="mt-[16px] space-y-4">
          <div>
            <label className="font-md-medium text-gray-500 ">아이디</label>
            <input
              role="text"
              className={`w-full mt-[8px] p-4 h-[56px] rounded-[12px] text-gray-600 font-md-medium
        ${
          isEditing
            ? 'bg-white text-gray-800 border border-gray-300 focus:ring-1 focus:ring-primary-500'
            : 'bg-gray-100 '
        }`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
          {role === 'HQ' && (
            <div>
              <label className=" font-md-medium text-gray-500">부서</label>
              <input
                role="text"
                className={`w-full mt-[8px] p-4 h-[56px] rounded-[12px] text-gray-600 font-md-medium
          ${
            isEditing
              ? 'bg-white text-gray-800 border border-gray-300  focus:ring-1 focus:ring-primary-500'
              : 'bg-gray-100'
          }`}
                value={department}
                onChange={(e) => setDepartMent(e.target.value)}
                readOnly={!isEditing}
              />
            </div>
          )}
          <div>
            <label className="font-md-medium text-gray-500">이메일</label>
            <input
              role="text"
              className={`w-full mt-[8px] p-4 h-[56px] rounded-[12px] text-gray-600 font-md-medium
        ${
          isEditing
            ? 'bg-white text-gray-800 border border-gray-300  focus:ring-1 focus:ring-primary-500'
            : 'bg-gray-100'
        }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="font-md-medium text-gray-500">연락처</label>
            <input
              role="text"
              className={`w-full mt-[8px] p-4 h-[56px] rounded-[12px] text-gray-600 font-md-medium
        ${
          isEditing
            ? 'bg-white text-gray-800 border border-gray-300  focus:ring-1 focus:ring-primary-500'
            : 'bg-gray-100'
        }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {role === 'CS' && (
          <div className="mt-6">
            <h3 className="text-gray-500 font-md-medium">
              사업자 계좌 (지급 요청 계좌)
            </h3>
            <div className="mt-2 space-y-3">
              <div className="relative">
                <select
                  className="w-full font-md-medium mt-[8px] px-4 py-3 h-[48px] rounded-[12px] border border-gray-300 appearance-none text-gray-700"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  disabled={!isEditing}
                >
                  {BANKS.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <input
                role="text"
                className={`w-full mt-[8px] p-4 h-[56px] rounded-[12px] text-gray-600 font-md-medium
        ${
          isEditing
            ? 'bg-white text-gray-800 border border-gray-300 focus:ring-1 focus:ring-primary-500 '
            : 'bg-gray-100'
        }`}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                readOnly={!isEditing}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          {isEditing ? (
            <button
              className="w-[128px] px-[18px] py-[12px] justify-center flex items-center gap-[4px] border border-primary-700 text-primary-700 rounded-[12px] bg-white font-md-medium whitespace-nowrap"
              onClick={() => setIsEditing(false)}
            >
              <CheckIcon />
              수정완료
            </button>
          ) : (
            <button className="w-[128px] px-[18px] py-[12px] justify-center flex items-center gap-[4px] border border-gray-500 text-gray-500 rounded-[12px] bg-white font-md-medium  whitespace-nowrap">
              <LogoutIcon />
              로그아웃
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirmClose}
        title="수정사항이 저장되지 않았어요."
        description="나가시겠어요?"
        confirmText="나가기"
        cancelText="돌아가기"
      />
    </div>
  );
};

export default SideModal;
