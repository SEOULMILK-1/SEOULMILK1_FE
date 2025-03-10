import { useState, useEffect } from 'react';
import CalendarIcon from '../../public/Icon/CalendarIcon';
import Calendar from './Calendar';

interface SelectCalendarProps {
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  onSelectDate: (date: string, dateType: 'start' | 'end') => void;
}

const SelectCalendar = ({
  selectedStartDate,
  selectedEndDate,
  onSelectDate
}: SelectCalendarProps) => {
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(selectedStartDate);
  const [endDate, setEndDate] = useState<string | null>(selectedEndDate);

  useEffect(() => {
    setStartDate(selectedStartDate);
  }, [selectedStartDate]);

  useEffect(() => {
    setEndDate(selectedEndDate);
  }, [selectedEndDate]);

  const handleSelectDate = (date: string, dateType: 'start' | 'end') => {
    // console.log(`선택한 날짜: (${dateType}):`, date);

    if (dateType === 'start') {
      setStartDate(date);
      setIsStartCalendarOpen(false);
    } else {
      setEndDate(date);
      setIsEndCalendarOpen(false);
    }

    onSelectDate(date, dateType);
  };

  return (
    <div className="flex flex-row relative">
      <div className="relative">
        <div
          className={`flex w-[150px] h-12 p-4 justify-start items-center gap-2 rounded-xl cursor-pointer border border-solid ${
            startDate ? 'border-primary-700' : 'border-gray-300'
          }`}
          onClick={() => setIsStartCalendarOpen(!isStartCalendarOpen)}
        >
          <CalendarIcon fillcolor={startDate ? '#009856' : '#949BA7'} />
          <div
            className={`font-md-medium ${
              startDate ? 'text-primary-700' : 'text-gray-500 '
            }`}
          >
            {startDate || '시작일...'}
          </div>
        </div>
        {isStartCalendarOpen && (
          <div className="absolute top-14 left-0 z-10">
            <Calendar
              onSelectDate={(date) => handleSelectDate(date, 'start')}
            />
          </div>
        )}
      </div>

      <div className="text-gray-500 font-xl-semibold flex justify-center items-center mx-2">
        {' '}
        ~{' '}
      </div>

      <div className="relative">
        <div
          className={`flex w-[150px] h-12 p-4 justify-start items-center gap-2 rounded-xl cursor-pointer border border-solid ${
            endDate ? 'border-primary-700' : 'border-gray-300'
          }`}
          onClick={() => setIsEndCalendarOpen(!isEndCalendarOpen)}
        >
          <CalendarIcon fillcolor={endDate ? '#009856' : '#949BA7'} />
          <div
            className={`font-md-medium ${
              endDate ? 'text-primary-700' : 'text-gray-500'
            }`}
          >
            {endDate || '종료일...'}
          </div>
        </div>
        {isEndCalendarOpen && (
          <div className="absolute top-14 left-0 z-10">
            <Calendar onSelectDate={(date) => handleSelectDate(date, 'end')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCalendar;
