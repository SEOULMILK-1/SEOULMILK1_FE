import DeleteXIcon from '../../../../../public/Icon/DeleteXIcon';

const HQAgencyModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="flex w-[480px] px-8 py-[42px] flex-col justify-center items-start gap-2 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-2">
            <p className="text-gray-800 font-2xl-semibold">담당 대리점</p>
            <p className="text-center font-2xl-semibold text-primary-700">0</p>
          </div>

          <button onClick={onClose}>
            <DeleteXIcon stroke="#949BA7" />
          </button>
        </div>

        <input
          className="w-full flex mt-4 h-14 p-4 justify-center items-center gap-[10px] rounded-xl border border-solid border-gray-300 bg-white placeholder:text-gray-500 placeholder:font-md-medium"
          placeholder="입력 후 엔터를 눌러 추가하세요"
        />

        <button className="mt-12 w-full flex h-14 px-7 justify-center items-center gap-[10px] rounded-xl bg-gray-200 text-gray-400 text-center font-xl-semibold">
          {' '}
          확인{' '}
        </button>
      </div>
    </div>
  );
};

export default HQAgencyModal;
