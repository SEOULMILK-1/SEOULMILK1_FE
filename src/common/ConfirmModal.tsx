function ConfirmModal({ onClose, onDelete }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-[328px] rounded-[16px] shadow-lg gap-[4px] drop-shadow-elevation2">
        <p className=" font-xl-semibold mt-[40px] text-center text-gray-800">
          회원을 삭제하시겠어요?
        </p>
        <p className="text-gray-500 font-md-medium mt-[4px] mb-[40px] text-center">
          삭제된 회원은 복구할 수 없어요.
        </p>
        <div className="flex">
          <button
            className="w-[164px] h-[56px] bg-gray-200 text-gray-600 rounded-bl-[16px] font-md-semibold"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="w-[164px] h-[56px] bg-warning-400 text-white rounded-br-[16px] font-md-semibold"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
