import LocationIcon from '../../../../public/Icon/LocationIcon';
import ResetIcon from '../../../../public/Icon/ResetIcon';
import SearchIcon from '../../../../public/Icon/SearchIcon';
import PaymentGray from '../../../../public/Icon/PaymentIcon';
import Button from '../../../common/Button';
import Header from '../../../common/Header';
import Search from '../../../common/Search';
import SelectCalendar from '../../../common/SelectCalendar';
import SelectMonth from '../../../common/SelectMonth';
import PaymentChart from './components/PaymentChart';

const Payment = () => {
  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="지급결의서 조회" Icon={PaymentGray} />

      <div className="flex flex-row gap-4 mb-4">
        <div className="flex items-center mt-8 text-gray-500">지점</div>
        <Search
          placeholderName="대리점 검색..."
          showSearchButton={false}
          defaultSearchIcon={<LocationIcon />}
          activeSearchIcon={<LocationIcon fillColor="#3A404A" />}
        />
      </div>

      <div className="flex flex-row w-full">
        <div className="flex items-center gap-4 text-gray-500 whitespace-nowrap">
          기간
          <SelectMonth />
          <SelectCalendar />
        </div>
        <div className="flex items-center gap-2 ml-[81px]">
          <Button
            size="xs"
            className="bg-transparent border border-primary-600 text-primary-500 flex items-center gap-1"
          >
            <ResetIcon />
            초기화
          </Button>
          <Button
            size="xs"
            className="flex items-center gap-1 text-white bg-primary-700"
          >
            <SearchIcon />
            조회
          </Button>
        </div>
      </div>
      <PaymentChart />
    </div>
  );
};

export default Payment;
