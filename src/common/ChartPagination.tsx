import UnderIcon from '../../public/Icon/UnderIcon';
import TwoArrowIcon from '../../public/Icon/TwoArrowIcon';
import ArrowIcon from '../../public/Icon/ArrowIcon';

const ChartPagination = () => {
  return (
    <div className="flex w-[960px] h-[56px] px-5 justify-end items-center gap-9 border-t border-gray-300">
      <span className="text-gray-500 font-sm-medium">페이지 당 행</span>
      <div className="relative py-[6px]">
        <select className="flex w-[84px] h-[34px] px-4  text-left rounded-xl border border-gray-300 text-gray-500 font-sm-medium appearance-none">
          <option>30</option>
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <UnderIcon />
        </div>
      </div>

      <div className="flex items-center gap-[29px]">
        <TwoArrowIcon />
        <ArrowIcon />
        <div className="text-gray-500 text-center font-sm-medium">1 페이지</div>
        <div className="rotate-180">
          <ArrowIcon />
        </div>
        <div className="rotate-180">
          <TwoArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default ChartPagination;
