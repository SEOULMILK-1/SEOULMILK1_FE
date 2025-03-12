import { useState } from 'react';
import ResetIcon from '../../../../public/Icon/ResetIcon';
import SearchIcon from '../../../../public/Icon/SearchIcon';
import PaymentGray from '../../../../public/Icon/PaymentIcon';
import Button from '../../../common/Button';
import Header from '../../../common/Header';
import SelectCalendar from '../../../common/SelectCalendar';
import SelectMonth from '../../../common/SelectMonth';
import PaymentChart from './components/PaymentChart';
import Search from '../../../common/Search';
import LocationIcon from '../../../../public/Icon/LocationIcon';

const Payment = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSelectMonth = (
    startDate: string,
    endDate: string,
    label: string
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSelectedMonth(label);
  };

  const handleSelectDate = (date: string, dateType: 'start' | 'end') => {
    if (dateType === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleSearchButtonClick = () => {
    setIsFilterApplied(true);
  };

  const handleResetButtonClick = () => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
    setSelectedMonth('');
    setIsFilterApplied(false);
  };

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
          onSearch={handleSearch}
        />
      </div>

      <div className="flex flex-row w-full">
        <div className="flex items-center gap-4 text-gray-500 whitespace-nowrap">
          기간
          <SelectMonth onSelectMonth={handleSelectMonth} />
          <SelectCalendar
            selectedStartDate={startDate}
            selectedEndDate={endDate}
            onSelectDate={handleSelectDate}
          />
        </div>
        <div className="flex items-center gap-2 ml-[81px]">
          <Button
            size="xs"
            className="bg-transparent border border-primary-600 text-primary-500 flex items-center gap-1"
            onClick={handleResetButtonClick}
          >
            <ResetIcon />
            초기화
          </Button>
          <Button
            size="xs"
            className="flex items-center gap-1 text-white bg-primary-700"
            onClick={handleSearchButtonClick}
          >
            <SearchIcon />
            조회
          </Button>
        </div>
      </div>

      <PaymentChart
        searchTerm={searchTerm}
        startDate={startDate}
        endDate={endDate}
        selectedMonth={selectedMonth}
        isFilterApplied={isFilterApplied}
      />
    </div>
  );
};

export default Payment;
