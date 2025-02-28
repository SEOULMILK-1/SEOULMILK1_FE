import Header from '../../../common/Header';
import SelectMonth from '../../../common/SelectMonth';
import StateDropdown from '../../../common/StateDropdown';
import Button from '../../../common/Button';
import SearchIcon from '../../../../public/Icon/SearchIcon';
import ResetIcon from '../../../../public/Icon/ResetIcon';
import CustomerChart from './components/CustomerChart';
import TaxIconGray from '../../../../public/Icon/TaxIconGray';
const Tax = () => {
  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="세금계산서 조회" Icon={TaxIconGray} />
      <div className="flex items-center gap-4 text-gray-500 mt-[32px]">
        지점
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        기간
        <SelectMonth />
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
          <Button size="sm" className="flex items-center gap-1">
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

export default Tax;
