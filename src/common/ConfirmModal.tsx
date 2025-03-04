interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '확인',
  description = '정말로 진행하시겠습니까?',
  confirmText = '확인',
  cancelText = '취소'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-[328px] rounded-[16px] shadow-lg gap-[4px] drop-shadow-elevation2">
        <p className=" font-xl-semibold mt-[40px] text-center text-gray-800">
          {title}
        </p>
        <p className="text-gray-500 font-md-medium mt-[4px] mb-[40px] text-center">
          {description}
        </p>
        <div className="flex">
          <button
            className="w-[164px] h-[56px] bg-gray-200 text-gray-600 rounded-bl-[16px] font-md-semibold"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="w-[164px] h-[56px] bg-warning-400 text-white rounded-br-[16px] font-md-semibold"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
