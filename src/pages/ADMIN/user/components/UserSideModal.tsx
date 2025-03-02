import { useState, useEffect } from 'react';
import ArrowIcon from '../../../../../public/Icon/ArrowIcon';
import DeleteXIcon from '../../../../../public/Icon/DeleteXIcon';
interface UserSideModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    userId: string;
    department?: string;
    email: string;
    phone: string;
    selectedBank?: string;
    accountNumber?: string;
  };
  role: 'admin' | 'HQ' | 'CS';
  onDelete: () => void;
}

const UserSideModal = ({
  isOpen,
  onClose,
  user,
  role,
  onDelete
}: UserSideModalProps) => {
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
        <div className="relative flex items-center pb-4">
          <div className="absolute left-0 cursor-pointer" onClick={handleClose}>
            <ArrowIcon strokeColor={'#949BA7'} />
          </div>
          <h2 className="flex-1 text-center font-xl-medium text-gray-500">
            유저 정보
          </h2>
        </div>

        <div className="flex justify-between items-center pt-4 border-b pb-4">
          <div
            className={`flex gap-1 ${role === 'CS' ? 'flex-col' : 'flex-row'}`}
          >
            <div className="text-gray-800 font-xl-bold">{user.name}</div>
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
        </div>

        {/* 유저 정보 */}
        <div className="mt-[16px] space-y-4">
          <div>
            <label className="font-md-medium text-gray-500">아이디</label>
            <input
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium border border-gray-300"
              value={user.userId}
              readOnly
            />
          </div>
          {role === 'HQ' && user.department && (
            <div>
              <label className="font-md-medium text-gray-500">부서</label>
              <input
                className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium border border-gray-300"
                value={user.department}
                readOnly
              />
            </div>
          )}
          <div>
            <label className="font-md-medium text-gray-500">이메일</label>
            <input
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium border border-gray-300"
              value={user.email}
              readOnly
            />
          </div>
          <div>
            <label className="font-md-medium text-gray-500">연락처</label>
            <input
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium border border-gray-300"
              value={user.phone}
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="w-[128px] px-[18px] py-[12px] justify-center flex items-center gap-[4px] border border-red-500 text-red-500 rounded-[12px] bg-white font-md-medium whitespace-nowrap"
            onClick={onDelete}
          >
            <DeleteXIcon />
            회원 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSideModal;
