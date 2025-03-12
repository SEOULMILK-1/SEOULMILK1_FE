import { useState } from 'react';
import Header from '../../../common/Header';
import SelectMonth from '../../../common/SelectMonth';
import StateDropdown from '../../../common/StateDropdown';
import Button from '../../../common/Button';
import SearchIcon from '../../../../public/Icon/SearchIcon';
import ResetIcon from '../../../../public/Icon/ResetIcon';
import CustomerChart from './components/CustomerChart';
import TaxIconGray from '../../../../public/Icon/TaxIconGray';
import SelectCalendar from '../../../common/SelectCalendar';
import LocationIcon from '../../../../public/Icon/LocationIcon';
import Search from '../../../common/Search';

interface SearchCriteria {
  status: string;
  startDate: string | null;
  endDate: string | null;
}

const Tax = () => {
  const [dropdownState, setDropdownState] = useState('선택');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    status: '',
    startDate: null,
    endDate: null
  });
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleStateChange = (state: string) => {
    setDropdownState(state);
  };

  const handleReset = () => {
    setDropdownState('선택');
    setStartDate(null);
    setEndDate(null);
    setSelectedMonth('');
    setSearchCriteria({
      status: '',
      startDate: null,
      endDate: null
    });
  };

  const handleSearch = () => {
    setSearchCriteria({
      status: dropdownState === '선택' ? '' : dropdownState,
      startDate: startDate,
      endDate: endDate
    });
  };

  const handleSearchInput = (value: string) => {
    setSearchKeyword(value);
  };

  const handleMonthSelect = (
    newStartDate: string,
    newEndDate: string,
    label: string
  ) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setSelectedMonth(label);
  };

  const handleCalendarDateSelect = (
    date: string,
    dateType: 'start' | 'end'
  ) => {
    if (dateType === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="세금계산서 조회" Icon={TaxIconGray} />

      <div className="flex flex-row gap-4 mb-4">
        <div className="flex items-center mt-8 text-gray-500">지점</div>
        <Search
          placeholderName="대리점 검색..."
          showSearchButton={false}
          defaultSearchIcon={<LocationIcon />}
          activeSearchIcon={<LocationIcon fillColor="#3A404A" />}
          onSearch={handleSearchInput}
        />
      </div>

      <div className="flex items-center gap-4 text-gray-500">
        기간
        <SelectMonth
          selectedMonth={selectedMonth}
          onSelectMonth={handleMonthSelect}
        />
        <SelectCalendar
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          onSelectDate={handleCalendarDateSelect}
        />
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-4 text-gray-500">
          상태
          <StateDropdown
            selected={dropdownState}
            onChange={handleStateChange}
            optionsToShow={['반영', '미반영']}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-transparent border border-primary-600 text-primary-500 flex items-center gap-1"
            onClick={handleReset}
          >
            <ResetIcon />
            초기화
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1 text-white bg-primary-700"
            onClick={handleSearch}
          >
            <SearchIcon />
            조회
          </Button>
        </div>
      </div>

      <CustomerChart
        selectedStatus={searchCriteria.status}
        startDate={searchCriteria.startDate}
        endDate={searchCriteria.endDate}
        searchKeyword={searchKeyword}
      />
    </div>
  );
};

export default Tax;
