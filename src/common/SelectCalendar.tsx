import { useState } from 'react';
import CalendarIcon from '../../public/Icon/CalendarIcon';
import Calendar from './Calendar';

interface SelectDataProps {
  date: string;
  datetype: 'start' | 'end';
}

const SelectCalendar = () => {
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const handleSelectDate = ({ date, datetype }: SelectDataProps) => {
    console.log(`선택한 날짜: (${datetype}):`, date);

    if (datetype === 'start') {
      setSelectedStartDate(date);
      setIsStartCalendarOpen(false);
    } else {
      setSelectedEndDate(date);
      setIsEndCalendarOpen(false);
    }
  };

  return (
    <div className="flex flex-row relative">
      <div className="relative">
        <div
          className="flex w-[150px] h-12 p-4 justify-start items-center gap-2 rounded-xl border border-solid border-gray-300 cursor-pointer"
          onClick={() => setIsStartCalendarOpen(!isStartCalendarOpen)}
        >
          <CalendarIcon fillcolor={selectedStartDate ? '#009856' : '#949BA7'} />
          <div
            className={`w-[122px] font-md-medium ${
              selectedStartDate ? 'text-primary-700' : 'text-gray-500'
            }`}
          >
            {selectedStartDate || '시작일...'}
          </div>
        </div>
        {isStartCalendarOpen && (
          <div className="absolute top-14 left-0 z-10">
            <Calendar
              onSelectDate={(date) =>
                handleSelectDate({ date, datetype: 'start' })
              }
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
          className="flex w-[150px] h-12 p-4 justify-start items-center gap-2 rounded-xl border border-solid border-gray-300 cursor-pointer"
          onClick={() => setIsEndCalendarOpen(!isEndCalendarOpen)}
        >
          <CalendarIcon fillcolor={selectedEndDate ? '#009856' : '#949BA7'} />
          <div
            className={`w-[122px] font-md-medium ${
              selectedEndDate ? 'text-primary-700' : 'text-gray-500'
            }`}
          >
            {selectedEndDate || '종료일...'}
          </div>
        </div>
        {isEndCalendarOpen && (
          <div className="absolute top-14 left-0 z-10">
            <Calendar
              onSelectDate={(date) =>
                handleSelectDate({ date, datetype: 'end' })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCalendar;
