import Header from '../../../common/Header';
import SelectMonth from '../../../common/SelectMonth';
import StateDropdown from '../../../common/StateDropdown';
import Button from '../../../common/Button';
import SearchIcon from '../../../../public/Icon/SearchIcon';
import ResetIcon from '../../../../public/Icon/ResetIcon';
import CustomerChart from './components/CustomerChart';
import TaxIconGray from '../../../../public/Icon/TaxIconGray';
const CSTax = () => {
  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="세금계산서 조회" Icon={TaxIconGray} />

      <div className="flex flex-row gap-4 mb-4"></div>
      <div className="flex items-center gap-4 text-gray-500">
        기간
        <SelectMonth />
        {/* <SelectCalendar /> */}
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-4 text-gray-500">
          상태
          <StateDropdown />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-transparent border border-primary-600 text-primary-500 flex items-center gap-1"
          >
            <ResetIcon />
            초기화
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1 text-white bg-primary-700"
          >
            <SearchIcon />
            조회
          </Button>
        </div>
      </div>

      {/* 표 */}
      <CustomerChart />
    </div>
  );
};

export default CSTax;
